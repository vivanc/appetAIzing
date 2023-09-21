import "./sign-up.styles.css";

const SignUp = () => {
  return (
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
      <button type="submit" className="btn btn-primary">
        Gmail
      </button>
    </div>
  );
};

export default SignUp;
