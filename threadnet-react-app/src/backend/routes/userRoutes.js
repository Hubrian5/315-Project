import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// ✅ POST /api/users/forgot-password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  console.log("🔥 Forgot password request received:", email);
  return res.status(200).json({
    message: "If this email exists, a reset link has been sent.",
  });
});

// ✅ POST /api/users
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      recoveryEmail: "",
      dateJoined: new Date().toISOString(),
      numThreadsPosted: 0,
      numReplies: 0,
      aboutMe: "",
    });

    await newUser.save();
    res.status(201).json({ user: { id: newUser._id, username, email } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
});


// GET User Profile
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST (Create New User)
//router.post("/", async (req, res) => {
  //try {
    //const newUser = new User(req.body);
    //await newUser.save();
    //res.status(201).json(newUser);
  //} catch (error) {
   // res.status(500).json({ message: error.message });
  //}
//});

export default router;
