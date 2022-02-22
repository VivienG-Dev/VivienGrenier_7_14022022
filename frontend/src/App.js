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

function App() {
  return (
    <div className="App">
      <Router>
        <div className="header"> 
          <Link to="/"> Accueil</Link>
          <Link to="/submit"> Créer un post</Link>
          <Link to="/profile"> Profile</Link>
          <Link to="/login"> Connexion</Link>
          <Link to="/register"> S'inscrire</Link>
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
    </div>
  );
}

export default App;
