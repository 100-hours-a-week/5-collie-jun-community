const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();
const controller = require(path.join(
  __dirname,
  "..",
  "controllers",
  "postcontroller.js"
));

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      done(null, file.originalname);
    },
    destination(req, file, done) {
      done(null, "uploads");
    },
  }),
});

router.get("/posts", controller.getAllPosts);
router.post("/submit", upload.single("image"), controller.submitPost);
router.put("/posts/:postId", controller.updatePost);
router.delete("/posts/:postId", controller.deletePost);


module.exports = router;