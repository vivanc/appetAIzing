import SignUp from "../src/components/sign-up/sign-up.component.js";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from "./components/main-page.js/main-page.js";

const App = () => {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  </Router>
  );
  
};

export default App;
