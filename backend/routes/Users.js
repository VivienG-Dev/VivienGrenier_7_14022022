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

// Récupération d'un utilisateur avec l'id
// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   // findByPk est une fonction de sequelize qui remplace findById (Pk = Primary key)
//   const post = await Posts.findByPk(id);
//   res.json(post);
// });

// On exporte router pour pouvoir l'utiliser dans server.js
module.exports = router;
