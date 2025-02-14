import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./homepage.css";

const Navbar = () => {
  const navItems = Array(12).fill("Thread");

  return (
    <div className="navbar">
      {navItems.map((item, index) => (
        <Link to="/thread" key={index}> {/* Use Link for navigation */}
          {item}
        </Link>
      ))}
    </div>
  );
};

const Topic = ({ title, description, threadCount, commentCount, lastPosted }) => (
  <div className="topics">
    <div className="topic">
      <Link to="/thread"> {/* Use Link for navigation */}
        <h4>{title}</h4>
      </Link>
      <p>{description}</p>
    </div>
    <div className="topic">{threadCount}</div>
    <div className="topic">{commentCount}</div>
    <div className="topic">{lastPosted}</div>
  </div>
);

const SideSection = () => (
  <div className="side-section">
    <h3>Trending threads</h3>
    <div className="separator"></div>
    <h4>What's your 'lazy but delicious' meal for when you don't feel like cooking?</h4>
    <p>
      Sometimes I want something tasty but don't have the energy for a full meal. What's your go-to
      easy but satisfying dish?
    </p>
    <div className="separator"></div>
    <h4>Sellen is an amoral monster and her quest ending in her [spoilers omitted for title] proves it</h4>
    <p>View Spoiler</p>
    <div className="separator"></div>
    <h4>1.5% USD FX fee each way, can someone explain why it's calculated this way with the exchange rate?</h4>
    <p>
      So I looked up FX fee for buying USD stocks, and they say the 1.5% fee is combined with the
      exchange rate in order to get a single exchange rate that includes the fee, rather than
      separating into 2 line items...
    </p>
  </div>
);

const HomePage = () => (
  <div>
    <header className="header">
      <div className="logo">
        <Link to="/homepage">ThreadNet</Link> {/* Use Link for navigation */}
      </div>
      <div className="auth-buttons">
        <Link to="/profile" id="myaccount"> {/* Use Link for navigation */}
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
        <Topic
          title="General"
          description="Drop in to say hi! or ask about general rules"
          threadCount="1334"
          commentCount="642"
          lastPosted="4hrs ago"
        />
        <Topic
          title="Homework Help"
          description="Get help from your peers with any questions!"
          threadCount="145"
          commentCount="322"
          lastPosted="1hr ago"
        />
        <Topic
          title="Chat room"
          description="Talk to someone"
          threadCount="1242"
          commentCount="4412423"
          lastPosted="12hrs ago"
        />
        <Topic
          title="Programming tips and tricks"
          description="Share your favorite tips and tricks!"
          threadCount="1235"
          commentCount="421"
          lastPosted="a month ago"
        />
        <Topic
          title="Rant"
          description="Any thoughts come to your head?"
          threadCount="123412"
          commentCount="3"
          lastPosted="2 years ago"
        />
        <Topic
          title="Recommendations"
          description="Any recommendations and/or complaints should be directed to here"
          threadCount="82635"
          commentCount="0"
          lastPosted=""
        />
      </div>
      <SideSection />
    </div>
  </div>
);

export default HomePage;