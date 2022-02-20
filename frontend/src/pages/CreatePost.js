import React from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
import { useState } from "react";
// Formik est une librairie open source qui permet de contruire des formulaires plus facilement, de gérer les erreurs etc...
import { Formik, Form, Field, ErrorMessage } from "formik";
// Yup est une librairie souvent utilisé avec des formulaires et permet de gérer les validations (mdp de x caractères etc)
import * as Yup from "yup";
// On utilise useNavigate pour faire une redirection après l'envoi du formulaire
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  // Avec Yup et le Schema nous allons spécifier ce dont nous avons besoin dans les champs (validation)
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, `Le titre doit contenir au minimum 5 caractères`)
      .max(150, `Le titre doit contenir au maximum 150 caractères`)
      .required(`Le champ Titre doit être rempli`),
    postText: Yup.string().required(`Le champ Contenu doit être rempli`),
    username: Yup.string().required(`Le champ Auteur doit être rempli`),
  });

  const onSubmit = (data) => {
    Axios.post("http://localhost:3001/posts", data).then((response) => {
      // On ajoute les données dans le "state" ce qui va permettre d'utiliser les données dans l'application
      setListOfPosts(response.data);
      navigate("/");
    });
  };

  return (
    <div className="createPost">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Titre: </label>
          <ErrorMessage name="title" component="span" />
          <Field id="inputCreatePost" name="title" placeholder="Le titre" />
          <label>Contenu: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="Le contenu du post"
          />
          <label>Auteur: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="L'auteur du post"
          />
          <button type="submit"> Envoyer</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
