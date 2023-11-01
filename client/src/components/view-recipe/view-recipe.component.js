import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';


const ViewRecipe = () => {

  const [recipe, setRecipe] = useState({})
  let { recipeId } = useParams()
  console.log(recipeId)

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/recipe/${recipeId}`)
      .then(response => {
        const returnedRecipe = response.data
        setRecipe(returnedRecipe[0])
      })
  }, [])



  return (
    <div className="card mb-3">
      <img
        className="card-img-top"
        src={recipe.image_url}
        alt="Card image cap"
      />
      <div className="d-inline-flex justify-content-end">
        <button className="btn btn-light" type="button">
          Edit Recipe
        </button>
        <button className="btn btn-light" type="button">
          Save Recipe
        </button>
      </div>

      <div className="card-body">
        <h3 className="card-title">{recipe.name}</h3>
        <br />
        <h5 className="card-title">Ingredients: </h5>
        <p className="card-text">{recipe.ingredients}</p>
        <br />
        <h5 className="card-title">Steps: </h5>
        <p className="card-text">{recipe.steps}</p>
      </div>
    </div>
  );
};
export default ViewRecipe;
