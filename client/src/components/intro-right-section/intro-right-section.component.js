import React from "react";
import Bootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

const IntroRightSection = () => {
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
    <div className="text-center">
      <h4>
        AppetAIzing is your culinary companion, a platform designed for recipe
        enthusiasts. Simply create a recipe with our AI-powered feature!
      </h4>
      <div
        data-testid="sign-up"
        className="d-flex align-items-center flex-column"
      >
        <h3 className="font-weight-bold pt-5">Join us now 🎉</h3>
        <div className="d-flex align-items-center flex-column">
          <h5 className="text-success">Sign in with</h5>
          <div className="pb-5" id="sign-up-google"></div>
        </div>
      </div>

      {/* <Link to="/signup">
          <button>Signup</button>
        </Link> */}
    </div>
  );
};

export default IntroRightSection;
