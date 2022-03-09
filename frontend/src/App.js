import "./App.css";
// React Router Dom naviguer entre les différents composants, changer l'url, modifier l'historique du navigateur, ajout de routes dynamique...
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import PageNotFound from "./pages/PageNotFound";
import Admin from "./pages/Admin";
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
    isAdmin: false,
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
          isAdmin: response.data.isAdmin,
        });
      }
    });
  }, []);

  // Fonction pour se déconnecter (à placer ailleurs si possible comme les <link>)
  const logout = () => {
    localStorage.removeItem("accessToken");
    // Lors du logout on a besoin de retrouver le state d'origine (voir plus haut), on reprend donc l'objet d'origine
    setAuthState({ ...authState, status: false, isAdmin: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar className="mb-5 shadow-sm" bg="white" expand="lg">
            <Container>
              <Navbar.Brand className="d-flex align-items-center" href="/">
                <img
                  src="../icon-left-font.png"
                  alt="Groupomania"
                  height="35"
                  className="d-inline-block align-top"
                ></img>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {!authState.status ? (
                    <>
                      <Link className="nav-link" to="/login">
                        Connexion
                      </Link>
                      <Link className="nav-link" to="/register">
                        S'inscrire
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link className="nav-link" to="/">
                        Accueil
                      </Link>
                      <Link className="nav-link" to="/submit">
                        Ajouter un article
                      </Link>
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                    </>
                  )}
                  {authState.isAdmin === true && (
                    <>
                      <Link className="nav-link" to="/admin">
                        Admin
                      </Link>
                    </>
                  )}
                </Nav>
                {authState.status && (
                  <Nav className="justify-content-end">
                    <Navbar.Text>
                      Bienvenue :{" "}
                      <Link to="/profile">{authState.username}</Link>
                    </Navbar.Text>
                    <div className="vr mx-3" />
                    <Button size="sm" variant="outline-danger" onClick={logout}>
                      Se déconnecter
                    </Button>
                  </Nav>
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
