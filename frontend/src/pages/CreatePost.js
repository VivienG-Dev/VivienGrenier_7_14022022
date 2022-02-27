import React from "react";
import { useState } from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// Formik est une librairie open source qui permet de contruire des formulaires plus facilement, de gérer les erreurs etc...
import { Formik, Form, Field, ErrorMessage } from "formik";
// Yup est une librairie souvent utilisé avec des formulaires et permet de gérer les validations (mdp de x caractères etc)
import * as Yup from "yup";
// On utilise useNavigate pour faire une redirection après l'envoi du formulaire
import { useNavigate } from "react-router-dom";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Card,
} from "react-bootstrap";

function CreatePost() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const initialValues = {
    title: "",
    postText: "",
  };

  // Avec Yup et le Schema nous allons spécifier ce dont nous avons besoin dans les champs (validation)
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, `Le titre doit contenir au minimum 5 caractères`)
      .max(150, `Le titre doit contenir au maximum 150 caractères`)
      .required(`Le champ Titre doit être rempli`),
    postText: Yup.string().required(`Le champ Contenu doit être rempli`),
  });

  const onSubmit = (data) => {
    Axios.post("http://localhost:3001/posts/submit", data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        // alert(response.data.error)
        setAlert(true)
        setAlertMessage(response.data.error)
      } else {
        navigate("/");
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
              <Card.Title className="text-center mb-4">
                Poster un article
              </Card.Title>
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
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                <Form className="formContainer">
                  <label>Titre</label>
                  <ErrorMessage name="title" component="span" />
                  <Field
                    className="form-control mb-3"
                    id="inputCreatePost"
                    name="title"
                    placeholder="Le titre"
                  />
                  <label>Contenu</label>
                  <ErrorMessage name="postText" component="span" />
                  <Field
                    as="textarea"
                    rows="5"
                    className="form-control mb-3"
                    id="inputCreatePost"
                    name="postText"
                    placeholder="Le contenu du post"
                  />
                  <Button className="btn btn-danger" type="submit">
                    {" "}
                    Envoyer
                  </Button>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
