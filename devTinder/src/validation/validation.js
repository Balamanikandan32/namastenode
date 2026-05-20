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

const profileEditValidation = (req, res, next) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "skills",
    "gender",
    "photoUrl",
  ];

  const reqFields = req.body;

  const isEditDataValidated = Object.keys(reqFields).every((field) =>
    allowedEditFields.includes(field),
  );
  if (isEditDataValidated) {
    next();
  } else {
    res.status(400).send("Invalid edit field is being sent");
  }
};

const profileEditPasswordValidation = (req, res, next) => {
  const { password } = req.body;
  try {
    if (!password) {
      throw new Error("Invalid data payload");
    }
    const isStrongPassword = validator.isStrongPassword(password);
    if (isStrongPassword) {
      next();
    } else {
      throw new Error("please enter a string password");
    }
  } catch (err) {
    res.send("Error" + err.message);
  }
};

module.exports = {
  signUpValidation,
  profileEditValidation,
  profileEditPasswordValidation,
};
