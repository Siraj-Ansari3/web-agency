import dotenv from "dotenv";
dotenv.config();

export default function verifyKey(req, res, next) {
  const { secretKey } = req.body;
  if (secretKey !== process.env.SECRET_KEY) {
    return res.status(403).json({ error: "Invalid secret key." });
  }
  next();
}
