const UserCreateRecipe = () => {
    <>
    <h1>Create a Recipe From Scratch</h1>
    <label>
        Recipe Name:
        <textarea name="recipeName" rows={1} col={80}></textarea>
        
    </label>
    <label>
        Ingredients
        <textarea name="ingredients" rows={8} col={80}></textarea>
        
    </label>
    <label>
        Steps
        <textarea name="steps" rows={8} col={80}></textarea>
        
    </label>
    <label>
        Upload Picture
        <input type="file" name="recipeImage"></input>
        
    </label>
    <button type="submit">Submit Recipe</button>

    </>
}

export default UserCreateRecipe;