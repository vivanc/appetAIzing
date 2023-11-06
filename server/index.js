const express = require("express");
const app = express();
const db = require("./db");
const multer = require("multer");
const { uploadToS3 } = require("./s3");

//middleware
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// store imgages to memory (buffer) before storing it to s3
const storage = multer.memoryStorage();
const upload = multer({ storage });

// s3 - post/upload image
app.post("/api/image", upload.single("image"), (req, res) => {
  const { file } = req;
  const userID = "123";

  if (!file) return res.status(400).json("BAD");

  const { error, key } = uploadToS3({ file, userID });
  if (error) return res.status(500).json("failed uploading to S3");

  return res.status(201).json({ key });
});

// test api
app.post("/api/user", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(400).send("Data is missing");
  }

  try {
    const user = await db("users").insert({ name, email, password });
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/recipe/new", async (req, res) => {
  let { name, ingredients, steps, image_url } = req.body;

  if (!name || !ingredients || !steps || !image_url) {
    return res.status(400).send("Data is missing");
  }

  ingredients = ingredients.split(/\r?\n/);
  steps = steps.split(/\r?\n/);

  try {
    const recipe = await db("recipes").insert({
      name,
      ingredients,
      steps,
      image_url,
    });
    ingredients = ingredients.split(/\r?\n/);
    steps = steps.split(/\r?\n/);
    res.status(201).send(recipe);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding recipe", error: err.message });
  }
});

app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await db.select("*").from("recipes");

    if (recipes) {
      // res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json(recipes);
    } else {
      res.status(404).json("Recipes Not Found");
    }
  } catch (err) {
    // res.set("Access-Control-Allow-Origin", "*");
    console.log(err);
    res
      .status(500)
      .json({ message: "Error getting all recipes", error: err.message });
  }
});

app.get("/api/recipe/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await db("recipes").where({ id });

    if (recipe) {
      // res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (err) {
    // res.set("Access-Control-Allow-Origin", "*");
    res
      .status(500)
      .json({ message: "Error getting recipe", error: err.message });
  }
});

app.put("/api/recipe/:id", async (req, res) => {
  const { id } = req.params;

  const { name, ingredients, steps, image_url } = req.body;

  try {
    const recipe = await db("recipes")
      .where({ id })
      .update({ name, ingredients, steps, image_url }, [
        "id",
        "name",
        "ingredients",
        "steps",
        "image_url",
      ]);

    if (recipe) {
      res.status(200).json({ update: recipe });
    } else {
      res.status(404).json({ message: "Recipe Not Found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating recipe", error: err.message });
  }
});

app.delete("/api/recipe/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundRecipe = await db("recipes").where({ id }).del();

    if (foundRecipe) {
      res.status(204).json({ message: "Recipe has been deleted" });
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe", error: err });
  }
});

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
