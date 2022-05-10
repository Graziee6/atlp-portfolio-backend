const mongoose = require("mongoose");

const Joi = require("joi")

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  articleThumbnail: { type: String, required: true },
});

exports.validateArticle = (article) => {
  const validArticle = Joi.object({
    title: Joi.string().min(5).max(12).required(),
    content: Joi.string().required(),
    articleThumbnail: Joi.string().required(),
  });
  return validArticle.validate(article);
};

module.exports = mongoose.model("Article", articleSchema);
