// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminAuth from "./routes/adminAuth.js";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", adminAuth);

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => {
    console.log(`Server up on port ${process.env.PORT}`);
  }))
  .catch(err => console.error(err));
