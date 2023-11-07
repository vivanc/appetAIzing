import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./view-recipe.styles.css";

const ViewRecipe = () => {
  const [recipe, setRecipe] = useState({});
  //switch between view mode and edit mode using editing hook
  const [isEditing, setIsEditing] = useState(true);
  let { recipeId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/recipe/${recipeId}`)
      .then((response) => {
        const returnedRecipe = response.data;
        setRecipe(returnedRecipe[0]);
      });
  }, []);

  //pre-process recipe.steps and recipe.ingredients line by line and put within input value
  // const convertInput = (elements) => {
  //   let resultStr = "";
  //   elements.map((element) => {
  //     resultStr.concat(element).
  //   })
  // }

  return (

    <div className="card mb-3">
      <img
        className="card-img-top img-cap"
        src={recipe.image_url}
        alt="Card image cap"
      />
      <div className="d-inline-flex justify-content-end">
        {
          isEditing === false ?
            <button className="btn btn-light" type="button">
              Edit Recipe
            </button>
            :
            <button className="btn btn-light" type="button">
              Save Recipe
            </button>
        }

      </div>

      <div className="card-body">
        {
          isEditing === false ?
            <>
              <h3 className="card-title">{recipe.name}</h3>
              <br />
              <h5 className="card-title">Ingredients: </h5>
              <p className="card-text">
              <ul>
            {
              recipe.ingredients.map((ingredient, index) => {
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
                recipe.steps.map((step, index) => {
                  return <li>{step}</li>
                })
              }
            </ul>
                </p>
            </>
            :
            
              <form>
                <h3 className="card-title"><input value={recipe.name}></input></h3>
                <br />
                <h5 className="card-title">Ingredients: </h5>
                <div><textarea className="input-style" 
                value={recipe.ingredients}>
                  </textarea>
                  </div>
                <br />
                <h5 className="card-title">Steps: </h5>
                <div><textarea type="text" class="form-control" value={recipe.steps}></textarea></div>
                </form>
             
        }

      </div>
    </div>
  
      );
};
      export default ViewRecipe;
