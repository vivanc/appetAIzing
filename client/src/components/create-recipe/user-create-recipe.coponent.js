import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';

const UserCreateRecipe = () => {

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    steps: "",
    image_url: "http://"
  })

  const handleInput = (event) => {
    setNewRecipe({...newRecipe, [event.target.name]: event.target.value })
    // console.log(newRecipe);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newRecipe)
    //newRecipe was {newRecipe} what's different?
    axios.post('http://localhost:5001/api/recipe/new', newRecipe)
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  return (
    <>
      <form>
        <div>Recipe Name:</div>
        <div><input type="text" onChange={handleInput} name="name"></input></div>
        <div>Ingredients:</div>
        <textarea onChange={handleInput} name="ingredients"/>
        <div>Steps:</div>
        <textarea onChange={handleInput} name="steps"/>
        {/* Image file component */}
        <div>
        <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
        </div>
        
      </form>
    </>
  )
};

export default UserCreateRecipe;
