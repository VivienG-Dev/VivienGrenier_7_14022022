const express = require("express");
// Express dispose de base d'un système de routing pour créer les routes du backend
const router = express.Router();
// On va déstructurer le modèle des commentaires
const { Comments } = require("../models");
// On importe le middleware de vérification de connexion JWT
const { validateToken } = require("../middlewares/AuthMiddlewares");

// Récupération de tous les commentaires par rapport à postId (ne pas confondre avec Id, postId est lié à l'Id d'un post (voir Posts.associate dans models/Posts.js))
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  // On remplace findByPk par findAll car on souhaite récupérer "postId" et non "Id" (voir BDD)
  const comments = await Comments.findAll({
    where: {
      PostId: postId,
    },
  });
  res.json(comments);
});

// Poster un commentaire (on ajoute le middleware JWT (validateToken))
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  // console.log(comment.commentBody)
  const username = req.user.username;
  const Id = req.user.id;
  // On ajoute "username" et l'Id utilisateur à l'objet "comment". username et l'Id seront ajoutés dans la BDD lors de l'envoie (dans la colonne username et UserId)
  comment.username = username;
  comment.UserId = Id;

  if (!username)
    res.json({ error: "Vous devez être connecté pour laisser un commentaire" });

  if (comment.commentBody) {
    await Comments.create(comment);
    res.json(comment);
  } else {
    res.json({ error: "Le message est vide" });
  }
});

// Pour supprimer un commentaire
// On utilise le middleware validateToken car on ne souhaite pas que n'importe qui puisse supprimer un commentaire
router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  // Fonction de sequelize pour supprimer
  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("Commentaire supprimé");
});

// Pour modifier un commentaire
router.put("/update", validateToken, async (req, res) => {
  // On récupère les données du body (le postText et l'id)
  const { newCommentBody, PostId } = req.body;
  if (newCommentBody) {
    // La fonction update nous arrive de sequelize, le premier objet est celui à modifier et le second ou il est situé
    await Comments.update(
      { commentBody: newCommentBody },
      { where: { id: PostId } }
    );
    res.send({ newCommentBody });
  } else {
    res.json({ error: "Le champ est vide" });
  }
});

// On exporte router pour pouvoir l'utiliser dans server.js
module.exports = router;
