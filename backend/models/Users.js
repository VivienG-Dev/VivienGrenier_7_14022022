//Modèle des posts
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

  // On a besoin d'associer les utilisateurs avec les posts dans mysql, on utilise alors les fonctions de sequelize
  // "models" est juste un argument qui a accès à tous modèles disponible
  // Posts.hasMany(models.Comments) = chaque utilisateur a beaucoup de posts et à la suppression "cascade" permet de supprimer tous les posts/commentaires associés
  // Permet de créer la colonne UserId dans la table Posts
  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
  };
  return Users;
};
