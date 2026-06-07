require("./config/load-env");

const express = require("express");

const { createServer } = require("http");

const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");

const authRouter = require("./routes/auth");

const profileRouter = require("./routes/profile");

const requestRouter = require("./routes/request");

const userRouter = require("./routes/user");

const paymentRouter = require("./routes/payment");

const chatRouter = require("./routes/chat");

const cors = require("cors");
const initlaizeSocket = require("./config/socket-io");

require("./cron-jobs/node-cron-job");

const app = express();
const port = process.env.PORT_NUMBER;

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to get cookies data in request header
app.use(cookieParser());

app.use(
  authRouter,
  profileRouter,
  requestRouter,
  userRouter,
  paymentRouter,
  chatRouter,
);

const httpServer = createServer(app);

initlaizeSocket(httpServer);

connectDB()
  .then(() => {
    console.log("Connected to the database successfully");
    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
