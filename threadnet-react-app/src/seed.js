import dotenv from "dotenv";
import mongoose from "mongoose";
import { Topic, SideSection } from "./models.js"; // Import models correctly

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleTopics = [
  {
    title: "General",
    description: "Drop in to say hi! or ask about general rules",
    threadCount: 1334,
    commentCount: 642,
    lastPosted: "4hrs ago",
  },
  {
    title: "Homework Help",
    description: "Get help from your peers with any questions!",
    threadCount: 145,
    commentCount: 322,
    lastPosted: "1hr ago",
  },
];

const sampleSideSections = [
  {
    title: "What's your 'lazy but delicious' meal?",
    description: "Sometimes I want something tasty but don't have the energy for a full meal.",
  },
  {
    title: "Sellen is an amoral monster",
    description: "View Spoiler",
  },
];

// Function to Seed Data
const seedDB = async () => {
  try {
    await Topic.deleteMany({});
    await SideSection.deleteMany({});
    await Topic.insertMany(sampleTopics);
    await SideSection.insertMany(sampleSideSections);
    console.log("Database Seeded Successfully");
  } catch (err) {
    console.error("Error Seeding Database:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the function
seedDB();
