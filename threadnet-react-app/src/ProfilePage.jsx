import { useState } from "react";
import "./ThreadNet-ProfilePage-Styling.css";

function ProfilePage() {
  const [aboutMe, setAboutMe] = useState("");
  const [email, setEmail] = useState("John.doe@example.com");
  const [recoveryEmail, setRecoveryEmail] = useState("JohnD.backup@example.com");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <header id="profile-page-header" className="header">
        <a href="homepage.html" id="threadnet-text">
          <div className="banner">ThreadNet</div>
        </a>
        <a href="homepage.html" id="myProfile-text">
          <div className="logout">Logout</div>
        </a>
      </header>

      <main id="page-body" className="body">
        <section id="top-section" className="section">
          <div id="pfp-div" className="div">
            <div id="img-div" className="div">
              <img src="apple.jpg" alt="profile" id="profile-image" className="image" />
            </div>

            <div>
              <div id="date-joined-div" className="div">
                <h2>Date Joined: 2025-01-30</h2>
              </div>

              <div id="number-of-threads-posted" className="div">
                <h2># of Threads posted: 13 | # of replies: 21</h2>
              </div>
            </div>

            <div id="about-me-div" className="div">
              <h2 id="about-me-text">About Me</h2>
              <textarea
                id="about-me-textarea"
                maxLength="600"
                className="textarea"
                placeholder="Write something about yourself..."
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                readOnly={!isEditing}
              ></textarea>
            </div>
          </div>
          
          <div id="username-div" className="div">
            <h2>#USERNAME</h2>
            <label>Password</label>
            <input id="password-input" type="password" value="*************" className="input" readOnly />
            
            <label>Email</label>
            <input id="email-input" type="text" className="input" value={email} readOnly={!isEditing} onChange={(e) => setEmail(e.target.value)} />
            
            <label>Recovery Email</label>
            <input id="recovery-email-input" type="text" className="input" value={recoveryEmail} readOnly={!isEditing} onChange={(e) => setRecoveryEmail(e.target.value)} />
            
            <button id="edit-button" className="button" onClick={handleEdit}>Edit</button>
            <button id="save-button" className="button" onClick={handleSave}>Save</button>
          </div>
        </section>

        <section id="bottom-section" className="section">
          <div className="courses-div">
            <h2 className="courses-header">Ongoing Courses</h2>
            <div id="ongoing-courses-scrollable-list" className="scrollable-list">
              <ul></ul>
            </div>
            <div id="ongoing-buttons-div">
              <button id="remove-button" className="button2">Remove Selected Course</button>
              <button id="completed-button" className="button2">Mark Selected Course as Complete</button>
            </div>
            <div id="ongoing-buttons-div">
              <input id="ongoing-courses-input" type="text" className="input" value="John.doe@example.com" readOnly />
              <button id="add-button" className="button2">Add Course</button>
            </div>
          </div>
          <br /><br />
          <div className="courses-div">
            <h2 className="courses-header">Completed Courses</h2>
            <div id="completed-courses-scrollable-list" className="scrollable-list">
              <ul></ul>
            </div>
            <div id="ongoing-buttons-div">
              <button id="remove-button" className="button2">Remove Selected Course</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
