const router = require("express").Router();

const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/user");

const { authenticate } = require("./../middleware/auth");

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res.json({
      message: "Invalid username, password or email",
      data: error.details[0].message,
    });

  const storedEmail = await User.findOne({ email: req.body.email });
  if (storedEmail) {
    return res.json({ message: "A user with that email is already in" });
  }

  const saltRounds = 11;
  const password = await bcrypt.hash(req.body.password, saltRounds);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: password,
  });
  await user.save();
  res.send(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.json({ message: "Invalid email or password" });
  }
  let storedPassword = await bcrypt.compare(password, user.password);
  if (!storedPassword) {
    return res.json({ message: "Invalid email or password" });
  }
  let token = user.generateAuthToken();
  return token;
};

const updateUser = async (req, res) => {
  try {
    const user = User.findOne({ _id: req.params.id });
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist" });
  }
};

const getAllUsers = async (req, res) => {
  const user = await User.find();
  res.send(user);
};

const getUser = async (req, res) => {
  try {
    const user = User.findOne({ _id: req.params.id });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).send({ message: "User successfully deleted" });
  } catch {
    res.status(404);
    res.send({ error: "User was not found - Couldn't delete" });
  }
};

router.post("/signup", createUser);
router.post("/login", login);
router.route("/").get(getAllUsers);
router
  .route("/:id")
  .put(authenticate, updateUser)
  .get(getUser)
  .delete(deleteUser);
module.exports = router;
