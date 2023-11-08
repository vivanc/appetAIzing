import RecipeCard from "../recipe-card/recipe-card.component";
import SearchBar from "../search-bar/search-bar.component";

const Recipe = (props) => {
  const { recipes } = props;

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <SearchBar />
      </div>
      <div className="row row-cols-1 row-cols-md-4 justify-content-center">
        {recipes.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
      </div>
    </>
  );
};

export default Recipe;
