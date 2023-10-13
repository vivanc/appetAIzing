import { ReactComponent as ProfileLogo } from "../../assets/profile.svg";

const NavBar = () => {
  return (
    <nav>
      <div className="pb-3">
        <ProfileLogo />
      </div>
      <ul className="list-unstyled h3">
        <li className="py-3 my-3 bg-secondary">Home</li>
        <li className="py-3 my-3 bg-secondary">Add Recipe</li>
        <li className="py-3 my-3 bg-secondary">Log Out</li>
      </ul>
    </nav>
  );
};

export default NavBar;
