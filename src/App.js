import SignUp from "../src/components/sign-up/sign-up.component.js";
import TopSection from "./components/top-section/top-section.js";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = () => {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<TopSection/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  </Router>
  );
  
};

export default App;
