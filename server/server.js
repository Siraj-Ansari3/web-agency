// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import adminRoute from "./routes/adminRoute.js";
import pageEdit from "./routes/pageEdit.js";
import blogRoute from "./routes/blogRoute.js";
import projectRoute from "./routes/projectRoute.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import aws from 'aws-sdk';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// S3 Setup
const s3 = new aws.S3({
  region: "eu-north-1",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const generateUploadUrl = async () => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

  return await s3.getSignedUrlPromise('putObject', {
    Bucket: 'agency-bucket-3',
    Key: imageName,
    Expires: 1000,
    ContentType: 'image/jpeg'
  })
}

// Upload ImageURL Route
app.get('/get-upload-url', async (req, res) => {
  try {
    const url = await generateUploadUrl();

    res.status(200).json({ uploadURL: url })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ error: "internal server error" })
  }

})


// Routes
app.use("/admin", adminRoute);
app.use("/admin/edit-page", pageEdit)
app.use("/blog", blogRoute)
app.use("/project", projectRoute)


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connection established');
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Server up on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection failed:', err));
