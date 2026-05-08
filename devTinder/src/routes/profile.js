const express = require("express");

const authMiddleware = require("../middleware/auth-middleware");

const profileRouter = express.Router();

// get profile api
profileRouter.get("/profile", authMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = profileRouter;
