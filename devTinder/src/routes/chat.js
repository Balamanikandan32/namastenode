const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const ChatModel = require("../model/chat");

const chatRouter = express.Router();

chatRouter.post("/chat/getMessages", authMiddleware, async (req, res) => {
  const { participantsId } = req.body;

  const fromUserId = req.user._id;

  const messages = await ChatModel.findOne({
    participants: { $all: [...participantsId, fromUserId] },
  }).populate({ path: "message.senderId", select: "firstName _id" });

  return res.json(messages ?? []);
});

module.exports = chatRouter;
