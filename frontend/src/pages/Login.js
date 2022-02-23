import React, { useEffect, useState } from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// On utilise useNavigate pour faire une redirection après l'envoi du formulaire
import { useNavigate } from "react-router-dom";

// Obligatoire pour la session
Axios.defaults.withCredentials = true;

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    const data = { username: username, password: password };
    Axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        navigate("/");
        // console.log(response.data);
      }
    });
  };

  // A l'affichage de la page on récupère le username de l'utilisateur s'il est connecté
  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      setLoginStatus(response.data.user.username);
    });
  }, []);

  if (loginStatus) return <h2>Vous êtes déjà connecté sous {loginStatus}</h2>;

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
}

export default Login;
