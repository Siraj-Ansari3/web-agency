import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ""
  },
  tagline: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  // Add social links
  socialLinks: {
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    twitter: { type: String, default: "" }
  }
}, {
  timestamps: true
});

export default mongoose.model("Admin", adminSchema);