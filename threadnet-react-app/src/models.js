import mongoose from "mongoose";

// Define Topic Schema
const TopicSchema = new mongoose.Schema({
  title: String,
  description: String,
  threadCount: Number,
  commentCount: Number,
  lastPosted: String,
});

const Topic = mongoose.model("Topic", TopicSchema);

// Define SideSection Schema
const SideSectionSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const SideSection = mongoose.model("SideSection", SideSectionSchema);

export { Topic, SideSection };
