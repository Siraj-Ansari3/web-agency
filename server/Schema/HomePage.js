import mongoose from "mongoose";

const homePageSchema = new mongoose.Schema({
  hero: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    ctaText: { type: String, required: true },
    ctaLink: { type: String, required: true },
    backgroundImage: {
      url: String,
      name: String,
      type: String,
      size: Number
    }
  },
  about: {
    tagline: String,
    title: String,
    description: String,
    mission: String,
    whatWeBuild: {
      title: String,
      description: String,
      items: [String]
    },
    ourApproach: {
      title: String,
      items: [String]
    }
  },
  features: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: String
  }],
  services: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    items: [{
      title: String,
      description: String,
      icon: String,
      features: [String]
    }]
  },
  steps: {
    title: { type: String, required: true },
    subtitle: String,
    steps: [{
      stepNumber: Number,
      title: String,
      description: String,
      icon: String
    }]
  },
  portfolio: {
    title: { type: String, required: true },
    description: String,
    items: [{
      title: String,
      description: String,
      image: {
        url: String,
        name: String,
        type: String,
        size: Number
      }
    }]
  },
  blog: {
    title: { type: String, required: true },
    subtitle: String
  },
  testimonials: [{
    content: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    rating: { type: Number, required: true },
    avatar: {
      url: String,
      name: String,
      type: String,
      size: Number
    }
  }],
  cta: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    ctaText: { type: String, required: true },
    ctaLink: { type: String, required: true }
  }
}, { timestamps: true });

export default mongoose.model("homePage", homePageSchema);