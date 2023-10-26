import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import MainPage from "../main-page/main-page.component";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(UserContext);
  console.log("current user from protected route: ");
  console.log(currentUser);

  // checking currentUser attributes
  return Object.keys(currentUser).length != 0 ? <Outlet /> : <MainPage />;
};

export default ProtectedRoutes;
