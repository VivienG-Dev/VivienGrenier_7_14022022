const express = require("express");
// Express dispose de base d'un système de routing pour créer les routes du backend
const router = express.Router();
// On va déstructurer le modèle Posts, celui dont on a besoin
const { Posts } = require("../models");

// Récupération de tous les articles
router.get("/", async (req, res) => {
  // La fonction findAll nous arrive de sequelize
  const listOfPosts = await Posts.findAll();
  res.send(listOfPosts);
});

// Poster un article
// Avec sequelyze, tout marche de façon asynchrone, on veux pouvoir attendre avant d'aller plus loin avec les requêtes
router.post("/", async (req, res) => {
  // On récupère les données du body
  const post = req.body;
  // La fonction create nous arrive de sequelize et nous permet d'envoyer les données d'après le modèle dans la table Posts de la BDD
  await Posts.create(post);
  res.send(post);
});

// On exporte router pour pouvoir l'utiliser dans server.js
module.exports = router;
