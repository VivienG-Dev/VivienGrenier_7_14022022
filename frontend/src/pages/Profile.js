import React from "react";
// Bootstrap
import {
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

function Profile() {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={10} md={10} xl={6}>
          <Card className="card rounded-3 shadow border-0">
            <Card.Body>
              <Card.Title className="text-center mb-4">Profile</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Profile;
