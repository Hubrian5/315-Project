import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // Route for ProfilePage API

dotenv.config();

const app = express();
app.use(express.json()); // Allows JSON data
app.use(cors()); // Allows React to access the backend
// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
console.log("MONGO_URI from env:", process.env.MONGO_URI);


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
