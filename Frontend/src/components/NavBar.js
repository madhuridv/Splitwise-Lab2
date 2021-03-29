import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png";

import { Navbar, Nav, Form, Button } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <div className="landing">
        {" "}
        <Navbar bg="light" expand="lg">
          <img className="landing-logo" src={logo} alt="Logo" width="20px" />
          <Navbar.Brand href="#home" margin="5px ">
            Splitwise
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Form inline float-right>
              <a href="http://localhost:3000/login">
                {" "}
                <Button variant="outline-success">Login</Button>
              </a>
              &nbsp;&nbsp;
              <a href="http://localhost:3000/signup">
                {" "}
                <Button variant="outline-success">Sign Up</Button>
              </a>
            </Form>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
