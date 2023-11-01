import TopSection from "../top-section/top-section.component";
import { Container, Row, Col } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { RecipesContext } from "../../contexts/recipe.context";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { NAV_BAR_DATA } from "../nav-bar/nav-bar-data.js";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";


const HomePage = ({recipes}) => {
  
  console.log(recipes);
  
  
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser({});
    navigate("/");
  };

  return (
    <Container fluid style={{ height: "100%", width: "100vw" }}>
      <Row
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "blanchedalmond",
          height: "10%",
          width: "100vw",
        }}
      >
        <Col className="d-flex align-items-center justify-content-center">
          <TopSection />
        </Col>
      </Row>
      <Row className="h-100">
        <Col className="col-2 d-flex flex-column h3 text-center mt-5">
          <img
            src={currentUser.picture}
            alt="authenticated user"
            width="50"
            height="50"
            className="mx-auto mb-3"
          />
          {currentUser.name}
          {NAV_BAR_DATA.map((item, index) => {
            return (
              <div key={index} className="py-4 my-3 bg-secondary">
                <NavLink
                  to={item.path}
                  className="text-white text-decoration-none"
                >
                  {item.title}
                </NavLink>
              </div>
            );
          })}
          <button
            type="button"
            className="py-4 my-3 bg-secondary h3 text-white"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </Col>
        <Col className="col">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
