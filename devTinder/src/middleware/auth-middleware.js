const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    // const tokenInHeader = req.get('authorization')

    if (!token) {
      return res.status(401).send("Invalid token please login");
    }

    const tokenHiddenData = await jwt.verify(token, "DEVTINDER");

    const userData = await User.findById(tokenHiddenData._id);

    if (userData) {
      req.user = userData;
      req.userId = tokenHiddenData._id;
      next();
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = authMiddleware;
