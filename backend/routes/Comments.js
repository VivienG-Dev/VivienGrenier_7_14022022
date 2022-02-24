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
  const username = req.user.username;
  // On ajoute le champ "username" à l'objet "comment". username sera ajouté dans la BDD lors de l'envoie
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

// Pour supprimer un commentaire
// On utilise le middleware validateToken car on ne souhaite pas que n'importe qui puisse supprimer un commentaire
router.delete('/:commentId', validateToken, async (req, res) => {

})

// On exporte router pour pouvoir l'utiliser dans server.js
module.exports = router;
