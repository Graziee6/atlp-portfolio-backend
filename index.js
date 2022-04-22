const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/ATLP-Portfolio", {
    useNewUrlParser: true,
  })
  .then(() => {
    const express = require("express");
    const app = express();

    app.listen(3008, () => {
      console.log("Server has started!");
    });
  });
