const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const ConnectionRequestModel = require("../model/connectionRequest");

const userRouter = express.Router();

const POPULATE_DATA = ["firstName", "lastName", "photoUrl", "skills"];

userRouter.get("/user/connectionRequests", authMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      status: "interested",
      toUserId: loggedInUser._id,
    }).populate("fromUserId", POPULATE_DATA);

    res.send({
      message: "Pending connection request",
      data: connectionRequest,
    });
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", authMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", POPULATE_DATA)
      .populate("toUserId", POPULATE_DATA);

    const data = connections.map((item) => {
      if (loggedInUser._id.toString() === item.fromUserId._id.toString()) {
        return item.toUserId;
      }
      return item.fromUserId;
    });

    res.send({ data });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = userRouter;
