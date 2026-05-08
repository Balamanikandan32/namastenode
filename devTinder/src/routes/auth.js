const express = require("express");

const bcrypt = require("bcrypt");

const User = require("../model/user");

const { signUpValidation } = require("../validation/validation");

const authRouter = express.Router();

// create a new user
authRouter.post("/signup", signUpValidation, async (req, res) => {
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

// login api
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("Invalid email");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //created jwt token
      const jwtToken = await user.getJWT();

      // send token as response.body
      const responseBody = {
        message: "Login successful",
        token: jwtToken,
      };

      // send token as cookie
      res.cookie("token", jwtToken);

      res.send(responseBody);
    } else {
      res.status(401).send("Password is incorrect");
    }
  } catch (err) {
    res.status(500).send(`Something went wrong : ${err}`);
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send({ messsage: "Logout successfully", token: "" });
});

module.exports = authRouter;
