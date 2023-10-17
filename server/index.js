const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db").pool;

//middleware
app.use(cors());
app.use(express.json());

// test api
app.post("/api/user", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(400).send("Data is missing");
  }

  try {
    // try to send data to the database
    const stmt = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
    const values = [name, email, password];

    const result = await pool.query(stmt, values);
    console.log(result);
    res.status(201).send({ message: "New user created", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("some error has occured");
  }
});

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
