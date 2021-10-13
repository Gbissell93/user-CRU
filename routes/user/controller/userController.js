const User = require("../model/user");
const bcrypt = require("bcrypt");
const {
  isAlpha,
  isEmail,
  isAlphaNumeric,
  isEmpty,
  isStrongPassword,
} = require("validator");

const createUser = async (req, res, next) => {
  let body = req.body;
  let errObj = {};
  const { firstName, lastName, email, password } = req.body;

  for (key in body) {
    if (isEmpty(body[key])) {
      errObj[key] = `${key} cannot be empty`;
    }
  }
  if (!isAlpha(firstName)) {
    errObj.firstName =
      "First name cannot contain any numbers or special characters.";
  }
  if (!isAlpha(lastName)) {
    errObj.lastName =
      "Last name cannot contain any numbers or special characters.";
  }

  if (!isEmail(email)) {
    errObj.email = "Please enter a valid email";
  }

  if (!isStrongPassword(password)) {
    errObj.password =
      "Password must contain at least 8 characters, upper and lowercase letters a number and special character";
  }

  if (Object.keys(errObj).length > 0) {
    res.status(500).json({ message: "error", error: errObj });
  } else {
    try {
      let salt = await bcrypt.genSalt(10);
      let hashedword = await bcrypt.hash(password, salt);

      const createdUser = new User({
        firstName,
        lastName,
        email,
        password: hashedword,
      });

      let savedUser = await createdUser.save();

      res.json({
        message: `welcome ${firstName}, new account created`,
        payload: savedUser,
      });
    } catch (error) {
      res.status(500).json({ message: "error", error: error.message });
    }
  }
};

module.exports = {
  createUser,
};
