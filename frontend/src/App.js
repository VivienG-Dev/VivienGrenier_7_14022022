import "./App.css";
// React Router Dom naviguer entre les différents composants, changer l'url, modifier l'historique du navigateur, ajout de routes dynamique...
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
// Pour activer le re-render lors de la connexion d'un utilisateur et ainsi afficher ce que l'on desire en fonction des données récoltées
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  // On stock içi les informations récupérées par le useEffect et la route.get('/token')
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  // Après connexion "authState = true" mais si refrech de la page sans le useEffect, "authState" retourne à false
  // On utilise alors useEffect au refrech pour vérifier s'il y a un token dans le localStorage et passer authState à true
  // Et ainsi éviter les faux token qu'un utilisateur malveillant pourrait essayé d'envoyer
  useEffect(() => {
    Axios.get("http://localhost:3001/auth/token", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        // Afin de ne pas copier coller le code en provenance du useState, on va destructurer
        // Donc faire une copie de l'objet dans authState et modifier uniquement le status
        setAuthState({ ...authState, status: false });
      } else {
        // Içi on a besoin de tout modifier donc pas besoin de destructurer
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  // Fonction pour se déconnecter (à placer ailleurs si possible comme les <link>)
  const logout = () => {
    localStorage.removeItem("accessToken");
    // Lors du logout on a besoin de retrouver le state d'origine (voir plus haut), on reprend donc l'objet d'origine
    setAuthState({ ...authState, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="header">
            <Link to="/"> Accueil</Link>
            <Link to="/submit"> Créer un post</Link>
            <Link to="/profile"> Profile</Link>
            {!authState.status ? (
              <>
                <Link to="/login"> Connexion</Link>
                <Link to="/register"> S'inscrire</Link>
              </>
            ) : (
              <>
                <button onClick={logout}> Logout</button>
                <span>Welcome {authState.username}</span>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<Post />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
