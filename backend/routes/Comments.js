const express = require("express");
// Express dispose de base d'un système de routing pour créer les routes du backend
const router = express.Router();
// On va déstructurer le modèle des commentaires
const { Comments } = require("../models");

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

// Poster un commentaire
router.post("/", async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  res.send(comment);
});

// On exporte router pour pouvoir l'utiliser dans server.js
module.exports = router;
