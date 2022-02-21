const express = require("express");
// Express dispose de base d'un système de routing pour créer les routes du backend
const router = express.Router();
// On va déstructurer le modèle Posts, celui dont on a besoin
const { Users } = require("../models");
// bcrypt pour hasher le mot de passe de l'utilisateur
const bcrypt = require("bcrypt");

// Créer un utilisateur
// Avec sequelyze, tout marche de façon asynchrone, on veux pouvoir attendre avant d'aller plus loin avec les requêtes
router.post("/", async (req, res) => {
  // On récupère les données du body
  // Plutôt que de créer une simple variable comme dans Posts/Comments on déstructure l'objet, on récupère individuellement...
  // ...username et password car on va apporter des modifications à password (le hash), on a donc besoin de les séparer
  const { username, password } = req.body;
  // On hash le mot de passe
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Success");
  });
});

// Connexion d'un utilisateur
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // On demande à sequelize d'aller dans la table users et de trouver UN utilisateur (par le username) qui correspond à l'utilisateur récupéré juste au dessus dans le body
  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "L'utilisateur n'existe pas" });

  bcrypt.compare(password, user.password).then((valid) => {
    if (!valid) res.json({ error: "Mot de passe incorrect" });

    res.json('Connecté')
  });
});

// Récupération d'un utilisateur avec l'id
// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   // findByPk est une fonction de sequelize qui remplace findById (Pk = Primary key)
//   const post = await Posts.findByPk(id);
//   res.json(post);
// });

// On exporte router pour pouvoir l'utiliser dans server.js
module.exports = router;