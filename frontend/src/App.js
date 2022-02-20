import "./App.css";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// useEffect aura pour effet de se déclencher sur le cycle de vie du montage et de la mise à jour (componentDidMount/componentDidUpdate)
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [listofPosts, setListOfPosts] = useState([]);

  // Quand la page est crée, la logique écrite dans useEffect est activé une fois seulement dans ce cas précis (sauf si on rempli la dépendance dans [])
  useEffect(() => {
    Axios.get("http://localhost:3001/posts").then((response) => {
      // On ajoute les données dans le "state" ce qui va permettre d'utiliser les données dans l'application
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div className="App">
      {/* Comme le State est un tableau, on utilise map pour naviguer dedans */}
      {listofPosts.map((post, key) => {
        return (
          <div className="post">
            <h2 key={key}>{post.title}</h2>
            <p>{post.postText}</p>
            <span>Auteur: {post.username}</span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
