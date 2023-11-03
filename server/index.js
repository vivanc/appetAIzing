const express = require("express");
const app = express();
const db = require("./db");
const pg = require('pg');

//middleware
app.use(express.json());

//needed header to address CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

// test api
app.post("/api/user", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(400).send("Data is missing");
  }

  try {
    const user = await db('users').insert({name, email, password});
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/recipe/new", async (req, res) => {

  let { name, ingredients, steps, image_url } = req.body;
  
  if (!name || !ingredients || !steps || !image_url) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(400).send("Data is missing");
  }

  ingredients = ingredients.split(/\r?\n/)
  steps = steps.split(/\r?\n/)

  try {
    res.set('Access-Control-Allow-Origin', '*');
    const recipe = await db('recipes').insert({name, ingredients, steps, image_url});
    res.status(201).send(recipe);
  } catch (err) {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(500).json({ message: "Error adding recipe", error: err.message });
  }

});

app.get("/api/recipes", async(req, res) => {
  try {
    const recipes = await db.select("*").from("recipes");

    if (recipes) {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json(recipes)
    } else {
      res.status(404).json("Recipes Not Found")
    }
  } catch(err) {
    res.set('Access-Control-Allow-Origin', '*');
    console.log(err)
    res.status(500).json({message: "Error getting all recipes", error:err.message})
  }
})

app.get("/api/recipe/:id", async(req, res) => {
  
  const { id } = req.params;

  try {
    const recipe = await db('recipes').where({ id });

    if (recipe) {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json(recipe)
    } else {
      res.status(404).json({ error: "Recipe not found"})
    }
  } catch (err) {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(500).json({ message: "Error getting recipe", error: err.message})
  }
})

app.put("/api/recipe/:id", async(req, res) => {
  const { id } = req.params;

  const { name, ingredients, steps, image_url } = req.body;

  try {
    const recipe = await db('recipes')
    .where({ id })
    .update({name, ingredients, steps, image_url}, ["id", "name", "ingredients", "steps", "image_url"]);

    if (recipe) {
      res.status(200).json({update: recipe})
    } else {
      res.status(404).json({message: "Recipe Not Found"})
    }
  } catch (err) {
    res.status(500).json({message: "Error updating recipe", error: err.message})
  }
})

app.delete("/api/recipe/:id", async(req, res) => {

  const { id } = req.params;

  try {
    const foundRecipe = await db('recipes').where({ id }).del()

    if (foundRecipe) {
      res.status(204).json({message: "Recipe has been deleted"})
    } else {
      res.status(404).json({error: "Recipe not found"})
    }

  } catch(err) {
    res.status(500).json({message: "Error deleting recipe", error: err})
  }

})


app.listen(5001, () => {
  console.log("server is running on port 5001");
});
