const { verify } = require("jsonwebtoken");
// On va récupérer le token envoyé par le front, valider le token avec JWT.verify afin de laisser un utilisateur poster un article/commentaire

const validateToken = (req, res, next) => {
  // Le frontend envoi le token dans le header et on le récupère dans le backend
  const accessToken = req.header("accessToken");

  if (!accessToken)
    return res.json({ error: "Vous devez être connecté" });

  try {
    const validToken = verify(accessToken, "randomSecret");
    // Le middleware étant exécuté à chaque request, on peux accéder à req.user si on passe par le middleware (voir Comments.js)
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: "Vous devez être connecté" });
  }
};

module.exports = { validateToken };
