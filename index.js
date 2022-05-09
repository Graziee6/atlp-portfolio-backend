const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const articleRoutes = require("./routes/article");
const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT || 3000;

const swaggerUi = require("swagger-ui-express");

const path = require("path");
mongoose
  .connect(process.env.MONGO_URL, {
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
  });

const server = app.listen(PORT, () => {
  console.log("Server has started!");
});
module.exports = server;
