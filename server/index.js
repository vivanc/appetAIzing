const express = require("express");
const app = express();
const db = require("./db");
const pg = require('pg');

//middleware
app.use(express.json());

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

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
