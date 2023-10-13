import { render, screen } from "@testing-library/react";
import SignUp from "./sign-up.component.js";

it("properly render signup component", () => {
  render(<SignUp />);
  const signUpComponent = screen.getByTestId("sign-up");
  expect(signUpComponent).toBeInTheDocument();
});
