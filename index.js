const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const articleRoutes = require("./routes/article");
const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");

const path = require("path");
mongoose
  .connect("mongodb://0.0.0.0:27017/ATLP-Portfolio", {
    useNewUrlParser: true,
  })
  .then(() => {
    const swaggerDocs = require("./swagger.json");
    app.use(
      "/documentation",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocs, false, {
        docExpansion: "none",
      })
    );

    app.use(express.json());
    app.use("/uploads", express.static("uploads"));

    app.use("/api/users", userRoutes);
    app.use("/api/articles", articleRoutes);

    app.listen(3008, () => {
      console.log("Server has started!");
    });
  });
