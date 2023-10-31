import SignUp from "../src/components/sign-up/sign-up.component.js";
import SignIn from "../src/components/sign-in/sign-in.component.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/main-page/main-page.component.js";
import HomePage from "./components/home-page/home-page.component";
import CreateRecipe from "./components/create-recipe/create-recipe.component.js";
import { UserContext } from "./contexts/user.context";
import { useState, useEffect } from "react";
import ProtectedRoutes from "./components/protected-routes/protected-routes.component";
import axios from "axios";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const value = { currentUser, setCurrentUser };
  const [recipes, setRecipes] = useState([]);

  console.log("1. app.js currentUser: ");
  console.log(currentUser);

  useEffect(() => {
    console.log(recipes)
    axios
      .get('http://localhost:5001/api/recipes')
      .then(response => {
        const retunedRecipes = response.data
        setRecipes(retunedRecipes)
      })
  }, [])

  return (
    <Router>
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          {/* </Route> */}
          <Route path="/testhome" element={<HomePage recipes={recipes} />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
