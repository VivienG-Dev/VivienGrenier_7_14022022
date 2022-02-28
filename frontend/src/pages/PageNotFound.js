import React from 'react'
import { Link } from 'react-router-dom'
import {
    Row,
    Col,
    Card,
    Container,
  } from "react-bootstrap";

function PageNotFound() {
  return (
    <Container>
        <Row>
            <Col></Col>
            <Col xs={10} md={10} xl={6}>
            <Card className="card mb-4 rounded-3 shadow border-0">
                <Card.Body>
                    <Card.Title className="text-center mb-4">Page Not Found</Card.Title>
                    <Card.Text as="h3" className="text-center"><Link className="nav-link" to="/">
                    Retour à l'accueil
                  </Link></Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col></Col>
        </Row>
    </Container>
  )
}

export default PageNotFound