import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(UserContext);

  // checking currentUser attributes
  return Object.keys(currentUser).length !== 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
