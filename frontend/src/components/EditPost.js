import React from "react";
import { useState } from "react";
// Bootstrap
import { Button, Modal } from "react-bootstrap";

function EditPost(props) {
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
          <Modal.Title>Modification de l'article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Titre de l'article:</label>
          <input
            className="form-control"
            defaultValue={props.dataParentToChild.title}
            onChange={(e)=>props.title(e.target.value)}
          ></input>
          <label>Contenu de l'article:</label>
          <textarea
            className="form-control"
            rows="5"
            defaultValue={props.dataParentToChild.postText}
            onChange={(e)=>props.body(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          {/* Au clique, deux fonctions seront appelées, la première pour envoyer des données au backend et la seconde pour fermer la fenêtre */}
          <Button variant="primary" onClick={()=>{ props.editPost(); handleClose(); }}>
            Envoyer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPost;
