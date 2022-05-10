const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/user.model");

const { authenticate } = require("../middleware/auth");

exports.createUser = async (req, res) => {
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
  return res.json(user);
};

exports.login = async (req, res) => {
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
  return res.json({ data: token });
};

exports.updateUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findById(id);
    if(user){
      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }
    }

    await user.save();
    return res.json(user);
  } catch(error) {
    
    return res.json({ data:error });
  }
};

exports.getAllUsers = async (req, res) => {
  const user = await User.find();
  return res.json(user);
};

exports.getUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findById(id);
    return res.json(user);
  } catch (error){
    return res.json({data:error});
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).json({ message: "User successfully deleted" });
  } catch (error){
    return res.json({data:error});
    
  }
};
