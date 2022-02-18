const express = require("express");
const app = express();
// mysql2 pour résoudre un bug avec mysql8.0
const mysql = require("mysql2");
const port = 3001;
const cors = require("cors");
// Pour hash le mot de passe de l'utilisateur
const bcrypt = require("bcrypt");
// Pour créer une session et la garder ouverte
const session = require("express-session");
// Pour analyser les cookies dans les demandes de l'application
const cookieParser = require("cookie-parser");
// const path = require("path");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Middlewares qu'on attribue pour gérer la requête POST venant de l'application front-end pour en extraire le corps JSON
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    key: "userid",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24, // 24h
    },
  })
);

// On connecte node.js avec note base de donnée mysql préalablement installé
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "groupomania",
});

// Création d'un utilisateur
app.post("/create", (req, res) => {
  // On récupère les données du formulaire de l'utilisateur
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const position = req.body.position;
  const country = req.body.country;

  // On insère les données avec une commande SQL classique
  db.query(
    "INSERT INTO users (name, age, gender, position, country) VALUES (?,?,?,?,?)",
    [name, age, gender, position, country],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// Inscription d'un utilisateur
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  bcrypt.hash(password, 10, (err, hash) => {
    err: console.log(err);
    db.query(
      "INSERT INTO groupomania.accounts (username, password, email) VALUES (?,?,?)",
      [username, hash, email],
      (err, result) => {
        err ? console.log(err) : res.send(result);
      }
    );
  });
});

// Récupération de la session d'un utilisateur
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false, user: req.session.user });
  }
});

app.post("/logout", (req, res) => {
  if (req.session.user) {
    res.clearCookie("userid");
    res.send({ loggedIn: false, user: req.session.user });
  }
});

// Connexion d'un utilisateur
app.post("/login", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  db.query("SELECT * FROM accounts WHERE email = ?", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    // Si un des champs n'est pas rempli alors on donne un message d'erreur, sinon le resultat
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          req.session.user = result;
          console.log(req.session.user);
          res.send(result);
        } else {
          res.send({ message: "Le mot de passe/email n'est pas bon" });
        }
      });
    } else {
      res.send({ message: "L'utilisateur n'existe pas" });
    }
  });
});

// Lire les info des utilisateurs
app.get("/getusers", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Mettre à jour le pays de l'utilisateur
app.put("/update", (req, res) => {
  const id = req.body.id;
  const country = req.body.country;

  db.query(
    "UPDATE users SET country = ? WHERE id = ?",
    [country, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Supprimer un utilisateur
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    err ? console.log(err) : res.send(result);
  });
});

// Ecoute un serveur décidé préalablement plus haut
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`The server port is running on the port ${port}`);
});
