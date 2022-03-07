const express = require("express");
// Express dispose de base d'un système de routing pour créer les routes du backend
const router = express.Router();
// On va déstructurer le modèle Posts, celui dont on a besoin
const { Posts } = require("../models");
// On importe le middleware de vérification de connexion JWT
const { validateToken } = require("../middlewares/AuthMiddlewares");

// Récupération de tous les articles
router.get("/", async (req, res) => {
  // La fonction findAll nous arrive de sequelize
  const listOfPosts = await Posts.findAll();
  res.send(listOfPosts);
});

// Poster un article
// Avec sequelyze, tout marche de façon asynchrone, on veux pouvoir attendre avant d'aller plus loin avec les requêtes
router.post("/submit", validateToken, async (req, res) => {
  // On récupère les données du body
  const post = req.body;
  const username = req.user.username;
  const Id = req.user.id;
  // On ajoute "username" et l'Id utilisateur à l'objet "comment". username et l'Id seront ajoutés dans la BDD lors de l'envoie (dans la colonne username et UserId)
  post.username = username;
  post.UserId = Id;
  // La fonction create nous arrive de sequelize et nous permet d'envoyer les données d'après le modèle dans la table Posts de la BDD
  await Posts.create(post);
  res.send(post);
});

// Récupération d'un article avec l'id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  // findByPk est une fonction de sequelize qui remplace findById (Pk = Primary key)
  const post = await Posts.findByPk(id);
  res.json(post);
});

// Supprimer un post
router.delete('/:postId', validateToken, async (req, res) => {
  const postId = req.params.postId;

  // Fonction de sequelize pour supprimer
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("Article supprimé !");
})

// Modifier un post
// router.put('/title', validateToken, async (req, res) => {
//   // On récupère les données du body (le titre et l'id)
//   const { newTitle, id } = req.body;
//   // La fonction update nous arrive de sequelize, le premier objet est celui à modifier et le second ou il est situé
//   await Posts.update({title: newTitle}, {where: {id: id}});
//   res.send(newTitle);
// })

// router.put('/postText', validateToken, async (req, res) => {
//   // On récupère les données du body (le postText et l'id)
//   const { newPostText, id } = req.body;
//   // La fonction update nous arrive de sequelize, le premier objet est celui à modifier et le second ou il est situé
//   await Posts.update({postText: newPostText}, {where: {id: id}});
//   res.send(newPostText);
// })

router.put('/update', validateToken, async (req, res) => {
  // On récupère les données du body (le postText et l'id)
  const { newPostText, newTitle, id } = req.body;
  // La fonction update nous arrive de sequelize, le premier objet est celui à modifier et le second ou il est situé
  await Posts.update({postText: newPostText, title: newTitle}, {where: {id: id}});
  res.send({newPostText, newTitle});
})

// On exporte router pour pouvoir l'utiliser dans server.js
module.exports = router;
