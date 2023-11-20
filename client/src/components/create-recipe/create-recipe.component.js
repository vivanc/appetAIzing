import { useState } from "react";
import AICreateRecipe from "./ai-create-recipe.component";
import UserCreateRecipe from "./user-create-recipe.coponent";
import { useEffect } from "react";

const CreateRecipe = () => {
  // console.log("create recipe page is rendering");

  const [aiRecipe, setAIRecipe] = useState()

  // useEffect(()=> {

  // }, [aiRecipe])

  return (
    <>
      <AICreateRecipe setAIRecipe={setAIRecipe}/>
      <h5>OR</h5>
      <UserCreateRecipe aiRecipeData={aiRecipe}/>
    </>
  );
};

export default CreateRecipe;
