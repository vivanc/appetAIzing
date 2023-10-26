import { ReactComponent as ProfileLogo } from "../../assets/profile.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="d-flex flex-column ">
      <ProfileLogo className="mx-auto" />

      <Link
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
      <Link
        className="py-3 my-3 bg-secondary text-white h4 text-decoration-none"
        to=""
      >
        Log Out
      </Link>
    </nav>
  );
};

export default NavBar;
