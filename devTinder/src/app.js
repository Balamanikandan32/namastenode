const express = require("express");
const { studentMiddleware } = require("./middleware.js/sample-middleware");

const connectDB = require("./config/database");

const User = require("./model/user");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// create a new user
app.post("/signup", async (req, res) => {
  // Creating a new instance of User model
  const newUser = new User(req.body);
  // Either use try -catch or use error handling middleware to handle errors
  try {
    await newUser.save();
    res.send("User saved successfully");
  } catch (err) {
    console.log("Error saving user:", err);
    res.status(500).send("Error saving user");
  }
});

// get user details by email id
app.get("/user/:email", async (req, res) => {
  const emailId = req.params.email;
  try {
    const user = await User.find({ email: emailId });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//get user details by id
app.get("/user/id/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//get all the users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.json(users);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
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
