import React from "react";
import Bootstrap from "react-bootstrap";
import { Link } from "react-router-dom";

const IntroRightSection = () => {
  return (
    <div>
      <div className="text-center">
        <h4>
          AppetAIzing is your culinary companion, a platform designed for recipe
          enthusiasts. Simply create a recipe with our AI-powered feature!
        </h4>
        <Link to="/signin">
          <button>Signin</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default IntroRightSection;
