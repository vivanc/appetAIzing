import RecipeCard from "../recipe-card/recipe-card.component";
import SearchBar from "../search-bar/search-bar.component";
import { useState, useEffect } from "react";

const Recipe = ({ recipes }) => {
  const [searchField, setSearchField] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = (e) => {
    setSearchField(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const newFilteredRecipes = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchField);
    });
    setFilteredRecipes(newFilteredRecipes);
  }, [recipes, searchField]);

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <SearchBar onChagneHandler={handleSearch} />
      </div>
      <div className="row row-cols-1 row-cols-md-4 justify-content-center">
        {recipes.map((recipe) => {
          return <RecipeCard recipe={filteredRecipes} />;
        })}
      </div>
    </>
  );
};

export default Recipe;
