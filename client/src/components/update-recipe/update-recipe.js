import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./update-recipe.styles.css";
import { useNavigate } from "react-router-dom";

const UpdateRecipe = () => {
    const [recipe, setRecipe] = useState({ ingredients: [], steps: [] });
    // const [editedRecipe, setEditedRecipe] = useState({name: '', ingredients:'', steps: ''})
    let { recipeId } = useParams();
    let navigate = useNavigate();
 

    const handleInput = (event) => {
        console.log(event.target.name, event.target.value)
        if (event.target.name === "ingredients" || event.target.name === 'steps') {
            setRecipe({...recipe, [event.target.name]: event.target.value.split('\n')})

        } else {
            setRecipe({...recipe, [event.target.name]: event.target.value })
        }
        // console.log(newRecipe);
      }

    const saveEditedRecipe = (event) => {
        console.log('this funciton is called?')
        event.preventDefault()
        // setRecipe({ ...recipe, [event.target.name]: event.target.value })
        axios
        .put(`http://localhost:5001/api/recipe/${recipeId}`, recipe)
        .then((response) => {
                console.log(response.data)
                navigate(`../recipe/${recipeId}`)
            })
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
                <button type="submit" id="update-recipe-form" className="btn btn-light" onClick={saveEditedRecipe}>
                    Save Recipe
                </button>

            </div>


            <div className="card-body">
                <form id="update-recipe-form">
                    <h3 className="card-title">
                        <input type='text' name="name" value={recipe.name} onChange={handleInput}></input>
                    </h3>
                    <br />
                    <h5 className="card-title">Ingredients: </h5>
                    <div>
                        <textarea className="input-style" name="ingredients" value={recipe.ingredients.join('\n')} onChange={handleInput}></textarea>
                    </div>
                    <br />
                    <h5 className="card-title">Steps: </h5>
                    <div>
                        <textarea name="steps" class="form-control" value={recipe.steps.join('\n')} onChange={handleInput}></textarea>
                    </div>
                </form>

            </div>
        </div>

    );
};
export default UpdateRecipe;
