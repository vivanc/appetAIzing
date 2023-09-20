import "./sign-up.styles.css";

const SignUp = () => {
  return (
    <div className="sign-up-container">
      <h2>Sign up</h2>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Sign Up
        </button>
      </form>
      <h5>Or Sign Up Using</h5>
      <button type="submit" class="btn btn-primary">
        Gmail
      </button>
    </div>
  );
};

export default SignUp;
