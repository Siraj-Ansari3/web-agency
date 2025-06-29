import express from "express";
import dotenv from "dotenv";
import authMiddleware from "../middleware/authMiddleware.js";
import Blog from "../Schema/Blog.js";
import { nanoid } from "nanoid";
dotenv.config();

const router = express.Router();


// Simple slugify function
const slugify = (text) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-') // replace spaces & special chars with dash



router.post('/add', authMiddleware, async (req, res) => {
    try {
        const {
            title,
            content,
            category,
            status,
            image,
            tags
        } = req.body;

        // Validate required fields
        if (!title || !content?.html || !category || !status) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        const blog_id = `${slugify(title)}-${nanoid(6)}`;

        // Save to database (assuming you use Mongoose)
        const newBlog = new Blog({
            blog_id,
            title,
            content,
            category,
            status,
            image,
            tags,

        });

        await newBlog.save();

        res.status(201).json({ message: 'Blog saved successfully', blog: newBlog });
    } catch (err) {
        console.error('Error saving blog:', err);
        res.status(500).json({ error: 'Server error while saving blog.' });
    }
});



router.get("/get-all-blogs", async (req, res) => {
    try {
        const allBlogs = await Blog.find({}).sort({ createdAt: -1 }); // optional: sort by newest first

        return res.status(200).json({
            message: "All blogs fetched successfully",
            blogs: allBlogs,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/get-blog", async (req, res) => {
    const { id } = req.query;
    try {
        const blog = await Blog.findOne({ blog_id: id });
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        return res.status(200).json({ message: "blog successfully fetched", blog });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" })

    }

})


export default router;