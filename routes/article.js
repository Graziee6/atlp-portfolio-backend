const router = require("express").Router();

const Article = require("./../models/article");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 15 },
  fileFilter: fileFilter,
});

const createArticle = async (req, res) => {
  console.log(req.file);
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    articleThumbnail: req.file.path,
  });
  await article.save();
  res.send(article);
};

const updateArticle = async (req, res) => {
  try {
    const article = Article.findOne({ _id: req.params.id });
    if (req.body.title) {
      article.title = req.body.title;
    }
    if (req.body.content) {
      notep;
      article.content = req.body.content;
    }
    if (req.body.articleThumbnail) {
      article.articleThumbnail = req.body.articleThumbnail;
    }
    await article.save();
    res.send(article);
  } catch {
    res.status(404);
    res.send({ error: "Article doesn't exist" });
  }
};

router.route("/").post(upload.single("articleThumbnail"), createArticle);
router.route("/:id").put(updateArticle);

router
  .route("/")
  .post(upload.single("articleThumbnail"), createArticle)
  .get(getAllArticles);
router.route("/:id").get(getArticle);

module.exports = router;
