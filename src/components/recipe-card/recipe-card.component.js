import RECIPE from "../../assets/recipe.json";

const RecipeCard = () => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={RECIPE.Recipe[0].imageUrl}
        width="300"
        height="auto"
        alt={RECIPE.Recipe.id}
      />

      <div className="card-body">
        <h4 className="card-title">{RECIPE.Recipe[0].Name}</h4>
        <p className="card-text">{RECIPE.Recipe[0].Ingredients}</p>
        <p className="card-text">{RECIPE.Recipe[0].Steps}</p>
        <p className="card-text">.....</p>
        <button className="btn btn-warning" type="button">
          Read More
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
