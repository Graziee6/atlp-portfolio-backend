const router = require("express").Router();

const User = require("../models/user");

const createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();
  res.send(user);
};

router.route("/").post(createUser);
