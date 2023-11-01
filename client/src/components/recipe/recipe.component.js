import RecipeCard from "../recipe-card/recipe-card.component";
import SearchBar from "../search-bar/search-bar.component";

const Recipe = (props) => {
  const { recipes } = props;

  return (
    <>
      <div className="d-flex justify-content-center">
        <SearchBar />
      </div>
      {recipes.map((recipe) => {
        return <RecipeCard recipe={recipe} />;
      })}
    </>
  );
};

export default Recipe;
