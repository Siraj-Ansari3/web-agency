// models/aboutPage.js
import mongoose from "mongoose";

const aboutPageSchema = new mongoose.Schema({
  page: { type: String, required: true, default: "about" },
  header: {
    tagline: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  storyMission: {
    story: { type: String, required: true },
    mission: { type: String, required: true },
    vision: { type: String, required: true }
  },
  coreValues: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
  }],
  teamMembers: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    img: { type: String, required: true },
    skills: [{ type: String, required: true }],
    social: {
      twitter: String,
      github: String,
      instagram: String,
      linkedin: String,
      facebook: String
    }
  }],
  whyChooseUs: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
  }],
  cta: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    buttonText: { type: String, required: true }
  }
}, { timestamps: true });

export default mongoose.model("AboutPage", aboutPageSchema);