// routes/adminAuth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import verifyKey from "../middleware/verifyKey.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Signup
router.post("/signup", verifyKey, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (await Admin.findOne({ email })) {
      return res.status(400).json({ error: "Email already in use." });
    }
    const hash = await bcrypt.hash(password, 12);
    const admin = await Admin.create({ firstName, lastName, email, password: hash });
    res.status(201).json({ message: "Admin registered." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// Signin
router.post("/signin", verifyKey, async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, admin: { email: admin.email, firstName: admin.firstName } });
  } catch {
    res.status(500).json({ error: "Server error." });
  }
});

export default router;
