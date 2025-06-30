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
        .replace(/[\s\W-]+/g, '-') 



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
        const allBlogs = await Blog.find({}).sort({ createdAt: -1 }); 

        return res.status(200).json({
            message: "All blogs fetched successfully",
            blogs: allBlogs,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/get-last-three-blogs", async (req, res) => {
  try {
    const lastThree = await Blog
      .find({})
      .sort({ publishedAt: -1 })  // newest first
      .limit(3);                // only 3 docs

    return res.status(200).json({
      message: "Last three blogs fetched successfully",
      blogs: lastThree,
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


router.put("/update/:id", async (req, res) => {
  const blogId = req.params.id;
  const updateData = req.body;
  
  try {
    // Find and update the blog
    const updatedBlog = await Blog.findOneAndUpdate(
      { blog_id: blogId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.status(200).json({ 
      message: "Blog updated successfully",
      blog: updatedBlog
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete-blog/:id", async (req, res) => {
    const {id} = req.params;
    
    try {
        // Find and delete the blog
        const result = await Blog.deleteOne({ blog_id: id });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Blog not found" });
        }
        
        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;