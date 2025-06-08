import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import BlogModel from "../models/Blog.js";
import commentModel from "../models/Comment.js";
dotenv.config();

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res
        .status(201)
        .json({ success: false, message: "Email is not correct" });
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res
        .status(201)
        .json({ success: false, message: "Password is not correct" });
    }
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    res.json({
      success: true,
      message: "successfully Login! ",
      token: token,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel
      .find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await BlogModel.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    const blogs = await BlogModel.countDocuments();
    const comments = await commentModel.countDocuments();
    const drafts = await BlogModel.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      recentBlogs,
      drafts,
      comments,
    };

    res.json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await commentModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await commentModel.findByIdAndUpdate(id,{isApproved:true});
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

