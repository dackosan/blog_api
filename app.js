import express from "express";
import cors from "cors";
import postRoutes from "./routers/postsRoutes.js";
import usersRouter from "./routers/usersRoutes.js";

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server runs on ${PORT}`);
});
