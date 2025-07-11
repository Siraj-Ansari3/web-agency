import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../Schema/Admin.js";
import verifyKey from "../middleware/verifyKey.js";
import dotenv from "dotenv";
import authMiddleware from "../middleware/authMiddleware.js";
dotenv.config();

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Signup with automatic sign-in using cookies
router.post("/signup", verifyKey, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if email exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 12);

    // Create admin
    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      password: hash
    });

    // Generate JWT token
    const token = generateToken(admin);

    // Set token as HTTP-only cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000 // 1 hour
    });

    // Send response with admin data (without sensitive info)
    res.status(201).json({
      message: "Admin registered and signed in successfully",
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email
      }
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during registration." });
  }
});

// Signin with cookie
router.post("/signin", verifyKey, async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    // Validate credentials
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT token
    const token = generateToken(admin);

    // Set token as HTTP-only cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000 // 1 hour
    });

    res.json({
      message: "Signin successful",
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email
      }
    });

  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Server error during authentication." });
  }
});

// Signout route
router.post("/signout", (req, res) => {
  res.clearCookie("adminToken");
  res.json({ message: "Signed out successfully" });
});

// Check if admin is authenticated
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin by id
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(admin);
  } catch (err) {
    console.error("Error in /admin/me:", err);
    res.status(401).json({ error: "Invalid token" });
  }
});

router.get("/get-admins", async (req, res) => {
  try {
    const admins = await Admin.find({});
    if (!admins.length) {
      return res.status(401).json({ error: "No admins found" })
    }

    return res.status(200).json({ message: "admins found successfully", admins })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/get-admin/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({ error: "No Admin Found" });
    }

    return res.status(200).json({ admin });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

router.put("/update-admin/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      firstName, 
      lastName, 
      password, 
      image, 
      description,
      tagline,
      socialLinks // Make sure this is included
    } = req.body;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Prepare update data
    const updateData = { 
      firstName, 
      lastName, 
      description,
      tagline,
      socialLinks // Include social links
    };

    if (image) updateData.image = image;
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 12);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Admin updated successfully",
      admin: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;