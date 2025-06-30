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
  password: { 
    type: String, 
    required: true 
  },
  image: {
    type: String,
    default: "" 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

export default mongoose.model("Admin", adminSchema);