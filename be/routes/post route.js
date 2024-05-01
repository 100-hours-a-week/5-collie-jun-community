import express from "express";
const router = express.Router();

import { postController } from "../controllers/post_controller.js";

// GET /posts
router.get('/', (req, res) => {
  postController.getPosts(req, res);
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  postController.getPosts(req, res);
});
router.delete("/:id",(req,res)=>{
  postController.deletePost(req,res);
});
router.patch("/:id/editpost", (req, res) => {
  postController.modifyPost(req, res);
});
router.post("/createpost", (req, res) => {
  postController.createPost(req, res);
});
router.post("/writecomment", (req,res)=>{
  postController.writeComment(req,res);
})
router.patch("/modifycomment", (req,res)=>{
  postController.modifyComment(req,res);
})
router.delete("/:id/deletecomment/:commentid", (req,res)=>{

  postController.deleteComment(req,res);
})