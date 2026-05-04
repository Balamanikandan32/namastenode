const validator = require("validator");

const signUpValidation = (req, res, next) => {
  // here you can do api-level validation for the sign up api
  // either use libraries like zod or joi or do manuaal validaation

  // for now we are doing a simple manual validation

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    res.status(400).send("Name field is required");
  } else if (!validator.isStrongPassword(password)) {
    res.status(400).send("Please provide a strong password");
  } else if (!validator.isEmail(email)) {
    res.status(400).send("Please provide a valid email");
  } else {
    next();
  }
};

module.exports = {
  signUpValidation,
};
