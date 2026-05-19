const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://NamasteNode:Bbx9NoOTJtcMUbbl@ac-aztmiy2-shard-00-00.v5xnedh.mongodb.net:27017,ac-aztmiy2-shard-00-01.v5xnedh.mongodb.net:27017,ac-aztmiy2-shard-00-02.v5xnedh.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-4hwp2d-shard-0&authSource=admin&appName=NamasteNode",
  );
};

module.exports = connectDB;

// Due to update in node version the connect string is changed to above one.
// The older connection string is "mongodb+srv://NamasteNode:Bbx9NoOTJtcMUbbl@namastenode.v5xnedh.mongodb.net/devTinder"
