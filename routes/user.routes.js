const router = require("express").Router();

const {createUser, login, getAllUsers, getUser, updateUser, deleteUser} = require("./../controllers/user.controller")

router.post("/signup", createUser);
router.post("/login", login);
router.route("/").get(getAllUsers);
router
  .route("/:id")
  .put(updateUser)
  .get(getUser)
  .delete(deleteUser);
module.exports = router;
