import SignUp from "../src/components/sign-up/sign-up.component.js";
import SignIn from "../src/components/sign-in/sign-in.component.js";
import SignUpGoogle from "../src/components/sign-up-google/sign-up-google.component.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/main-page/main-page.component.js";
import HomePage from "./components/home-page/home-page.component";
import CreateRecipe from "./components/create-recipe/create-recipe.component.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signupgoogle" element={<SignUpGoogle />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
