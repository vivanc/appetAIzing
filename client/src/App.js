import SignUp from "../src/components/sign-up/sign-up.component.js";
import SignIn from "../src/components/sign-in/sign-in.component.js";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/main-page/main-page.component.js";
import HomePage from "./components/home-page/home-page.component";
import CreateRecipe from "./components/create-recipe/create-recipe.component.js";
import UserCreateRecipe from "./components/create-recipe/user-create-recipe.coponent.js";
import RecipeCard from "./components/recipe-card/recipe-card.component.js";
import ViewRecipe from "./components/view-recipe/view-recipe.component.js";
import { UserContext } from "./contexts/user.context";
import { RecipesContext } from "./contexts/recipe.context";
import { useState, useEffect } from "react";
import ProtectedRoutes from "./components/protected-routes/protected-routes.component";
import axios from "axios";
import { NoMatch } from "./components/no-match/no-match.component";
import Recipe from "./components/recipe/recipe.component";
import UpdateRecipe from "./components/update-recipe/update-recipe.js";
import AICreateRecipe from "./components/create-recipe/ai-create-recipe.component.js";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const userValue = { currentUser, setCurrentUser };
  const [recipes, setRecipes] = useState([]);
  const recipesValue = { recipes, setRecipes };

  console.log("app.js render");

  return (
    <>
      <div>
        <UserContext.Provider value={userValue}>
          <RecipesContext.Provider value={recipesValue}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              {/* <Route element={<ProtectedRoutes />}> */}

              <Route path="/home" element={<HomePage />}>
                <Route index element={<Recipe />} />
                <Route path="create-recipe" element={<AICreateRecipe />} />
                <Route path="recipe/:recipeId" element={<ViewRecipe />} />
                <Route
                  path="recipe/:recipeId/edit"
                  element={<UpdateRecipe />}
                />
              </Route>

              {/* </Route> */}
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </RecipesContext.Provider>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default App;
