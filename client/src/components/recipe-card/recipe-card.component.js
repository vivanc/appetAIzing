import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import RECIPE from "../../assets/recipe.json";
import SearchBar from "../search-bar/search-bar.component";
import "./recipe-card.styles.css";

const RecipeCard = (props) => {
  const { recipe } = props;

  let navigate = useNavigate();
  const handleRecipeClick = (e) => {
    e.preventDefault();
    navigate(`recipe/${recipe.id}`);
  };

  console.log("recipe card render!");

  return (
    <>
      <div className="card m-3" style={{ width: "18rem" }}>
        <img
          className="card-img-top img-fit mt-3"
          src={recipe.image_url}
          width="300"
          height="auto"
          alt={recipe.name}
        />

        <div className="card-body text-truncate">
          <h4 className="card-title">{recipe.name}</h4>
          <h6>Ingredients:</h6>
          <p className="card-text">
            <ul>
            {
              recipe.ingredients.map((ingredient, index) => {
                if (index < 3) {
                  return <li>{ingredient}</li>
                }
                if (index === 3) {
                  return "......"
                }
                
              })
            }
            </ul>
          </p>
          <h6>Steps:</h6>
          <p className="card-text">
          <ul>
              {
                recipe.steps.map((step, index) => {
                  if ( index < 3 ) {
                    return <li>{step}</li>
                  }
                  if (index === 3) {
                    return "......"
                  }
                })
              }
            </ul>
          </p>
          <div className="text-end">
            <button
              onClick={handleRecipeClick}
              className="btn btn-warning"
              type="button"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
