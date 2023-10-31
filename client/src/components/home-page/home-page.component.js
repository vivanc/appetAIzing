import TopSection from "../top-section/top-section.component";
import NavBar from "../nav-bar/nav-bar.component";
import RecipeCard from "../recipe-card/recipe-card.component";
import ViewRecipe from "../view-recipe/view-recipe.component";
import SearchBar from "../search-bar/search-bar.component";
import { Container, Row, Col } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { RecipesContext } from "../../contexts/recipe.context";
import axios from "axios";


const HomePage = ({recipes}) => {

  console.log(recipes);

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
      <Row
        style={{
          height: "5%",
          width: "100vw",
        }}
      >
        <Col className="d-flex justify-content-center">
          <SearchBar />
        </Col>
      </Row>
      <Row className="h-100">
        <Col className="col-2 text-center">
          <NavBar />
        </Col>
        <Col className="col">
          {
            recipes.map((recipe) => {
              return <RecipeCard  recipe={recipe}/>
            })
          }
          {/*<RecipeCard />*/}
        </Col>
        {/* && <ViewRecipe /> */}
        {/* && <CreateRecipe /> */}
      </Row>
    </Container>
  );
};

export default HomePage;
