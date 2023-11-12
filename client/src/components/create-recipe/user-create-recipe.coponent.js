import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';

const UserCreateRecipe = () => {

  const { currentUser } = useContext(UserContext);

  const [newRecipe, setNewRecipe] = useState({
    user_id: currentUser.sub,
    name: "",
    ingredients: "",
    steps: "",
    image_url: "http://"
  })

  const [redirect, setRedirect] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState('')

  let navigate = useNavigate()

  useEffect(() => {
     {console.log(redirect)}
      navigate(redirectRoute)
  }
  , [redirect])

  const handleInput = (event) => {
    setNewRecipe({...newRecipe, [event.target.name]: event.target.value })
    // console.log(newRecipe)
    // console.log(newRecipe);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    //newRecipe was {newRecipe} what's different?
    axios.post('http://localhost:5001/api/recipe/new', newRecipe)
    .then(response => {
      //typeof response.data: object; typeof response.data[0]: undefined
      //because the objects are not indexed like array, can only access with its key
      // console.log("type of", typeof (response.data))
      //either use object.key or obeject["key"]
      // console.log("data content's id", response.data.id)
      console.log(response.data)
      setRedirectRoute(`../recipe/${response.data.id}`)
      setRedirect(true)
    })
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
