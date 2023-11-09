import SignUp from "../src/components/sign-up/sign-up.component.js";
import SignIn from "../src/components/sign-in/sign-in.component.js";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/main-page/main-page.component.js";
import HomePage from "./components/home-page/home-page.component";
import CreateRecipe from "./components/create-recipe/create-recipe.component.js";
import RecipeCard from "./components/recipe-card/recipe-card.component.js";
import ViewRecipe from "./components/view-recipe/view-recipe.component.js";
import { UserContext } from "./contexts/user.context";
import { useState, useEffect } from "react";
import ProtectedRoutes from "./components/protected-routes/protected-routes.component";
import axios from "axios";
import { NoMatch } from "./components/no-match/no-match.component";
import Recipe from "./components/recipe/recipe.component";
import UploadImage from "./components/upload-image/upload-image.component";
import UpdateRecipe from "./components/update-recipe/update-recipe.js";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const value = { currentUser, setCurrentUser };
  const [recipes, setRecipes] = useState([]);

  console.log("1. app.js currentUser: ");
  console.log(currentUser);

  useEffect(() => {
    console.log(recipes);
    axios.get("http://localhost:5001/api/recipes").then((response) => {
      const returnedRecipes = response.data;
      setRecipes(returnedRecipes);
    });
  }, []);

  return (
    <>
      <div>
        <UserContext.Provider value={value}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {/* <Route element={<ProtectedRoutes />}> */}
            <Route path="/home" element={<HomePage />}>
              <Route index element={<Recipe recipes={recipes} />} />
              <Route path="create-recipe" element={<CreateRecipe />} />
              <Route path="recipe/:recipeId" element={<ViewRecipe />} />
              <Route path="recipe/:recipeId/edit" element={<UpdateRecipe/>}/>
            </Route>
            {/* </Route> */}
            <Route path="*" element={<NoMatch />} />
            <Route path="/upload-image" element={<UploadImage />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default App;
