//Modèle des posts
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // On a besoin d'associer les posts avec les commentaires dans mysql, on utilise alors les fonctions de sequelize
  // "models" est juste un argument qui a accès à tous modèles disponible
  // Posts.hasMany(models.Comments) = chaque post a beaucoup de commentaire et à la suppression "cascade" permet de supprimer tous les commentaires associés au post
  // Permet de créer la colonne PostId dans la table Comments
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };
  return Posts;
};
