import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import habitRoutes from "./routes/habits.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET in .env - see .env.example");
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env - see .env.example");
  process.exit(1);
}
if (!process.env.GROQ_API_KEY) {
  console.warn("No GROQ_API_KEY set - /api/ai/coach will return 503 until one is configured.");
}

connectDB();

const app = express();

// In production, lock this down to the deployed frontend origin.
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(",") : true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/ai", aiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
