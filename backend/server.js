const express = require("express");
const app = express();
// Le port que l'API va écouter
const port = 3001;
//
const cors = require("cors");
// On importe les modèles (tables mysql)
const db = require("./models");

// Pour créer une session et la garder ouverte
// const session = require("express-session");
// Pour analyser les cookies dans les demandes de l'application
// const cookieParser = require("cookie-parser");

// Middlewares qu'on attribue pour gérer la requête POST venant de l'application front-end pour en extraire le corps JSON
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     key: "userId",
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     maxAge: 2 * 60 * 60 * 1000, // 2h
//     cookie: {
//       expires: 2 * 60 * 60 * 1000, // 2h
//       httpOnly: true,
//       sameSite: "strict",
//       // secure: true,
//     },
//   })
// );

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

// Sequelize (orm) va faciliter l'implémentation/la lecture de mysql et apporter une meilleure sécurité
// Ecoute un serveur décidé préalablement plus haut
// Quand on écoute notre API, on passe par tous les modèles préalablement créer, on vérifie s'ils existent dans la BDD et si un modèle n'existe pas, il est crée
db.sequelize.sync().then(() => {
  app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`The server port is running on the port ${port}`);
  });
});
