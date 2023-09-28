import SignUp from "../src/components/sign-up/sign-up.component.js";
import TopSection from "./components/top-section/top-section.js";
import AICreateRecipe from "./components/ai-create-recipe/ai-create-recipe.js";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = () => {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<TopSection/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/ai-create-recipe" element={<AICreateRecipe/>}/>
    </Routes>
  </Router>
  );
  
};

export default App;
