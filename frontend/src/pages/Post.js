import React from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// useEffect aura pour effet de se déclencher sur le cycle de vie du montage et de la mise à jour (componentDidMount/componentDidUpdate)
import { useEffect, useState } from "react";
// Pour extraire l'ID du post, à partir de l'URL (équivalent JS de new URL(location.href).searchParams.get(param);)
import { useParams } from "react-router-dom";

function Post() {
  let { id } = useParams();
  // On crée un state pour utiliser les données du post
  const [postObject, setPostObject] = useState({});

  useEffect(() => {
    Axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, []);

  return (
    <div className="information">
      <div className="post">
        <h2>{postObject.title}</h2>
        <p>{postObject.postText}</p>
        <span>Auteur: {postObject.username}</span>
      </div>
    </div>
  );
}

export default Post;
