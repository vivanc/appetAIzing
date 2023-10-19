import "./sign-up.styles.css";
import React from "react";
import TopSection from "../top-section/top-section.component";
import IntroLeftSection from "../intro-left-section/intro-left-section.component";
import SignUpGoogle from "../sign-up-google/sign-up-google.component";
import { Container, Col, Row } from "react-bootstrap";

const SignUp = () => {
  return (
    <>
      <Container>
        <Row style={{ height: "10vh", width: "100vw" }}>
          <Col>
            <TopSection />
          </Col>
        </Row>
        <Row style={{ height: "90vh", width: "100vw" }}>
          <Col>
            <IntroLeftSection />
          </Col>
          <Col>
            <div data-testid="sign-up" className="sign-up-container">
              <h2>Sign up</h2>
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
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
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
                  Sign Up
                </button>
              </form>
              <h5>Or Sign Up Using</h5>
              <div>
                <SignUpGoogle />
              </div>
              {/* <button type="submit" className="btn btn-primary">
                Gmail
              </button> */}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
