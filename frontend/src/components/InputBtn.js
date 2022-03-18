import React from "react";
// Bootstrap
import { Card } from "react-bootstrap";

function InputBtn(props) {
  return (
    <Card className="card mb-4 rounded-3 shadow" border="light">
      <Card.Body>
        <input
          className="form-control"
          placeholder="Ajouter un article..."
          onClick={props.createPost}
        ></input>
      </Card.Body>
    </Card>
  );
}

export default InputBtn;
