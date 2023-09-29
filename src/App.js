import SignUp from "../src/components/sign-up/sign-up.component.js";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from "./components/main-page.js/main-page.js";
import CreateRecipe from "./components/create-recipe/create-recipe.component.js";

const App = () => {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/create-recipe" element={<CreateRecipe/>}/>
    </Routes>
  </Router>
  );
  
};

export default App;
