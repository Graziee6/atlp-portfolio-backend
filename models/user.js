const mongoose = require("mongoose");

const Joi = require("joi");

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const validateUser = (user) => {
  const validUser = Joi.object({
    username: Joi.string().min(5).max(12).required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  });
  return validUser.validate(user);
};

module.exports = mongoose.model("User", UserSchema);
