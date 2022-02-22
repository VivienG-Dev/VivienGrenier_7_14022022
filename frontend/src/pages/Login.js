import React, { useEffect, useState } from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// On utilise useNavigate pour faire une redirection après l'envoi du formulaire
import { useNavigate } from "react-router-dom";

// Obligatoire pour le cookie
Axios.defaults.withCredentials = true;

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  // A l'appel de la page on va récupérer le nom utilisateur du cookie pour l'afficher dans le front
  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user.username);
      }
    });
  }, []);

  const login = () => {
    const data = { username: username, password: password };
    Axios.post("http://localhost:3001/auth/login", data).then((response) => {
      navigate("/");
      // console.log(response.data);
    });
  };
  if (!loginStatus) {
    return (
      <div className="createPost">
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}> Se connecter</button>
      </div>
    );
  } else {
    return <h1>Bienvenue {loginStatus}</h1>
  }
}

export default Login;
