import RecipeCard from "../recipe-card/recipe-card.component";
import { useState, useEffect, useContext } from "react";
import { RecipesContext } from "../../contexts/recipe.context";
import axios from "axios";

const Recipe = () => {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [initialRecipes, setInitialRecipes] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5001/api/recipes").then((response) => {
      const returnedRecipes = response.data;
      setInitialRecipes(returnedRecipes);
      console.log("recipe component render inside useEffect");
    });
  }, []);

  const filterRecipes = (value) => {
    axios.get("http://localhost:5001/api/recipes").then((response) => {
      const returnedRecipes = response.data;
      const results = returnedRecipes.filter((r) => {
        return r.name && r.name.toLowerCase().includes(value);
      });
      setRecipes(results);
    });
  };

  const handleSearch = (value) => {
    setInput(value);
    filterRecipes(value);
  };

  console.log("recipe component render");

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <input
          className="form-control rounded"
          type="search"
          placeholder="search recipe.."
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="row row-cols-1 row-cols-md-4 justify-content-center">
        {input.length === 0
          ? initialRecipes.map((recipe) => {
              return <RecipeCard recipe={recipe} key={recipe.id} />;
            })
          : recipes.map((recipe) => {
              return <RecipeCard recipe={recipe} key={recipe.id} />;
            })}
      </div>
    </>
  );
};

export default Recipe;
