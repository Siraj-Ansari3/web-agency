import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export default function authMiddleware(req, res, next) {
    const token = req.cookies.adminToken;
    if (!token) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded
    console.log(req.user)
    next();
}