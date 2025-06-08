import express from "express";
import upload from "../middleware/Multer.js";
import auth from "../middleware/auth.js";
import {
  addBlog,
  deleteBlogsByID,
  generateContent,
  getAllBlogs,
  getBlogsByID,
  togglePublish,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogsByID);
blogRouter.post("/delete", auth, deleteBlogsByID);
blogRouter.post("/toggle_publish", togglePublish);
blogRouter.post("/ai",auth , generateContent);

export default blogRouter;
