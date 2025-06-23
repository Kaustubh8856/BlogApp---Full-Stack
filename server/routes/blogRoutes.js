import express from "express";
import {
  addBlog,
  deleteBlogById,
  getAllBlog,
  getBlogByID,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
const blogRouter = express.Router();
blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlog);
blogRouter.get("/:blogId", getBlogByID);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);

export default blogRouter;
