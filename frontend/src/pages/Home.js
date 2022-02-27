import React from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// useEffect aura pour effet de se déclencher sur le cycle de vie du montage et de la mise à jour (componentDidMount/componentDidUpdate)
import { useEffect, useState } from "react";
// Pour réaliser des redirections (anciennement useHistory)
import { useNavigate } from "react-router-dom";
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
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10} md={10} xl={6}>
            {listOfPosts.map((post, index) => {
              return (
                <Card
                  className="card mb-4 rounded-3 shadow"
                  border="light"
                  key={index}
                >
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.postText}</Card.Text>
                    <Button className="btn btn-danger"
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
