import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="landing-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h1>Welcome to Our Store</h1>
            <p className="lead">
              Discover amazing products for your everyday needs.
            </p>
            <Link to="/login">
              <Button variant="outline-primary">Login to Explore</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;