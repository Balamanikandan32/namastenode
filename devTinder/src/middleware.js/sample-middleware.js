const studentMiddleware = (req, res, next) => {
  // const token = req.body?.token;
  const token = "abc";
  const isUserAuthenticated = token === "abc";
  if (!isUserAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};

module.exports = { studentMiddleware };
