const express = require("express");

const authMiddleware = require("../middleware/auth-middleware");
const ConnectionRequestModel = require("../model/connectionRequest");
const User = require("../model/user");

const requestRouter = express.Router();

// Connection Request send API
requestRouter.post(
  "/request/send/:status/:toUserId",
  authMiddleware,
  async (req, res) => {
    try {
      const { status, toUserId } = req.params;
      const fromUserId = req.user._id;

      const acceptedStatus = ["ignored", "interested"];

      if (!acceptedStatus.includes(status)) {
        throw new Error("status params error");
      }

      // logical querying
      const isConnetionExists = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isConnetionExists) {
        throw new Error(
          `${status} connection already exist between these two users`,
        );
      }

      const istoUserIdValid = await User.findById(toUserId);
      if (!istoUserIdValid) {
        throw new Error("Invalid TO USER");
      }

      // Check whether fromuserId and toUserId is same
      // we can done this check here with simple equal to operator but we use mongoose middlware(pre)
      // to understand the cocnept of how monggose middleware pre works(check schema file)

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const result = await connectionRequest.save();
      res.send({ message: "Conection request sucessfull", data: result });
    } catch (err) {
      res.status(400).send("Error :" + err);
    }
  },
);

// Connection Request review API
requestRouter.post(
  "/request/review/:status/:requestedId",
  authMiddleware,
  async (req, res) => {
    try {
      const { status, requestedId } = req.params;
      const loggedInUser = req.user;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Status is invalid");
      }

      // whether requestedId is valid,loggedInuser is valid, loggedinuser and requestedId made connection
      // we check all above this condition in this step
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestedId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(400).send("Connection Request is not found");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.send(
        { message: `${loggedInUser.firstName} ${status} the connection` },
        data,
      );
    } catch (err) {
      res.status(500).send("ERROR: " + err.message);
    }
  },
);

module.exports = requestRouter;
