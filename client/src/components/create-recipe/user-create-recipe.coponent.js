import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const UserCreateRecipe = (props) => {

  const { aiRecipe } = props
  console.log('ai recipe in user create component', aiRecipe)
  // const baseRecipe = props.aiRecipe
  const [baseRecipe, setBaseRecipe] = useState({ name: "", ingredients: [], steps: [] })
  console.log('newRecipe', baseRecipe)

  const { currentUser } = useContext(UserContext);
  // const [file, setFile] = useState();

  // const [newRecipe, setNewRecipe] = useState({
  //   user_id: currentUser.sub,
  //   name: "",
  //   ingredients: "",
  //   steps: "",
  //   image_url: "http://",
  // });

  const [redirect, setRedirect] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState("");

  // once recipe created and submitted, trigger redirect to view recipe by id
  let navigate = useNavigate();

  useEffect(() => {
    console.log('props in use effect', props)
    setBaseRecipe(props.aiRecipe)
  }, [props.aiRecipe]);

  useEffect(() => {
    navigate(redirectRoute);
  }, [redirect]);

  // useEffect(() => {
  //   setBaseRecipe(props.aiRecipe)
  //   console.log(baseRecipe)
  // }, [])

  // set recipe to user input
  const handleInput = (event) => {
    console.log(event.target.name, event.target.value)
    if (event.target.name === "ingredients" || event.target.name === 'steps') {
      setBaseRecipe({ ...baseRecipe, [event.target.name]: event.target.value.split('\n') })

    } else {
      setBaseRecipe({ ...baseRecipe, [event.target.name]: event.target.value })
    }
    // console.log(newRecipe);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log('formdata', formData)
    formData.append("user_id", currentUser.sub);
    formData.append("image_url", "http://");
    formData.append("image_name", "placeholder");

    // to check formData
    const data = Object.fromEntries(formData);
    console.log("this is formData from e.currentTarget: ");
    console.log(data);

    //newRecipe was {newRecipe} what's different?
    await axios
      .post("http://localhost:5001/api/recipe/new", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        //typeof response.data: object; typeof response.data[0]: undefined
        //because the objects are not indexed like array, can only access with its key
        // console.log("type of", typeof (response.data))
        //either use object.key or obeject["key"]
        // console.log("data content's id", response.data.id)
        console.log(response.data);
        setRedirectRoute(`../recipe/${response.data.id}`);
        setRedirect(true);
      })
      .catch((error) => console.log(error));
  };

  // console.log("user create recipe component render:");

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>Recipe Name:</div>
        <div>
          <input type="text" name="name" onChange={handleInput} value={baseRecipe.name} style={{ width: '80%' }}></input>
          {/* onChange={handleInput}  */}
        </div>
        <div>Ingredients:</div>
        <textarea name="ingredients" onChange={handleInput} value={baseRecipe.ingredients.join('\n')} />
        {/* onChange={handleInput} */}
        <div>Steps:</div>
        <textarea name="steps" onChange={handleInput} value={baseRecipe.steps.join('\n')} />
        {/* onChange={handleInput} */}
        {/* Image file component */}
        <div>Upload image here:</div>
        <input
          type="file"
          // onChange={(e) => setFile(e.target.files[0])}
          name="image"
          accept="image/*"
        />
        {/* Image file component end */}
        <button
          type="submit"
          className="btn btn-primary"
        // onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default UserCreateRecipe;
