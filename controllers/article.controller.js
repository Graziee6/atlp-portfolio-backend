const Article = require("./../models/article.model");

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

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 15 },
  fileFilter: fileFilter,
});

exports.createArticle = async (req, res) => {
  console.log(req.file);
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    articleThumbnail: req.file.path,
  });
  await article.save();
  res.send(article);
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    if(article){
        if (req.body.title) {
      article.title = req.body.title;
    }
    if (req.body.content) {
      article.content = req.body.content;
    }
    if (req.body.articleThumbnail) {
      article.articleThumbnail = req.body.articleThumbnail;
    }
    }
    
    await article.save();
    res.json(article);
  } catch {
    res.status(404);
    res.send({ error: "Article doesn't exist" });
  }
};

exports.getAllArticles = async (req, res) => {
  const article = await Article.find();
  res.json(article);
};

exports.getArticle = async (req, res) => {
  try {
    const Article = await Article.findOne({ _id: req.params.id });
    res.json(Article);
  } catch {
    res.status(404);
    res.send({ error: "Article doesn't exist" });
  }
};
exports.deleteArticle = async (req, res) => {
  try {
    await Article.deleteOne({ _id: req.params.id });
    res.status(204).send("Article successfully deleted");
  } catch {
    res.status(404);
    res.send({ error: "Article was not found - Couldn't delete" });
  }
};