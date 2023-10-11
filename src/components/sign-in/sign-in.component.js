import React from "react";
import TopSection from "../top-section/top-section.component";
import IntroLeftSection from "../intro-left-section/intro-left-section.component";
import "./sign-in.styles.css";
import { Container, Col, Row } from "react-bootstrap";

const SignIn = () => {
  return (
    <div>
      <Container>
        <Row style={{ height: "10vh", width: "100vw" }}>
          <Col ><TopSection /></Col>
        </Row>
        <Row style={{ height: "90vh", width: "100vw" }}>
          <Col ><IntroLeftSection /></Col>
          <Col >
            <div className="sign-in-container">
              <h2>Sign in</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </form>
              <h5>Or Sign Up</h5>
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>

  );
};

export default SignIn;