// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blog_id: String,
    title: String,
    content: {
        html: String,
        text: String,
        metadata: {
            wordCount: Number,
            readingTime: String
        }
    },
    category: String,
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    image: String,
    tags: [String],
}, {
    timestamps: {
        createdAt: 'publishedAt'
    }

});

export default mongoose.model('Blog', blogSchema);
