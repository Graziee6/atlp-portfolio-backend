const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();

exports.authenticate = (req, res, next) => {
  const token = req.header["Authorization"].trim();
  if (!token) return res.send("Login first");
  try {
    let tokenArr = token.split(" ");
    //To keep the user
    let user = jwt.verify(tokenArr[1], process.env.JWT_SECRET.trim());
    req.user = user;
    next();
  } catch (error) {
    return res.json({
      message: "An authentication error occurred",
      data: error,
    });
  }
};
