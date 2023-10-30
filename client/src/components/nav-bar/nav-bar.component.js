import { ReactComponent as ProfileLogo } from "../../assets/profile.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { NavBarData } from "./nav-bar-data";

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser({});
    navigate("/");
  };

  console.log("3. nav bar component after logout: ");
  console.log(currentUser);

  return (
    <nav className="d-flex flex-column ">
      <ProfileLogo className="mx-auto" />
      {NavBarData.map((item, index) => {
        return (
          <div key={index}>
            <span className="bg-secondary text-white h4 text-decoration-none">
              {item.title}
            </span>
          </div>
        );
      })}

      {/* <Link
        className="py-3 my-3 bg-secondary text-white h4 text-decoration-none"
        to="/home"
      >
        Home
      </Link>
      <Link
        className="py-3 my-3 bg-secondary text-white h4 text-decoration-none"
        to="/create-recipe"
      >
        Add Recipe
      </Link>
      <button
        type="button"
        className="py-3 my-3 bg-secondary text-white h4 text-decoration-none"
        onClick={handleLogout}
      >
        Log Out
      </button> */}
    </nav>
  );
};

export default NavBar;
