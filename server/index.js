import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./src/routers/authRouter.js";
import connectDB from "./src/config/db.js";
// import {v2 as cloudinary} from "cloudinary";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running 🚀" });
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;

  console.error("❌ Error:", err);

  console.log("Error Found", { ErrorMessage, StatusCode });

  res.status(StatusCode).json({ message: ErrorMessage });
});

//Start server ONLY after DB connects
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect DB", error.message);
    process.exit(1);
  }
};

startServer();

// app.listen(port,async () => {
//   console.log("Server Started at Port : ", port);
//   connectDB();
//   try {
//     const res = await cloudinary.api.ping();
//     console.log("Cloudinary API is Working:",res);
//   } catch (error) {
//     console.error("Error Connecting Cloudinary API :", error)
//   }
// });
