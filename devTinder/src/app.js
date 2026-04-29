const express = require("express");

const app = express();
const port = 3000;

// Route handlers are executed in the order they are defined.
// If multiple handlers match the same path and method,
// the first one to send a response terminates the request-response cycle,causing subsequent matches to be ignored.

// If you gto doubt about app.use or app.all, check once the documentataion(or definition).
// Then play with this code and seee the output

// app.use("/user", (req, res, next) => {
//   console.log("Global middleware executed for every request to /user");
//   res.send("Middleware funtion");
// });

app.get("/", (req, res) => {
  res.send("Home path response");
});

// app.all("/user", (req, res) => {
//   res.send("All method response for user endpoint");
// });

app.get("/user", (req, res) => {
  res.send("User path response");
});

app.get("/user", (req, res) => {
  res.send(
    "user path response is duplicated and this response will be ignored",
  );
});

app.post("/user", (req, res) => {
  console.log("post response for user endpoint");
  res.send("post response for user endpoint");
});

app.put("/user", (req, res) => {
  console.log("Put response for user endpoint");
  res.send("Put response for user endpoint");
});

app.patch("/user", (req, res) => {
  console.log("Patch response for user endpoint");
  res.send("Patch response for user endpoint");
});

app.delete("/user", (req, res) => {
  console.log("Delete response for user endpoint");
  res.send("Delete response for user endpoint");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
