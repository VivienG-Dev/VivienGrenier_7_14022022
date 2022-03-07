import React from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// useEffect aura pour effet de se déclencher sur le cycle de vie du montage et de la mise à jour (componentDidMount/componentDidUpdate)
import { useEffect, useState, useContext } from "react";
// Pour réaliser des redirections (anciennement useHistory)
import { useNavigate } from "react-router-dom";
// Bootstrap
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  // Quand la page est crée, la logique écrite dans useEffect est activé une fois seulement dans ce cas précis (sauf si on rempli la dépendance dans [])
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      Axios.get("http://localhost:3001/posts").then((response) => {
        // On ajoute les données dans le "state" ce qui va permettre d'utiliser les données dans l'application
        setListOfPosts(response.data);
      });
    }
  }, []);

  const createPost = () => {
    navigate("/submit");
  };

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10} md={10} xl={6}>
            <Card className="card mb-4 rounded-3 shadow" border="light">
              <Card.Body>
                <input
                  className="form-control"
                  placeholder="Poster un article..."
                  onClick={createPost}
                ></input>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={10} md={10} xl={6}>
            {/* slice permet de retourner un nouveau tableau et le reverse l'inverser, le but étant d'avoir le dernier post en haut de la page */}
            {listOfPosts
              .slice(0)
              .reverse()
              .map((post, index) => {
                return (
                  <Card
                    className="card mb-4 rounded-3 shadow"
                    border="light"
                    key={index}
                  >
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.postText}</Card.Text>
                      <Button
                        className="btn btn-danger"
                        onClick={() => {
                          navigate(`/posts/${post.id}`);
                        }}
                      >
                        Lire la suite
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </Col>
          <Col></Col>
        </Row>
      </Container>
      {/* Comme le State est un tableau, on utilise map pour naviguer dedans */}
    </>
  );
}

export default Home;
