const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    // const tokenInHeader = req.get('authorization')

    if (!token) {
      throw new Error("Invalid token please login");
    }

    const tokenHiddenData = await jwt.verify(token, "DEVTINDER");

    const userData = await User.findById(tokenHiddenData._id);

    if (userData) {
      req.user = userData;
      req.userId = tokenHiddenData._id;
      next();
    } else {
      throw new Error("invalid token please login");
    }
  } catch (err) {
    res.send("Error " + err.message);
  }
};

module.exports = authMiddleware;
