const router = require("express").Router();

const {createArticle, updateArticle, getAllArticles, getArticle, deleteArticle, upload} = require("./../controllers/article.controller")


router
  .route("/")
  .post(upload.single("articleThumbnail"), createArticle)
  .get(getAllArticles);
router.route("/:id").get(getArticle).put(updateArticle).delete(deleteArticle);

module.exports = router;
