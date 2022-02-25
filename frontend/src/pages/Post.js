import React from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// useEffect aura pour effet de se déclencher sur le cycle de vie du montage et de la mise à jour (componentDidMount/componentDidUpdate)
import { useContext, useEffect, useState } from "react";
// Pour extraire l'ID du post, à partir de l'URL (équivalent JS de new URL(location.href).searchParams.get(param);)
import { useParams } from "react-router-dom";
// Pour récupérer le nom et le state de l'utilisateur (connecté ou non)
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  // On crée un state pour utiliser les données du post
  const [postObject, setPostObject] = useState({});
  const [listOfcomments, setListOfComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  // On utilise "authState" et non "setAuthState" car on récupère déjà les informations dont on va avoir besoin lors du login (içi l'Id)
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    Axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      setPostObject(response.data);
    });

    Axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setListOfComments(response.data);
    });
  }, []);

  const addComment = () => {
    Axios.post(
      "http://localhost:3001/comments",
      {
        commentBody: newComment,
        PostId: id,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        alert("Vous devez être connecté pour laisser un commentaire");
      } else {
        const commentToAdd = {
          commentBody: newComment,
          username: response.data.username,
        };
        setListOfComments([...listOfcomments, commentToAdd]);
        // Après le clique on va vider la valeur de l'input en mettant une string vide
        setNewComment("");
      }
    });
  };

  const deleteComment = (commentId) => {
    Axios.delete(`http://localhost:3001/comments/${commentId}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then(() => {
      // On utilise filter pour ne garder que les commentaires avec un Id qui ne sont pas égaux avec celui supprimé en paramètre
      setListOfComments(
        listOfcomments.filter((comment) => {
          return comment.id !== commentId;
        })
      );
    });
  };

  return (
    <div className="information">
      <div className="post">
        <h2>{postObject.title}</h2>
        <p>{postObject.postText}</p>
        <span>Auteur: {postObject.username}</span>
      </div>
      <div className="comments">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Commentaire..."
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button onClick={addComment}> Ajouter un commentaire</button>
          <div className="listOfComments">
            {listOfcomments &&
              listOfcomments.length > 0 &&
              listOfcomments.map((comment, index) => {
                return (
                  <div className="post" key={index}>
                    <p>{comment.commentBody}</p>
                    <span>{comment.username}</span>
                    {authState.username === comment.username && (
                      // Afin de récupérer l'Id du commentaire dans la fonction deleteComment, on passe l'Id récupéré via le .map comme paramètre
                      <button onClick={() => deleteComment(comment.id)}>
                        {" "}
                        Supprimer
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
