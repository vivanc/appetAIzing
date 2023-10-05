const UserCreateRecipe = () => {
  return (
    <>
      <form>
        <h4>Create a Recipe From Scratch</h4>
        <div className="form-group">
          <div>
            <label>Recipe Name:</label>
          </div>
          <div>
            <textarea name="steps" rows={1} cols={50}></textarea>
          </div>
          <div>
            <label>Ingredients</label>
          </div>
          <div>
            <textarea name="ingredients" rows={8} cols={120}></textarea>
          </div>
          <div>
            <label>Steps</label>
          </div>
          <div>
            <textarea name="steps" rows={8} cols={120}></textarea>
          </div>
          <div></div>
          <div>
            <label>Upload Picture</label>
          </div>
          <div>
            <input type="file" name="recipeImage"></input>
          </div>
          <button type="submit">Submit Recipe</button>
        </div>
      </form>
    </>
  );
};

export default UserCreateRecipe;
