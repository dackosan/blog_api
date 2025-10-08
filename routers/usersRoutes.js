import { Router } from "express";
import * as User from "../data/user.js";
import bcrypt from "bcrypt";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(User.getUsers());
});

router.get("/:id", (req, res) => {
  const user = User.getUserById(+req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  res.status(200).json(user);
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  if ((!name || !email, !password)) {
    return res.status(403).json({ message: "Invalid credentials!" });
  }

  const user = User.getUserByEmail(email);
  if (!user) {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    User.saveUser(name, email, hashedPass);

    return res.status(201).json({ message: "User created!" });
  }

  res.status(409).json({ message: "Email already used!" });
});

router.put("/:id", async (req, res) => {
  const user = User.getUserById(+req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const { name, email, password } = req.body;
  if ((!name || !email, !password)) {
    return res.status(403).json({ message: "Invalid credentials!" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  User.updateUser(user.id, name, email, hashedPass);

  return res.status(204).json({ message: "User updated!" });
});

router.delete("/:id", (req, res) => {
  const user = User.getUserById(+req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  User.deleteUser(user.id);

  return res.status(200).json({ message: "User deleted!" });
});

export default router;
