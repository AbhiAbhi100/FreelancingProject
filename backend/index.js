import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import clientRoute from "./routes/client.route.js";
import projectRoute from "./routes/project.route.js";
import proposalRoute from "./routes/proposal.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: [
    "http://localhost:5173", // for development
    "https://freelancing-7gjnuj3t2-abhinav-singhs-projects-ecc4bd85.vercel.app", // production frontend
    process.env.FRONTEND_URL || "http://localhost:5173", // for production
  ],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Health check endpoint for deployment platforms
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Freelancing Project Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/client", clientRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/proposal", proposalRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
