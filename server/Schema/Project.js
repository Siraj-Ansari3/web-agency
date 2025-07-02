import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    project_id: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Real Estate', 'Business', 'E-Commerce', 'Education', 'Social Media', 'News', 'Entertainment', 'Web App']
    },
    thumbnail: {
        type: String, // Store path or URL
        required: true
    },
    longSS: {
        type: String, // Store path or URL
        required: false
    },
    description: {
        type: String,
        required: false
    },
    techStack: [{
        type: String,
        required: false
    }],
    features: [{
        type: String,
        required: false
    }],
    userRoles: {
        type: String,
        required: false
    },
    liveLink: {
        type: String,
        required: false
    },
    screenshots: [{
        type: String, // Array of image paths/URLs
        required: false
    }],
    timeline: {
        type: String,
        required: false
    },
    challenge: [{
        type: String,
        required: true
    }],
    // Added fields for enhanced functionality
    shortDescription: {
        type: String,
        maxlength: 200
    },
    client: {
        type: String,
        default: 'Confidential'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('Project', ProjectSchema);
