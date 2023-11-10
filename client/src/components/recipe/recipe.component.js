import RecipeCard from "../recipe-card/recipe-card.component";
import SearchBar from "../search-bar/search-bar.component";
import { useState, useEffect, useContext } from "react";
import { RecipesContext } from "../../contexts/recipe.context";
import axios from "axios";

const Recipe = () => {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [searchField, setSearchField] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = (e) => {
    setSearchField(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchRecipes = () => {
      axios.get("http://localhost:5001/api/recipes").then((response) => {
        const returnedRecipes = response.data;
        setRecipes(returnedRecipes);
      });
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const newFilteredRecipes = recipes.filter((oneRecipe) => {
      return oneRecipe.name.toLowerCase().includes(searchField);
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
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
      </div>
    </>
  );
};

export default Recipe;
