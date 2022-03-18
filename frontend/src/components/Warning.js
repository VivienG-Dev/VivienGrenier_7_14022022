import React from "react";
// Bootstrap
import { Alert } from "react-bootstrap";

function Warning(props) {
  return (
    <Alert variant="danger" onClose={() => props.setAlert(false)} dismissible>
      <Alert.Heading>Une erreur est apparue !</Alert.Heading>
      <p>{props.message}</p>
    </Alert>
  );
}

export default Warning;
