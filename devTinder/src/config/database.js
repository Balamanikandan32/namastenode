const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamasteNode:Bbx9NoOTJtcMUbbl@namastenode.v5xnedh.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
