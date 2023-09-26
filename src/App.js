import SignUp from "../src/components/sign-up/sign-up.component.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/main-page.js/main-page.js";
import HomePage from "./components/home-page/home-page.component";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
