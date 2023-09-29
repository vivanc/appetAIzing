import AICreateRecipe from "./ai-create-recipe.component";
import UserCreateRecipe from "./user-create-recipe.coponent";

const CreateRecipe = () => {
    console.log("create recipe page is rendering");
    return (
        <>
    <AICreateRecipe />
    <h5>OR</h5>
    <UserCreateRecipe />
    </>
    )
    
}

export default CreateRecipe;