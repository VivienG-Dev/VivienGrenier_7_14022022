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
  const [listOfcomments, setListOfComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      setPostObject(response.data);
    });

    Axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setListOfComments(response.data);
    });
  }, []);

  const onSubmit = () => {
    Axios.post("http://localhost:3001/comments", {
      commentBody: newComment,
      PostId: id,
    }).then((response) => {
      const commentToAdd = {commentBody: newComment}
      setListOfComments([...listOfcomments, commentToAdd]);
      // Après le clique on va vider la valeur de l'input en mettant une string vide
      setNewComment("");
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
          <button onClick={onSubmit}> Ajouter un commentaire</button>
          <div className="listOfComments">
            {listOfcomments &&
              listOfcomments.length > 0 &&
              listOfcomments.map((comment, index) => {
                return (
                  <div className="post" key={index}>
                    <p>{comment.commentBody}</p>
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
