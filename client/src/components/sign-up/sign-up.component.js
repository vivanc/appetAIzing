import "./sign-up.styles.css";
import React, { useEffect, useContext } from "react";
import TopSection from "../top-section/top-section.component";
import IntroLeftSection from "../intro-left-section/intro-left-section.component";
import { Container, Col, Row } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  console.log("2. signup component after signup: ");
  console.log(currentUser);

  const handleCallbackResponse = (r) => {
    console.log("Encoded JWT ID token: " + r.credential);
    const currentUserObject = jwt_decode(r.credential);
    setCurrentUser(currentUserObject);
    navigate("/home");
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "39650006073-2krmk3vkmevjck8chahmgr0q01hobnd2.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("sign-up-google"), {
      theme: "outline",
      type: "icon",
      shape: "pill",
      size: "large",
    });
  }, []);

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
              {/* <h2>Sign up</h2>
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
              </form> */}
              <h3 className="d-flex align-items-center flex-column font-weight-bold pt-5">
                Join us now 🎉
              </h3>
              <div className="d-flex align-items-center flex-column">
                <h5 className="text-success">Sign in with</h5>
                <div className="pb-5" id="sign-up-google"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
