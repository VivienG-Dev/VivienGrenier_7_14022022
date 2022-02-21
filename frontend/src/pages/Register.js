import React from "react";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
// Formik est une librairie open source qui permet de contruire des formulaires plus facilement, de gérer les erreurs etc...
import { Formik, Form, Field, ErrorMessage } from "formik";
// Yup est une librairie souvent utilisé avec des formulaires et permet de gérer les validations (mdp de x caractères etc)
import * as Yup from "yup";
// On utilise useNavigate pour faire une redirection après l'envoi du formulaire
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  // Avec Yup et le Schema nous allons spécifier ce dont nous avons besoin dans les champs (validation)
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, `Le nom doit contenir au minimum 3 caractères`)
      .max(30, `Le nom doit contenir au maximum 30 caractères`)
      .required(`Le champ doit être rempli`),
    password: Yup.string().min(5).max(20).required(`Le champ doit être rempli`),
  });

  const onSubmit = (data) => {
    Axios.post("http://localhost:3001/auth", data).then((response) => {
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
          <label>Nom: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="Le nom d'utilisateur..."
          />
          <label>Mot de passe: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputCreatePost"
            type="password"
            name="password"
            placeholder="Votre mot de passe..."
          />
          <button type="submit"> S'inscrire</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
