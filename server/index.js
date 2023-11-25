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
const { OpenAI } = require("openai")

// middleware
app.use(express.json());

const anyscale = new OpenAI({
  baseURL: process.env.OPENAI_API_BASE,
  apiKey: process.env.OPENAI_API_KEY,
})

// setup s3 object
const s3 = new S3Client({ region: process.env.AWS_REGION });

// sotre image in memory buffer before loading it to s3
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// needed header to address CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
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
      if (recipe.image_name) {
        const getObjectParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: recipe.image_name,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiredIn: 3600 });
        recipe.image_url = url;
      }

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
  const user_id = req.query.user_id;
  console.log('user id', user_id)

  try {
    const recipe = await db("recipes").where({ id });
    
    console.log("this is selected id recipe: ");
    console.log(typeof user_id, typeof recipe[0].user_id, user_id, recipe[0].user_id);
    if (recipe[0] && recipe[0].user_id == user_id) {
      const getObjectParams2 = {
        Bucket: process.env.AWS_BUCKET,
        Key: recipe[0].image_name,
      };

      const command = new GetObjectCommand(getObjectParams2);
      const url = await getSignedUrl(s3, command, { expiredIn: 3600 });
      recipe[0].image_url = url;

      // check url
      console.log("this is url: ");
      console.log(url);


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

app.post('/api/summerize_url', async (req, res) => {
  if (true) {
    const url = req.body.url
    const prompt = `Summarize this url and break them into name, ingredients, and steps in JSON format: ${url}`
    anyscale.chat.completions.create({
      model: "meta-llama/Llama-2-7b-chat-hf",
      messages: [{ role: "user", content: prompt }],
      // temperature: 0.7
    })
      .then((completion) => {
        const aiReturnRecipeStr = completion.choices[0].message.content
        console.log(aiReturnRecipeStr)
        const matches = aiReturnRecipeStr.match(/\{([^}]+)\}/g)
        if (!matches || matches.length === 0) {
          res.status(500).send("AI does not return a valid json")
        } else {
          res.status(200).send(matches[0])
        }
      })
  } else {

    res.status(200).json({
      "name": "Best Ever Taco Meat",
      "ingredients": [
        "1 lb ground beef",
        "1/4 cup chopped onion",
        "1/4 cup chopped bell pepper",
        "1 jalapeno pepper",
        "2 cloves garlic",
        "1 tablespoon chili powder",
        "1 teaspoon cumin",
        "1/2 teaspoon paprika",
        "1/4 teaspoon cayenne pepper",
        "1 can (14.5 oz) diced tomatoes with green chilies",
        "1 cup beef broth",
        "1 tablespoon tomato paste"
      ],
      "steps": [
        "Heat oil in a large skillet over medium heat. Add the chopped onion and cook, stirring occasionally, until softened. About 5 minutes. ",
        "Add the ground beef to the skillet. Cook, breaking it up with a spoon, until browned, about 5 minutes. ",
        "Add the chopped bell pepper, jalapeno pepper, and garlic to the skillet. Cook, stirring occasionally, until the vegetables are softened, about 5 minutes. ",
        "Stir in the chili powder, cumin, paprika, and cayenne pepper. Cook, stirring constantly, for 1 minute. ",
        "Add the diced tomatoes with green chilies, beef broth, and tomato paste to the skillet. Stir to combine. Bring to a simmer. ",
        "Reduce heat to low and let simmer for 10 minutes. Taste and adjust seasoning as needed. ",
        "Serve the taco meat hot, garnished with chopped cilantro, while warm. Serve with tortillas, cheese, lettuce, and other toppings of your choice. Enjoy! "
      ]
    }
    )
  }
})

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
