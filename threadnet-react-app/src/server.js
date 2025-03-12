import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Topic, SideSection } from "./models.js"; // Import models

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// ✅ Define REST API Routes
app.get("/api/topics", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    console.error("Error fetching topics:", err);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

app.get("/api/sideSection", async (req, res) => {
  try {
    const sideSection = await SideSection.find();
    res.json(sideSection);
  } catch (err) {
    console.error("Error fetching sideSection:", err);
    res.status(500).json({ error: "Failed to fetch sideSection" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
