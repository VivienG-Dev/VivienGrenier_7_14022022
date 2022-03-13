const express = require("express");
// Express dispose de base d'un système de routing pour créer les routes du backend
const router = express.Router();
// On va déstructurer le modèle Posts, celui dont on a besoin
const { Users } = require("../models");
// bcrypt pour hasher le mot de passe de l'utilisateur
const bcrypt = require("bcrypt");
// Pour sécuriser les échanges d’informations (évitant ainsi l’écriture d’un code personnel pouvant donner lieu à des vulnérabilités)
const { sign } = require("jsonwebtoken");
// On importe le middleware de vérification de connexion JWT
const { validateToken } = require("../middlewares/AuthMiddlewares");

// Créer un utilisateur
// Avec sequelyze, tout marche de façon asynchrone, on veux pouvoir attendre avant d'aller plus loin avec les requêtes
router.post("/", async (req, res) => {
  // On récupère les données du body
  // Plutôt que de créer une simple variable comme dans Posts/Comments on déstructure l'objet, on récupère individuellement...
  // ...username et password car on va apporter des modifications à password (le hash), on a donc besoin de les séparer
  const { username, password } = req.body;
  // On demande à sequelize d'aller dans la table users et de trouver UN utilisateur (par le username). Si le username est true alors on aura un message d'erreur
  const user = await Users.findOne({ where: { username: username } });
  if (user) {
    return res.json({ error: "L'utilisateur existe déjà"});
  } else {
    // On hash le mot de passe
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
        isAdmin: false
      });
      res.json("Success");
    });
  }
});

// Connexion d'un utilisateur
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // On demande à sequelize d'aller dans la table users et de trouver UN utilisateur (par le username) qui correspond à l'utilisateur récupéré juste au dessus dans le body
  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "L'utilisateur n'existe pas" });

  bcrypt.compare(password, user.password).then((valid) => {
    if (!valid) return res.json({ error: "Mot de passe incorrect" });
    const accessToken = sign(
      { username: user.username, id: user.id, isAdmin: user.isAdmin },
      "randomSecret" // A changer avec dotenv, également dans middlewares
    );
    // On récupère le token ET le username ainsi que l'id lors du login pour la partie frontend
    res.json({ token: accessToken, username: username, id: user.id, isAdmin: user.isAdmin });
  });
});

// Pour vérifier si le token envoyé est valide
router.get("/token", validateToken, (req, res) => {
  // On envoie les données de l'utilisateur dans app.js
  res.json(req.user);
});

// On exporte router pour pouvoir l'utiliser dans server.js
module.exports = router;
