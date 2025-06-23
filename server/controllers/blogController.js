import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";

// Add Blog Controller
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    // Checking if all fields are present
    if (!title || !description || !category || !imageFile || !isPublished) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    // convert file to buffer to upload it to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimization through imageKit URL transformation
    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // file auto compression
        { format: "webp" }, // format conversion to modern format
        { width: "1280" }, // width resizing
      ],
    });
    const image = optimizedImageURL;
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    res.json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all blog controller'
export const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in fetch all blogs API",
      error,
    });
  }
};

// Get individual blog by ID
export const getBlogByID = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete blog controller
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// toggle publish controller
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
