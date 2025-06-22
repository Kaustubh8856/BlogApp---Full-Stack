import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
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
