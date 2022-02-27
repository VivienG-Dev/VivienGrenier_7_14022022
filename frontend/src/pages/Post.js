import React from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// useEffect aura pour effet de se déclencher sur le cycle de vie du montage et de la mise à jour (componentDidMount/componentDidUpdate)
import { useContext, useEffect, useState } from "react";
// Pour extraire l'ID du post, à partir de l'URL (équivalent JS de new URL(location.href).searchParams.get(param);)
import { useParams } from "react-router-dom";
// Pour récupérer le nom et le state de l'utilisateur (connecté ou non)
import { AuthContext } from "../helpers/AuthContext";
// Bootstrap
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Breadcrumb,
  Card,
} from "react-bootstrap";

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
    <Container>
      <Row className="mb-3">
        <Col></Col>
        <Col xs={10} md={10} xl={8}>
          <Card className="card rounded-3 shadow border-0">
            <Card.Body>
              <div className="post">
                <Card.Title as="h2">{postObject.title}</Card.Title>
                <Card.Text>{postObject.postText}</Card.Text>
                <div className="text-end"><span className="fw-light">Auteur: {postObject.username}</span></div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={10} md={10} xl={8}>
          <Card className="card rounded-3 shadow border-0">
            <Card.Body>
              <Card.Title>Commentaires</Card.Title>
              <div className="addCommentContainer">
                <textarea
                  rows="4"
                  className="form-control mb-4"
                  type="text"
                  placeholder="Commentaire..."
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
                <Button className="btn btn-danger" onClick={addComment}>
                  {" "}
                  Ajouter un commentaire
                </Button>
                <div>
                  {listOfcomments &&
                    listOfcomments.length > 0 &&
                    listOfcomments.map((comment, index) => {
                      return (
                        <Card.Body
                          className="my-3 border rounded-3 "
                          key={index}
                        >
                          <Card.Text>{comment.commentBody}</Card.Text>
                          <div className="text-end"><span className="fw-light">Auteur: {comment.username}</span></div>
                          {authState.username === comment.username && (
                            // Afin de récupérer l'Id du commentaire dans la fonction deleteComment, on passe l'Id récupéré via le .map comme paramètre
                            <Button
                              className="btn btn-danger"
                              onClick={() => deleteComment(comment.id)}
                            >
                              {" "}
                              X
                            </Button>
                          )}
                        </Card.Body>
                      );
                    })}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Post;
