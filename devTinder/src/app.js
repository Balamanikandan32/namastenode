const express = require("express");
const { studentMiddleware } = require("./middleware.js/sample-middleware");

const connectDB = require("./config/database");

const User = require("./model/user");

const app = express();
const port = 3000;

app.post("/signup", async (req, res) => {
  // Creating a new instance of User model
  const newUser = new User({
    firstName: "Bala",
    lastName: "manikandan",
    age: 24,
    email: "balabala@gamil.com",
    password: "password",
  });

  try {
    await newUser.save();
    res.send("User saved successfully");
  } catch (err) {
    console.log("Error saving user:", err);
    res.status(500).send("Erro saving user");
  }
});

connectDB()
  .then(() => {
    console.log("Connected to the database successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
