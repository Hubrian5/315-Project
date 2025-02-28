import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import TopicDTO from "./TopicDTO"; // Import Topic DTO
import SideSectionDTO from "./SideSectionDTO"; // Import SideSection DTO
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

function SideSection() {
  return (
    <div className="side-section">
      <h3>Trending threads</h3>
      <div className="separator"></div>
      {SideSectionDTO.map((thread, index) => (
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
          {TopicDTO.map((topic, index) => (
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
        <SideSection />
      </div>
    </div>
  );
}

export default HomePage;
