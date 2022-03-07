import React from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// useEffect aura pour effet de se déclencher sur le cycle de vie du montage et de la mise à jour (componentDidMount/componentDidUpdate)
import { useContext, useEffect, useState } from "react";
// Pour extraire l'ID du post, à partir de l'URL (équivalent JS de new URL(location.href).searchParams.get(param);)
import { useNavigate, useParams } from "react-router-dom";
// Pour récupérer le nom et le state de l'utilisateur (connecté ou non)
import { AuthContext } from "../helpers/AuthContext";
// Bootstrap
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Card,
  Modal,
} from "react-bootstrap";
import ShowModal from "../components/Modal";

function Post() {
  let { id } = useParams();
  const navigate = useNavigate();
  // On crée un state pour utiliser les données du post
  const [postObject, setPostObject] = useState({});
  const [listOfcomments, setListOfComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  // On utilise "authState" et non "setAuthState" car on récupère déjà les informations dont on va avoir besoin lors du login (içi l'Id)
  const { authState } = useContext(AuthContext);
  // Pour le message d'erreur
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // Pour modifier le contenu d'un article
  const [newTitle, setNewTitle] = useState("");
  const [newPostText, setNewPostText] = useState("");

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
        // alert(response.data.error);
        setAlert(true);
        setAlertMessage(response.data.error);
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

  const deletePost = (postId) => {
    Axios.delete(`http://localhost:3001/posts/${postId}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then(() => {
      navigate("/");
    });
  };

  const editPost = () => {
    // if (option === "title") {
    //   // let newTitle = prompt("Modifier le titre");
    //   Axios.put(
    //     "http://localhost:3001/posts/title",
    //     { newTitle: newTitle, id: id },
    //     {
    //       headers: {
    //         accessToken: localStorage.getItem("accessToken"),
    //       },
    //     }
    //   );

    //   // setPostObject({ ...postObject, title: newTitle });
    // } else {
    //   // let newPostText = prompt("Modifier le contenu");
    //   Axios.put(
    //     "http://localhost:3001/posts/postText",
    //     { newPostText: newPostText, id: id },
    //     {
    //       headers: {
    //         accessToken: localStorage.getItem("accessToken"),
    //       },
    //     }
    //   );

    //   // setPostObject({ ...postObject, postText: newPostText });
    // }

    Axios.put(
      "http://localhost:3001/posts/update",
      { newPostText: newPostText, newTitle: newTitle, id: id },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    // Modification instantané du DOM
    setPostObject({ ...postObject, postText: newPostText, title: newTitle });
  };

  // Date for post
  const datePost = new Date(postObject.createdAt);
  const newDatePost = datePost.toLocaleDateString("fr");

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
                <div className="text-end">
                  <span className="fw-light">
                    Auteur: {postObject.username} Date: {newDatePost}
                  </span>
                  {authState.id === postObject.UserId && (
                    <div className="d-grid gap-2 d-md-flex mt-2 justify-content-md-end">
                      <ShowModal
                        editPost={editPost}
                        title={setNewTitle}
                        body={setNewPostText}
                      />
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deletePost(postObject.id)}
                      >
                        {" "}
                        Supprimer
                      </Button>
                    </div>
                  )}
                </div>
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
              <>
                <textarea
                  rows="2"
                  className="form-control mb-4"
                  type="text"
                  placeholder="Commentaire..."
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
                {/* Alert si l'utilisateur n'est pas connecté */}
                {alert && (
                  <Alert
                    variant="danger"
                    onClose={() => setAlert(false)}
                    dismissible
                  >
                    <Alert.Heading>Une erreur est apparue !</Alert.Heading>
                    <p>{alertMessage}</p>
                  </Alert>
                )}
                <div className="d-grid gap-2 col-6 mx-auto">
                  <Button variant="danger" onClick={addComment}>
                    {" "}
                    Ajouter un commentaire
                  </Button>
                </div>
                <div className="commentContainer">
                  {listOfcomments &&
                    listOfcomments.length > 0 &&
                    listOfcomments.map((comment, index) => {
                      // Date for comment
                      const dateComment = new Date(comment.createdAt);
                      const newDateComment =
                        dateComment.toLocaleDateString("fr");
                      return (
                        <Card.Body
                          className="my-3 border rounded-3 "
                          key={index}
                        >
                          <Card.Text>{comment.commentBody}</Card.Text>
                          <div className="text-end">
                            <span className="fw-light">
                              Auteur: {comment.username} Date: {newDateComment}
                            </span>
                          </div>
                          {authState.id === comment.UserId && (
                            <div className="d-grid gap-2 d-md-flex mt-2 justify-content-md-end">
                              {/* Afin de récupérer l'Id du commentaire dans la fonction deleteComment, on passe l'Id récupéré via le .map comme paramètre */}
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => deleteComment(comment.id)}
                              >
                                {" "}
                                Modifier
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deleteComment(comment.id)}
                              >
                                {" "}
                                Supprimer
                              </Button>
                            </div>
                          )}
                        </Card.Body>
                      );
                    })}
                </div>
              </>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Post;
