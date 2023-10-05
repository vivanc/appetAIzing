import RECIPE from "../../assets/recipe.json";

const ViewRecipe = () => {
  return (
    <div className="card mb-3">
      <img
        className="card-img-top"
        src={RECIPE.Recipe[1].imageUrl}
        alt="Card image cap"
      />
      <div className="d-inline-flex justify-content-end">
        <button className="btn btn-light" type="button">
          Edit Recipe
        </button>
        <button className="btn btn-light" type="button">
          Save Recipe
        </button>
      </div>

      <div className="card-body">
        <h3 className="card-title">{RECIPE.Recipe[0].Name}</h3>
        <br />
        <h5 className="card-title">Ingredients: </h5>
        <p className="card-text">{RECIPE.Recipe[1].Ingredients}</p>
        <br />
        <h5 className="card-title">Steps: </h5>
        <p className="card-text">{RECIPE.Recipe[1].Steps}</p>
      </div>
    </div>
  );
};
export default ViewRecipe;
