import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./view-recipe.styles.css";

const ViewRecipe = () => {
  const [recipe, setRecipe] = useState({ingredients: [], steps: []});
  //switch between view mode and edit mode using editing hook
  const [isEditing, setIsEditing] = useState(false);
  let { recipeId } = useParams();
  // const [editedRecipe, setEditedRecipe] = useState({ingredients: [], steps: []})
  

  const switchEditMode = () => {
    setIsEditing(!isEditing)
  }

  // const updateContent = (event) => {
  //   setRecipe({...recipe, [event.target.name]: event.target.value })
  // }

  const saveEditedRecipe = (event) => {
    setRecipe({...recipe, [event.target.name]: event.target.value })
    axios.put(`/api/recipe/${recipeId}`, recipe)
    .then((response) => {
      console.log(response.data)
      setIsEditing(!isEditing)
    })
  }

  useEffect(() => {
    console.log(isEditing)
    axios
    .get(`http://localhost:5001/api/recipe/${recipeId}`)
    .then((response) => {
      const returnedRecipe = response.data;
      setRecipe(returnedRecipe[0]);
    })
  }, [isEditing])


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
            <button className="btn btn-light" onClick={switchEditMode}>
              Edit Recipe
            </button>
            :
            <button form="editRecipeForm" className="btn btn-light" onClick={saveEditedRecipe}>
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
            :

            <form id="editRecipeForm">
              <h3 className="card-title">
                <input type='text' name="name" value={recipe.name}></input>
              </h3>
              <br />
              <h5 className="card-title">Ingredients: </h5>
              <div>
              <textarea type='text' className="input-style" name="ingredients" value={recipe.ingredients.join('\n')}></textarea>
              </div>
              <br />
              <h5 className="card-title">Steps: </h5>
              <div>
                <textarea type="text" name="steps" class="form-control" value={recipe.steps.join('\n')}></textarea>
                </div>
            </form>

        }

      </div>
    </div>

  );
};
export default ViewRecipe;
