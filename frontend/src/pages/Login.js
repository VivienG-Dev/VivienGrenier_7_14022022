import React, { useContext, useEffect, useState } from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// On utilise useNavigate pour faire une redirection après l'envoi du formulaire
import { useNavigate } from "react-router-dom";
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
} from "react-bootstrap";

// Obligatoire pour la session
// Axios.defaults.withCredentials = true;

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const login = () => {
    const data = { username: username, password: password };
    Axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        setAlert(true);
        setAlertMessage(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
        // console.log(response.data);
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={10} md={10} xl={6}>
          <Card className="card rounded-3 shadow border-0">
            <Card.Body>
              <Card.Title className="text-center mb-4">Connexion</Card.Title>
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
              <div className="createPost">
                <label>Utilisateur</label>
                <input
                  className="form-control mb-4"
                  type="text"
                  placeholder="Le nom d'utilisateur..."
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label>Mot de passe</label>
                <input
                  className="form-control mb-4"
                  type="password"
                  placeholder="Le mot de passe..."
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Button className="btn btn-danger" onClick={login}>
                  {" "}
                  Se connecter
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Login;
