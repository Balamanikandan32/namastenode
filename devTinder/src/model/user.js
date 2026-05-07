const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, lowercase: true, minLength: 2, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    photoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    skills: [{ type: String }],
    gender: {
      type: String,
      validate(value) {
        if (!["Male", "Female", "other"].includes(value)) {
          throw new Error("Invalid gender value");
        }
      },
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  //jwt token is expires in 7 days
  const jwtToken = await jwt.sign({ _id: this._id }, "DEVTINDER", {
    expiresIn: "7d",
  });

  return jwtToken;
};

userSchema.methods.validatePassword = async function (userEnterPassword) {
  const isPassowordValidate = await bcrypt.compare(
    userEnterPassword,
    this.password,
  );

  return isPassowordValidate;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
