import { ReactComponent as ProfileLogo } from "../../assets/profile.svg";

const NavBar = () => {
  return (
    <div className="container">
      <div>
        <ProfileLogo />
        <h2>Home</h2>
        <h2>Add Recipe</h2>
        <h2>Log Out</h2>
      </div>
    </div>
  );
};

export default NavBar;
