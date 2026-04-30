const express = require("express");
const { studentMiddleware } = require("./middleware.js/sample-middleware");

const app = express();
const port = 3000;

// Middleware

app.get("/admin/getAllData", (req, res) => {
  console.log("All data is sent");

  // const token = req.body?.token;
  const token = "abc";
  const isUserAuthenticated = token === "abc";

  if (!isUserAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    res.send("All data is sent");
  }
});

app.delete("/admin/delete", (req, res) => {
  console.log("Data is deleted");

  // const token = req.body?.token;
  const token = "abc";
  const isUserAuthenticated = token === "abc";

  if (!isUserAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    res.send("Data is deleted");
  }
});

//Instead of checking the token in each route, we can create a middleware function to handle authentication for all student routes.
app.use("/student/data", studentMiddleware);

app.get("/student/data/getData", (req, res) => {
  console.log("Student data is sent");
  res.send("Student data is sent");
});

app.delete("/student/data/delete", (req, res) => {
  console.log("Student data is deleted");
  res.send("Student data is deleted");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
