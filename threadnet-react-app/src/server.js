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


  const userProfileSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    recoveryEmail: String,
    dateJoined: String,
    numThreadsPosted: Number,
    numReplies: Number,
    aboutMe: String,
    courses: [{ entryID: Number, courseName: String, courseStatus: String }],
  }, { collection: 'profile' });;
  
  const UserProfile = mongoose.model('UserProfile', userProfileSchema);

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

app.get("/api/profile/:username", async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ username: req.params.username });
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
app.put('/api/profile/:username', async (req, res) => {
  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new course
app.post('/api/profile/:username/courses', async (req, res) => {
  try {
    const { username } = req.params;
    const newCourse = req.body;

    console.log("Received request to add course:", newCourse); // Debug: Log the received data

    const userProfile = await UserProfile.findOne({ username });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new course to the courses array
    userProfile.courses.push(newCourse);

    // Save the updated user profile
    await userProfile.save();

    console.log("Updated user profile:", userProfile); // Debug: Log the updated data

    res.json(userProfile);
  } catch (error) {
    console.error("Error adding course:", error); // Debug: Log any errors
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
