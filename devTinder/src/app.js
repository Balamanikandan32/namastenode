const express = require("express");
const bcrypt = require("bcrypt");

const { studentMiddleware } = require("./middleware.js/sample-middleware");

const connectDB = require("./config/database");

const User = require("./model/user");

const { signUpValidation } = require("./validation/validation");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// create a new user
app.post("/signup", signUpValidation, async (req, res) => {
  // Creating a new instance of User model
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving to the database

  const db_userData = { firstName, lastName, email, password: hashedPassword };

  const newUser = new User(db_userData);
  // Either use try -catch or use error handling middleware to handle errors
  try {
    await newUser.save();
    res.send("User saved successfully");
  } catch (err) {
    console.log("Error saving user:", err);
    res.status(500).send(`Something went wrong : ${err}`);
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
    res.status(500).send(`Something went wrong : ${err}`);
  }
});

//get user details by id
app.get("/user/id/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    res.status(500).send(`Something went wrong : ${err}`);
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
    res.status(500).send(`Something went wrong : ${err}`);
  }
});

// delete user by id
app.delete("/user/id/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.send("User deleted succesfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send(`Something went wrong : ${err}`);
  }
});

//update a user details using patch method
app.patch("/user/id/:id", async (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(`Something went wrong : ${err}`);
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
