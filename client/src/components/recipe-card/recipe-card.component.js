import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = (props) => {
  const {recipe} = props;
  // const [recipeId, setRecipeId] = useState(0);

  let navigate = useNavigate()
  const handleRecipeClick = (e) => {
    e.preventDefault()
    // setRecipeId(recipe.id)
    navigate(`/recipe/${recipe.id}`)
  }
  
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={recipe.image_url}
        width="300"
        height="auto"
        alt={recipe.name}
      />

      <div className="card-body">
        <h4 className="card-title">{recipe.name}</h4>
        <h6>Ingredients:</h6>
        <p className="card-text">{recipe.ingredients}</p>
        <h6>Steps:</h6>
        <p className="card-text">{recipe.steps}</p>
        <p className="card-text">.....</p>
        <button onClick={handleRecipeClick} className="btn btn-warning" type="button">
          Read More
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
