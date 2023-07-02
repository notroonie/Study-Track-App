import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import "../assets/index.css";
import main from "../assets/images/main.svg";

const Landing = () => {
  return (
    <main>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Study tracker</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="landing-main">
        <div className="text">
          <h2>Study tracker</h2>
          <p>
            Welcome to the one stop for all your Study needs. Keep track of all
            your Studys from one place. <br />
            <Link to="/register" className="btn" style={{ marginTop: "1em" }}>
              Login/Register
            </Link>
          </p>
        </div>
        <img src={main} alt="main" className="img-main" />
      </div>
    </main>
  );
};

export default Landing;
