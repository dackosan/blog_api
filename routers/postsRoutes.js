import express from "express";
import * as Post from "../data/post.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(Post.getPosts());
});

router.get("/:id", (req, res) => {
  const post = Post.getPostById(+req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  res.status(200).json(post);
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

export default router;
