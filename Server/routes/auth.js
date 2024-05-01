const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserDetails,
  bookmarkStory,
  removeFromBookmark,
  likeStory,
} = require("../controllers/user");
const {
  addBookmark,
  getBookmarkedStoriesByUser,
} = require("../controllers/bookmark");
const verifyJwt = require("../middleware/authmiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/userDetails", getUserDetails);
router.post("/bookmark", verifyJwt, bookmarkStory);
router.post("/remove-bookmark", verifyJwt, removeFromBookmark);
// router.post("/like-story", verifyJwt, likeStory);
// router.post("/bookmark/:id", verifyJwt, addBookmark);
router.get("/bookmarks/:userId", verifyJwt, getBookmarkedStoriesByUser);

module.exports = router;
