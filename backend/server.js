const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = 3001;
const cors = require("cors");
// const session = require("express-session");
// const path = require("path");

app.use(cors());
// Middlewares qu'on attribue pour gérer la requête POST venant de l'application front-end pour en extraire le corps JSON
app.use(express.json());

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
  db.query(
    "INSERT INTO groupomania.accounts (username, password, email) VALUES (?,?,?)",
    [username, password, email],
    (err, result) => {
      err ? console.log(err) : res.send(result);
    }
  );
});

// Connexion d'un utilisateur
app.post('/login', (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  db.query(
    "SELECT * FROM accounts WHERE email = ? AND password = ?", [email, password], (err, result) => {
      err ? console.log(err) : res.send(result);
    }
  );
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
