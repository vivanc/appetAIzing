require("dotenv").config({ path: `.env.development` });
const express = require("express");
const app = express();
const db = require("./db");
const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// middleware
app.use(express.json());

// setup s3 object
const s3 = new S3Client({ region: process.env.AWS_REGION });

// sotre image in memory buffer before loading it to s3
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// needed header to address CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/api/recipe/new", upload.single("image"), async (req, res) => {
  debugger;
  console.log("req.body", req.body);
  console.log("req.file", req.file); // image file is not printed out from req.file or req.body??

  // upload image to s3
  const image_name_from_s3 = `${uuidv4()}` + req.file.originalname;
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: image_name_from_s3,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  // save recipe text object to postgres
  let { user_id, name, ingredients, steps, image_url, image_name } = req.body;

  if (
    !user_id ||
    !name ||
    !ingredients ||
    !steps ||
    !image_url ||
    !image_name
  ) {
    return res.status(400).send("Data is missing");
  }

  ingredients = ingredients.split(/\r?\n/);
  steps = steps.split(/\r?\n/);

  try {
    //there might be a situation that inserts multiple rows
    const new_image_name = image_name_from_s3;

    const recipes = await db("recipes")
      .insert({
        user_id: user_id,
        name: name,
        ingredients: ingredients,
        steps: steps,
        image_url: image_url,
        image_name: new_image_name,
      })
      .returning("*");
    res.status(201).json(recipes[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding recipe", error: err.message });
  }
});

app.get("/api/recipes", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const recipes = await db
      .select("*")
      .from("recipes")
      .where("user_id", user_id);

    for (const recipe of recipes) {
      const getObjectParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: recipe.image_name,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiredIn: 3600 });
      recipe.image_url = url;
    }

    if (recipes) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json("Recipes Not Found");
    }
  } catch (err) {
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
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (err) {
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
