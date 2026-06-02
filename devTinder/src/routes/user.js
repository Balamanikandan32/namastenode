const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const ConnectionRequestModel = require("../model/connectionRequest");
const User = require("../model/user");

const userRouter = express.Router();

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "skills"];

userRouter.get("/user/connectionRequests", authMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      status: "interested",
      toUserId: loggedInUser._id,
    }).populate("fromUserId", USER_SAFE_DATA);

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
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

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

userRouter.get("/user/feed", authMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // PAGINATION
    const pageNumber = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    // LIMIT THE NUMBER OF DOCUEMENT
    limit = limit > 50 ? 50 : limit;

    const skip = (pageNumber - 1) * limit;

    // LoggedInuser can see all the users Except
    // 1) Their own card(card means profile)
    // 2) Their connections
    // 3) Ignored People
    // 4) Already send connection request
    // To simplify the loggedInUser feed does not include their own card and already seen user(who marked as ignored or interested or accepted or rejected)

    // Get all the connection Request(ignored, interested, accepted, rejected) of loggedInUser
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    // These are the user who are hidden from loggedInUser feed.
    const hiddenUserFromFeed = new Set();
    connectionRequest.map((request) =>
      hiddenUserFromFeed
        .add(request.fromUserId.toString())
        .add(request.toUserId.toString()),
    );

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

userRouter.get("/user/premiumStatus", authMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;
    return res.send({
      isPremium: loggedInUser.isPremium,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

module.exports = userRouter;

// PAGINATION

//    /user/feed?page=1&limit=10   skip(0)  limit(10)
//    /user/feed?page=2&limit=10   skip(10) limit(10)
//    /user/feed?page=3&limit=10   skip(20) limit(10)

// skip = (page -1) * limit
