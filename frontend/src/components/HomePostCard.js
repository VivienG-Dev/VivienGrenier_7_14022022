import React from "react";
// Bootstrap
import { Card, Button } from "react-bootstrap";

function HomePostCard(props) {
  return (
    <Card className="card mb-4 rounded-3 shadow" border="light">
      <Card.Body>
        <span className="fw-light">
          Auteur: {props.post.username} Date: {props.newDatePost}
        </span>
        <Card.Title>{props.post.title}</Card.Title>
        <Card.Text>{props.truncate(props.post.postText, 250, props.post.postText)}</Card.Text>
        <div className="d-flex justify-content-end">
          <Button
            className="btn btn-danger"
            onClick={() => {
              props.navigate(`/posts/${props.post.id}`);
            }}
          >
            Lire la suite
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default HomePostCard;
