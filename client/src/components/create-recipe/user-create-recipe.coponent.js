import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { ToastContainer, toast } from "react-toastify";
import useMutation from "../../components/hooks/useMutation.component";
import useQuery from "../../components/hooks/useQuery.component";

const validFileTypes = ["image/png", "image/jpg", "image/jpeg"];

const UserCreateRecipe = () => {
  const { currentUser } = useContext(UserContext);

  const [newRecipe, setNewRecipe] = useState({
    user_id: currentUser.sub,
    name: "",
    ingredients: "",
    steps: "",
    image_url: "http://",
  });

  const [redirect, setRedirect] = useState(false);
  const [redirectRoute, setRedirectRoute] = useState("");

  const [error, setError] = useState(""); // file type check error
  const [file, setFile] = useState(null); // file/image object

  // custom hook to upload image to s3
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation("http://localhost:5001/api/image");

  // custom hook to fetch image from s3
  const {
    data: imageUrl = [],
    isLoading: imageLoading,
    error: fetchError,
  } = useQuery("http://localhost:5001/api/show/image");

  console.log("here the imageurl: ");
  console.log(imageUrl);

  // once recipe created and submitted, trigger redirect to view recipe by id
  let navigate = useNavigate();

  useEffect(() => {
    navigate(redirectRoute);
  }, [redirect]);

  // set recipe to user input
  const handleInput = (event) => {
    setNewRecipe({
      ...newRecipe,
      [event.target.name]: event.target.value,
      image_url: imageUrl[imageUrl.length - 1],
    });
  };

  // handle image upload
  const handleUpload = async (e) => {
    // grab file
    const file = e.target.files[0];
    console.log(e.target.files[0]);

    // check file type
    if (!validFileTypes.find((type) => type === file.type)) {
      setError("File must be in JPG/PNG format");
      return;
    }

    // toast notification
    toast.success("Successfully added image!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });

    setFile(file);
  };

  // handle submit recipe + image to server
  const handleSubmit = async (event) => {
    event.preventDefault();

    // need FormData to send it to back end = key(file name)/value(file itself)
    const form = new FormData();
    form.append("image", file);
    console.log(...form);
    await uploadImage(form);

    // set timeout for refetch 1sec
    // setTimeout(() => {
    //   setRefetch((s) => s + 1);
    // }, 1000);

    //newRecipe was {newRecipe} what's different?
    axios
      .post("http://localhost:5001/api/recipe/new", newRecipe)
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

  console.log("user create recipe component render:");

  return (
    <>
      <form>
        <div>Recipe Name:</div>
        <div>
          <input type="text" onChange={handleInput} name="name"></input>
        </div>
        <div>Ingredients:</div>
        <textarea onChange={handleInput} name="ingredients" />
        <div>Steps:</div>
        <textarea onChange={handleInput} name="steps" />
        {/* Image file component */}
        <div>
          <input id="upload-btn" type="file" hidden onChange={handleUpload} />
          <ToastContainer />
          <label htmlFor="upload-btn" className="btn btn-warning">
            Upload
          </label>
          <div className="text-danger">{error && `${error}`}</div>
          <div className="text-danger">{uploadError && `${uploadError}`}</div>
        </div>
        <div>
          {/* Image file component end */}
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
          <div>
            {imageUrl?.length > 0 &&
              imageUrl.map((iurl) => (
                <img src={iurl} alt="uploaded image" key={iurl} />
              ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default UserCreateRecipe;
