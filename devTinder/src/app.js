const express = require("express");

const app = express();
const port = 3000;

// This route will cause the client to wait indefinitely for a response, which will eventually lead to a timeout error on the client side
app.get("/user", (req, res) => {
  console.log("Get methd for /user route is called");
  console.log(
    "But we are not sending any response to the client, the client will wait for the response until it times out",
  );
  // we are not sending any response to the client, so caller will wait for the response until it times out
  // uncomment the below line, the caller get response and will not wait for the response until it times out
  // res.send("This is the response from the server for /user route");
});

// PLAY WITH THESE BELOW MULTIPLE HANDLER EXAMPLES TO UNDERSTAND HOW THEY WORK
// HOW next() works in multiple handler and how the order of handlers matter when we have multiple handlers for the same route
// When express throw this Error [ERR_HTTP_HEADERS_SENT], the function terminates immediately and no further code is executed,

// Multiple handler in the same route definition
app.get(
  "/student",
  (req, res, next) => {
    console.log("First Handler");
    res.send("First response for /student route");
    next();
  },
  (req, res, next) => {
    console.log("Second handler");
    // res.send("Second response for /student route");
    // next()
  },
);

// Multiple handler in different route definition
app.get("/teacher", (req, res, next) => {
  console.log("Fisrt hanlder for /teaher route");
  next();
});

app.get("/teacher", (req, res, next) => {
  console.log("Second handler for /teacher route");
  res.send("Second response for /teacher route");
});

//Multiple handler using app.use() and app.get() for the same route
app.use("/employee", (req, res, next) => {
  console.log("First handler for /employee route");
  res.send("First response for /employee route");
  next();
});

app.get("/employee", (req, res, next) => {
  console.log("Second handler for /employee route");
  res.send("Second response for /employee route");
  next();
});

app.get("/employee", (req, res, next) => {
  console.log("Third handler for /employee route");
  res.send("Third response for /employee route");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
