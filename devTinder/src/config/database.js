const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_CONNECTION);
};

module.exports = connectDB;

// Due to update in node version the connect string is changed to above one.
// The older connection string is "mongodb+srv://NamasteNode:<enter password>@namastenode.v5xnedh.mongodb.net/devTinder"
