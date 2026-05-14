const express = require("express");

const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");

const authRouter = require("./routes/auth");

const profileRouter = require("./routes/profile");

const requestRouter = require("./routes/request");

const userRouter = require("./routes/user");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to get cookies data in request header
app.use(cookieParser());

app.use(authRouter, profileRouter, requestRouter, userRouter);

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
