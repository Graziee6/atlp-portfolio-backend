const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const articleRoutes = require("./routes/article");
const express = require("express");
const app = express();

const path = require("path");
mongoose
  .connect("mongodb://0.0.0.0:27017/ATLP-Portfolio", {
    useNewUrlParser: true,
  })
  .then(() => {
    app.use(express.json());
    app.use("/uploads", express.static("uploads"));

    app.use("/api/users", userRoutes);
    app.use("/api/articles", articleRoutes);
  });

const server = app.listen(3008, () => {
  console.log("Server has started!");
});
exports.server = server;
