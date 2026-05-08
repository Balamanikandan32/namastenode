const express = require("express");

const bcrypt = require("bcrypt");

const authMiddleware = require("../middleware/auth-middleware");
const {
  profileEditValidation,
  profileEditPasswordValidation,
} = require("../validation/validation");

const profileRouter = express.Router();

// get profile api
profileRouter.get("/profile/view", authMiddleware, (req, res) => {
  res.send(req.user);
});

profileRouter.patch(
  "/profile/edit",
  authMiddleware,
  profileEditValidation,
  async (req, res) => {
    const logggedInUser = req.user;

    Object.entries(req.body).map(
      ([field, value]) => (logggedInUser[field] = value),
    );

    try {
      await logggedInUser.save();
      res.send(logggedInUser);
    } catch (err) {
      res.send("Error" + err.message);
    }
  },
);

profileRouter.patch(
  "/profile/edit/password",
  authMiddleware,
  profileEditPasswordValidation,
  async (req, res) => {
    const userData = req.user;

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      userData["password"] = hashedPassword;
      await userData.save();
      res.send({ message: "Password reset sucesffully" });
    } catch (err) {
      res.send("Error" + err.message);
    }
    userData["password"];
  },
);

module.exports = profileRouter;
