import express from "express";
import * as Post from "../data/post.js";
import * as User from "../data/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../util/authentication.js";

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

router.post("/", (req, res) => {
  const { userId, title, content } = req.body;
  if (!title || !content) {
    return res.status(403).json({ message: "Invalid credentials!" });
  }

  const user = User.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  Post.savePost(userId, title, content);

  res.status(201).json({ message: "Post created!" });
});

router.put("/:id", (req, res) => {
  const post = Post.getPostById(+req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(403).json({ message: "Invalid credentials!" });
  }

  Post.updatePost(post.id, title, content);

  res.status(200).json({ message: "Post updated!" });
});

router.delete("/:id", (req, res) => {
  const post = Post.getPostById(+req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  Post.deletePost(post.id);

  return res.status(200).json({ message: "Post deleted!" });
});

export default router;
