import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import MainPage from "../main-page/main-page.component";
import HomePage from "../home-page/home-page.component";
import CreateRecipe from "../create-recipe/create-recipe.component";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(UserContext);

  // checking currentUser attributes
  return Object.keys(currentUser).length != 0 ? <HomePage /> : <MainPage />;
};

export default ProtectedRoutes;
