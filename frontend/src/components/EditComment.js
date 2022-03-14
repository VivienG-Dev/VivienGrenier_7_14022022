import React from "react";
import { useState } from "react";
// Bootstrap
import { Button, Modal } from "react-bootstrap";

function EditComment(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="outline-success"
        size="sm"
        className="me-md-2"
        onClick={handleShow}
      >
        {" "}
        Modifier
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modification du commentaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Contenu du commentaire:</label>
          <input
            className="form-control"
            placeholder="Modifier le commentaire..."
            defaultValue={props.dataParentToChild.commentBody}
            onChange={(e) => props.body(e.target.value)}
            // onChange={(e) => {
            //   props.editPost("title", e.target.value);
            // }}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          {/* Au clique, deux fonctions seront appelées, la première pour envoyer des données au backend et la seconde pour fermer la fenêtre */}
          <Button
            variant="primary"
            onClick={() => {
              props.editComment();
              handleClose();
            }}
          >
            Envoyer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditComment;
