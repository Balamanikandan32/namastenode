const express = require("express");

const authMiddleware = require("../middleware/auth-middleware");

const requestRouter = express.Router();

requestRouter.post("/sendconnectionrequest", authMiddleware, (req, res) => {
  const userName = req.user?.firstName;
  res.send(`${userName} send the connect request`);
});

module.exports = requestRouter;
