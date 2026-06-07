const { Server } = require("socket.io");

const crypto = require("crypto");

const ChatModel = require("../model/chat");

const getRoomId = (fromUserId, toUserId) => {
  // Generate a unique room ID based on user IDs (e.g., sorted and concatenated).
  // Room ID should be the same for both users to join the same room and communicate.
  // Room Id should be unique and good to hash to avoid exposing the room ID to the client.

  const text = [fromUserId, toUserId].sort().join("-");

  const roomId = crypto
    .createHash("sha256") // Set the algorithm
    .update(text) // Pass the input data
    .digest("hex");

  return roomId;
};

const initlaizeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173", // Replace with your frontend URL
    },
  });

  io.on("connection", (socket) => {
    // handling event

    socket.on("joinChat", ({ fromUserId, toUserId }) => {
      const roomId = getRoomId(fromUserId, toUserId);
      // console.log(`Room ID: ${roomId}`);

      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ fromUserId, toUserId, message }) => {
      const roomId = getRoomId(fromUserId, toUserId);

      // save message on the database.
      let chatMessage = await ChatModel.findOne({
        participants: { $all: [fromUserId, toUserId] },
      });

      if (!chatMessage) {
        chatMessage = new ChatModel({
          participants: [fromUserId, toUserId],
          message: [],
        });
      }

      chatMessage.message.push({ senderId: fromUserId, text: message });
      const data = await chatMessage.save();

      const populatedData = await data.populate({
        path: "message.senderId",
        select: "firstName _id",
      });

      io.to(roomId).emit("messageReceived", {
        populatedData,
      });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initlaizeSocket;
