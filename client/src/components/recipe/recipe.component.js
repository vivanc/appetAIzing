import RecipeCard from "../recipe-card/recipe-card.component";
import SearchBar from "../search-bar/search-bar.component";

const Recipe = (props) => {
  const { recipes } = props;

  return (
    <>
      <div className="d-flex justify-content-center">
        <SearchBar />
      </div>
      <div className="d-flex flex-row">
        {recipes.map((recipe) => {
          return <RecipeCard recipe={recipe} />;
        })}
      </div>

    </>
  );
};

export default Recipe;
