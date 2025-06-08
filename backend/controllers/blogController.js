import BlogModel from "../models/Blog.js";
import fs from "fs";
import imageKit from "../databases/imageKit.js";
import commentModel from "../models/Comment.js";
import main from "../congif/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    //check if all fields are present
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    //upload image to ImageKit

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    //Optimization through imageKit to url
    const optimizedImage = imageKit.url({
      path: response.filePath,
      transformation: [
        {
          quality: "auto",
        },
        { format: "webp" },
        { width: "1280" },
      ],
    });
    const image = optimizedImage;
    await BlogModel.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({ isPublished: true });
    res.json({ success: true, message: "Successfully data retrieve", blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogsByID = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog Not Found" });
    }
    res.json({ success: true, message: "Blog Loaded", blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const deleteBlogsByID = async (req, res) => {
  try {
    const { id } = req.body;
    await BlogModel.findByIdAndDelete(id);
    await commentModel.deleteMany({ blog: id });
    res.json({ success: true, message: "Blog successfully Deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await BlogModel.findById(id);
    blog.isPublished = !blog.isPublished;

    await blog.save();

    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    const comments = await commentModel.create({
      blog,
      name,
      content,
    });

    await comments.save();

    res.json({ success: true, message: "Comment successfully added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await commentModel
      .find({
        blog: blogId,
        isApproved: true,
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + "Generate a blog content for this topic in simple text format."

      // "and give me content which
      // contains 500 words and also
      // bullet pointed and every line will
      // be in new line not continuously.
      //  Give me direct content only"
    );
    res.json({ success: true, message: "content generated", content: content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
