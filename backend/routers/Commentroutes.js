import express from "express";
import { addComment, getBlogComments } from "../controllers/blogController.js";
const commentRouter = express.Router();

commentRouter.post("/add", addComment);
commentRouter.get("/get", getBlogComments);

export default commentRouter;
