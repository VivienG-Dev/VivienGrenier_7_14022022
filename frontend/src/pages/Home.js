import React from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// useEffect aura pour effet de se déclencher sur le cycle de vie du montage et de la mise à jour (componentDidMount/componentDidUpdate)
import { useEffect, useState } from "react";
// Pour réaliser des redirections (anciennement useHistory)
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  // Quand la page est crée, la logique écrite dans useEffect est activé une fois seulement dans ce cas précis (sauf si on rempli la dépendance dans [])
  useEffect(() => {
    Axios.get("http://localhost:3001/posts").then((response) => {
      // On ajoute les données dans le "state" ce qui va permettre d'utiliser les données dans l'application
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="information">
      {/* Comme le State est un tableau, on utilise map pour naviguer dedans */}
      {listOfPosts.map((post, index) => {
        return (
          <div className="post" key={index} onClick={() => {navigate(`/posts/${post.id}`)}}>
            <h2>{post.title}</h2>
            <p>{post.postText}</p>
            <span>Auteur: {post.username}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
