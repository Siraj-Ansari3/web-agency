import dotenv from "dotenv";
dotenv.config();

export default function verifyKey(req, res, next) {
  const { specialKey } = req.body;
  if (specialKey !== process.env.SPECIAL_KEY) {
    return res.status(403).json({ error: "Invalid special key." });
  }
  next();
}
