const express = require("express");
const { studentMiddleware } = require("./middleware.js/sample-middleware");

const app = express();
const port = 3000;

//In express version 5, express will automatically catch error and pass it to error handling middleware,
// so we don't need to use try-catch block in sync and async route handlers.

//In express version 4 exxpress will automatically catch error only for synchronous route.
// For asynchronous route we need to use try-catch block or try and catch, in catch block then pass the error to next() function,

// Synchronous Route Error
app.get("/students", (req, res) => {
  throw new Error("sync error in students route");
});

// Asynchronous Route Error
app.get("/employee", async (req, res, next) => {
  throw new Error("Async error in employee route");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).send(`Something went wrong! ${err.message}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
