import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./view-recipe.styles.css";
import { useNavigate } from "react-router-dom";

const ViewRecipe = () => {
  const [recipe, setRecipe] = useState({ ingredients: [], steps: [] });
  let { recipeId } = useParams();
  let navigate = useNavigate();

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate(`./edit`);
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to delete?")
    if (isConfirmed) {
      navigate('../../home')
      axios
      .delete(`http://localhost:5001/api/recipe/${recipeId}`)
      .then((response) => {
        console.log(response)
      })
    }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/recipe/${recipeId}`)
      .then((response) => {
        const returnedRecipe = response.data;
        setRecipe(returnedRecipe[0]);
      })
  }, [])


  return (
    <div className="card mb-3">
      <img
        className="card-img-top img-cap"
        src={recipe.image_url}
        alt="Card image cap"
      />
      <div className="d-inline-flex justify-content-end">
        <button className="btn btn-light" onClick={handleEditClick}>
          Edit Recipe
        </button>
        <button className="btn btn-light" onClick={handleDeleteClick}>
          Delete Recipe
        </button>
      </div>


      <div className="card-body">
        <>
          <h3 className="card-title">{recipe.name}</h3>
          <br />
          <h5 className="card-title">Ingredients: </h5>
          <p className="card-text">
            <ul>
              {
                recipe.ingredients.map((ingredient) => {
                  return <li>{ingredient}</li>
                })
              }
            </ul>
          </p>
          <br />
          <h5 className="card-title">Steps: </h5>
          <p className="card-text">
            <ul>
              {
                recipe.steps.map((step) => {
                  return <li>{step}</li>
                })
              }
            </ul>
          </p>
        </>

      </div>
    </div>

  );
};
export default ViewRecipe;
