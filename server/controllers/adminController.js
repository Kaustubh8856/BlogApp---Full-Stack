import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

// admin login controller
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get all blogs for admin controller
export const getAllBlogAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get all comments controller
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// dashboard data controller
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });
    const dashboardData = { blogs, comments, drafts, recentBlogs };
    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// delete comment by id controller
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// approve comment controller
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
