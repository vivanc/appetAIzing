import React from "react";
import "./sign-in.styles.css";

const SignIn = () => {
    return (
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
    );
  };

export default SignIn;