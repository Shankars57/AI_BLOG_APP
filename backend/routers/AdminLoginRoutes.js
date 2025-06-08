import express from "express";
import auth from "../middleware/auth.js";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
const AdminRouter = express.Router();

AdminRouter.post("/login", adminLogin);
AdminRouter.get("/comments", auth, getAllComments);
AdminRouter.get("/blogs", auth, getAllBlogsAdmin);
AdminRouter.post("/delete_comment", auth, deleteCommentById);
AdminRouter.post("/approve_comment", auth, approveCommentById);
AdminRouter.get("/dashboard", auth, getDashboard);

export default AdminRouter;
