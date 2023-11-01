import SignUp from "../src/components/sign-up/sign-up.component.js";
import SignIn from "../src/components/sign-in/sign-in.component.js";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/main-page/main-page.component.js";
import HomePage from "./components/home-page/home-page.component";
import CreateRecipe from "./components/create-recipe/create-recipe.component.js";
import RecipeCard from "./components/recipe-card/recipe-card.component.js";
import ViewRecipe from "./components/view-recipe/view-recipe.component.js";
import { UserContext } from "./contexts/user.context";
import { useState } from "react";
import ProtectedRoutes from "./components/protected-routes/protected-routes.component";
import { NoMatch } from "./components/no-match/no-match.component";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const value = { currentUser, setCurrentUser };

  console.log("1. app.js currentUser: ");
  console.log(currentUser);

  return (
    <>
      <div>
        <UserContext.Provider value={value}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<HomePage />}>
                <Route index element={<RecipeCard />} />
                <Route path="create-recipe" element={<CreateRecipe />} />
                <Route path="view-recipe" element={<ViewRecipe />} />
              </Route>
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
};

export default App;
