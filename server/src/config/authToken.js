import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  // Set token in HTTP-only cookie.
  // In production the frontend and backend are on different domains (e.g. Vercel + Render),
  // so the cookie must be SameSite=None + Secure for the browser to send it cross-site.
  // In local dev (same-site http://localhost) SameSite=Lax works and doesn't require HTTPS.
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};