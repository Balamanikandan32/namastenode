const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Home path response");
});

app.get("/user", (req, res) => {
  res.send("User path response");
});

// Route handlers are executed in the order they are defined.
// If multiple handlers match the same path and method,
// the first one to send a response terminates the request-response cycle,causing subsequent matches to be ignored.
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
