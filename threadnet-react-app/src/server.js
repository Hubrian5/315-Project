/* eslint-disable no-unused-vars */
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
    courses: [{ courseName: String, courseStatus: String }],
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

// Delete a course
app.delete('/api/profile/:username/courses/:_id', async (req, res) => {
  try {
    const { username, _id } = req.params;
    const userProfile = await UserProfile.findOne({ username });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    userProfile.courses.pull({ _id }); // Use .pull() to remove by _id
    await userProfile.save();

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark a course a completed 
app.put('/api/profile/:username/courses/:_id/complete', async (req, res) => {
  try {
    const { username, _id } = req.params;
    const userProfile = await UserProfile.findOne({ username });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    const course = userProfile.courses.id(_id); // Use .id() to find by _id
    if (course) {
      course.courseStatus = "Completed";
      await userProfile.save();
    }

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Threads
const threadSchema = new mongoose.Schema({
  title: String,
  username: String,
  avatar: String,
  content: String,
  timestamp: String,
  likeCount: Number,
  dislikeCount: Number,
  replies: [
    {
      username: String,
      avatar: String,
      content: String,
      timestamp: String,
      likeCount: Number,
      dislikeCount: Number,
      userReaction: { type: String, enum: ["like", "dislike", null], default: null },
    },
  ],
  topicTitle: String,
}, { collection: "threads" });

const Thread = mongoose.model("Thread", threadSchema);

// Fetch all threads
app.get("/api/threads", async (req, res) => {
  try {
    const threads = await Thread.find();
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// Fetch thread by ID
app.get("/api/threads/:id", async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

// Create a new thread
app.post("/api/threads", async (req, res) => {
  try {
    const newThread = new Thread(req.body);
    await newThread.save();
    res.status(201).json(newThread);
  } catch (err) {
    res.status(500).json({ error: "Failed to create thread" });
  }
});

// Add a reply to a thread
app.post("/api/threads/:id/replies", async (req, res) => {
  try {
    const { id } = req.params;
    const thread = await Thread.findById(id);

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    // Set default avatar if none is provided
    const replyData = {
      ...req.body,
      avatar: req.body.avatar || "https://m.media-amazon.com/images/I/51DBd7O6GEL.jpg",
    };    

    thread.replies.push(req.body);
    await thread.save();

    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: "Failed to add reply" });
  }
});

// Update thread likes/dislikes
app.put("/api/threads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { likeCount, dislikeCount } = req.body;
    const thread = await Thread.findByIdAndUpdate(id, { likeCount, dislikeCount }, { new: true });
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: "Failed to update thread" });
  }
});

// Update reply likes/dislikes
app.put("/api/threads/:threadId/replies/:replyId", async (req, res) => {
  try {
    const { threadId, replyId } = req.params;
    const { likeCount, dislikeCount, userReaction } = req.body; // Add userReaction
    const thread = await Thread.findById(threadId);
    const reply = thread.replies.id(replyId);
    reply.likeCount = likeCount;
    reply.dislikeCount = dislikeCount;
    reply.userReaction = userReaction; // Update userReaction
    await thread.save();
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: "Failed to update reply" });
  }
});

// Delete a reply from a thread
app.delete("/api/threads/:threadId/replies/:replyId", async (req, res) => {
  try {
    const { threadId, replyId } = req.params;
    const thread = await Thread.findById(threadId);

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    // Filter out the reply
    thread.replies = thread.replies.filter(reply => reply._id.toString() !== replyId);

    await thread.save();
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete reply" });
  }
});


// Trying to organzie threads by topic ******************************************
// Get thread by topic title
app.get('/api/threads/by-topic/:topicTitle', async (req, res) => {
  try {
    const thread = await Thread.findOne({ topicTitle: req.params.topicTitle });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread); // Returns a single thread object
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

// Auth Endpoints using Profile collection
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const profile = await UserProfile.findOne({ email });
    if (!profile) {
      return res.status(401).json({ message: "Invalid credentials wow" });
    }

    console.log("Whoa", profile.password);
    console.log("Wow", password);
    // Plain text password comparison (not secure)
    if (password !== profile.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Set up session with profile data
    req.json = {
      id: profile._id,
      username: profile.username,
      email: profile.email
    };

    res.json({ 
      user: {
        id: profile._id,
        username: profile.username,
        email: profile.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/api/auth/check', (req, res) => {
  // Always return "not authenticated" since we're not tracking sessions.
  res.status(401).json({ message: "Not authenticated (server is stateless)" });
});

app.post('/api/auth/logout', (req, res) => {
  // Just return success (no session to destroy).
  res.json({ message: "Logged out successfully (no server-side session)" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
