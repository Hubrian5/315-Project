import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import TopicDTO from "./TopicDTO"; // Import Topic DTO
import SideSectionDTO from "./SideSectionDTO"; // Import SideSection DTO
import axios from "axios";
import mockDatabase from "./mockDatabase"; // Import mock database
import "./homepage.css";

function Navbar() {
  const navItems = Array(10).fill("Thread");

  return (
    <div className="navbar">
      {navItems.map((item, index) => (
        <Link to="/thread" key={index}>
          {item}
        </Link>
      ))}
    </div>
  );
}

function Topic({ title, description, threadCount, commentCount, lastPosted }) {
  return (
    <div className="topics">
      <div className="topic">
        <Link to="/thread">
          <h4>{title}</h4>
        </Link>
        <p>{description}</p>
      </div>
      <div className="topic">{threadCount}</div>
      <div className="topic">{commentCount}</div>
      <div className="topic">{lastPosted}</div>
    </div>
  );
}

function SideSection({ sideData }) {
  return (
    <div className="side-section">
      <h3>Trending threads</h3>
      <div className="separator"></div>
      {sideData.map((thread, index) => (
        <div key={index}>
          <h4>{thread.title}</h4>
          <p>{thread.description}</p>
          <div className="separator"></div>
        </div>
      ))}
    </div>
  );
}

function HomePage() {
  const [topics, setTopics] = useState([]);
  const [sideData, setSideData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating an async request using a promise
    const fetchMockData = async () => {
      try {
        setTopics(mockDatabase.topics);
        setSideData(mockDatabase.sideSection);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchMockData();
  }, []);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Link to="/homepage">ThreadNet</Link>
        </div>
        <div className="auth-buttons">
          <Link to="/profile" id="myaccount">
            My Account
          </Link>
        </div>
      </header>
      <Navbar />
      <h2>Welcome to ThreadNet's Newest Forum</h2>
      <div className="content">
        <div className="main-section">
          <div className="table-header">
            <div>Topics</div>
            <div>Thread count</div>
            <div>Comment</div>
            <div>Last posted</div>
          </div>
          {topics.map((topic, index) => (
            <Topic
              key={index}
              title={topic.title}
              description={topic.description}
              threadCount={topic.threadCount}
              commentCount={topic.commentCount}
              lastPosted={topic.lastPosted}
            />
          ))}
        </div>
        <SideSection sideData={sideData} />
      </div>
    </div>
  );
}

export default HomePage;