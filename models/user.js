const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const Joi = require("joi");

const dotenv = require("dotenv").config();

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

UserSchema.methods.generateAuthToken = () => {
  const token = jwt.sign(
    {
      email: this.email,
    },
    process.env.JWT_SECRET.trim()
  );
  return token;
};

module.exports.validateUser = (user) => {
  const validUser = Joi.object({
    username: Joi.string().min(5).max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  });
  return validUser.validate(user);
};

module.exports.User = mongoose.model("User", UserSchema);
