import React from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// useEffect aura pour effet de se déclencher sur le cycle de vie du montage et de la mise à jour (componentDidMount/componentDidUpdate)
import { useEffect, useState } from "react";
// Pour réaliser des redirections (anciennement useHistory)
import { useNavigate } from "react-router-dom";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
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
    <div className="information">
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10} md={10} xl={6}>
            {listOfPosts.map((post, index) => {
              return (
                <Card
                  className="card mb-4 rounded-3 shadow-sm"
                  border="light"
                  key={index}
                  onClick={() => {
                    navigate(`/posts/${post.id}`);
                  }}
                >
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.postText}</Card.Text>
                  </Card.Body>
                  <Card.Footer>Auteur: {post.username}</Card.Footer>
                </Card>
              );
            })}
          </Col>
          <Col></Col>
        </Row>
      </Container>
      {/* Comme le State est un tableau, on utilise map pour naviguer dedans */}
    </div>
  );
}

export default Home;
