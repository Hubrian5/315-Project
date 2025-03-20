import { useEffect, useState } from "react";
import axios from "axios";
import "./ThreadNet-ProfilePage-Styling.css";
import appleImage from "./assets/apple.jpg";

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newCourse, setNewCourse] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const username = "JohnDoe"; // Replace with dynamic username from authentication

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${username}`);
        const userProfile = response.data;
        setProfileData(userProfile);
        setOngoingCourses(userProfile.courses.filter((course) => course.courseStatus === "Ongoing"));
        setCompletedCourses(userProfile.courses.filter((course) => course.courseStatus === "Completed"));
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, [username]);

  const handleAddCourse = async () => {
    if (!newCourse.trim()) return;

    const newEntryID = profileData.courses.length + 1;
    const newCourseEntry = {
      entryID: newEntryID,
      courseName: newCourse.trim(),
      courseStatus: "Ongoing",
    };

    try {
      const response = await axios.post(`http://localhost:5000/api/profile/${username}/courses`, newCourseEntry);
      setProfileData(response.data);
      setOngoingCourses(response.data.courses.filter((course) => course.courseStatus === "Ongoing"));
      setNewCourse("");
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await axios.put(`http://localhost:5000/api/profile/${username}`, profileData);
      setProfileData(response.data);
    } catch (error) {
      console.error("Failed to save profile data:", error);
    }
  };

  const handleMarkAsCompleted = async () => {
    if (!selectedCourse) {
      alert("Please select a course to mark as completed.");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/profile/${username}/courses/${selectedCourse.entryID}/complete`
      );
      setProfileData(response.data);
      setOngoingCourses(response.data.courses.filter((course) => course.courseStatus === "Ongoing"));
      setCompletedCourses(response.data.courses.filter((course) => course.courseStatus === "Completed"));
      setSelectedCourse(null); // Clear selection
    } catch (error) {
      console.error("Failed to mark course as completed:", error);
    }
  };
  
  const handleRemoveCourse = async () => {
    if (!selectedCourse) {
      alert("Please select a course to remove.");
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/profile/${username}/courses/${selectedCourse.entryID}`
      );
      setProfileData(response.data);
      setOngoingCourses(response.data.courses.filter((course) => course.courseStatus === "Ongoing"));
      setCompletedCourses(response.data.courses.filter((course) => course.courseStatus === "Completed"));
      setSelectedCourse(null); // Clear selection
    } catch (error) {
      console.error("Failed to remove course:", error);
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header id="profile-page-header" className="header">
        <a href="homepage" id="threadnet-text">
          <div className="banner">ThreadNet</div>
        </a>
        <a href="sign-in" id="myProfile-text">
          <div className="logout">Logout</div>
        </a>
      </header>

      <main id="page-body" className="body">
        <section id="top-section" className="section">
          <div id="pfp-div" className="div">
            <div id="img-div" className="div">
              <img src={appleImage} alt="profile" id="profile-image" className="image" />
            </div>

            <div>
              <div id="date-joined-div" className="div">
                <h2 className="black-text">Date Joined: {profileData.dateJoined}</h2>
              </div>

              <div id="number-of-threads-posted" className="div">
                <h2 className="black-text"># of Threads posted: {profileData.numThreadsPosted} | # of replies: {profileData.numReplies}</h2>
              </div>
            </div>

            <div id="about-me-div" className="div">
              <h2 id="about-me-text" className="black-text">About Me</h2>
              <textarea
                id="about-me-textarea"
                maxLength="600"
                className="textarea"
                placeholder="Write something about yourself..."
                value={profileData.aboutMe}
                onChange={(e) => setProfileData({ ...profileData, aboutMe: e.target.value })}
                readOnly={!isEditing}
              ></textarea>
            </div>
          </div>
          
          <div id="username-div" className="div">
            <h2 className="black-text">{profileData.username}</h2>
            <label className="black-text">Password</label>
            <input id="password-input"
            type="password" 
            value={profileData.password} 
            onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
            className="input" 
            readOnly={!isEditing} />
            
            <label className="black-text">Email</label>
            <input id="email-input"
            type="text" 
            className="input"
            value={profileData.email} 
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            readOnly={!isEditing} />
            
            <label className="black-text">Recovery Email</label>
            <input id="recovery-email-input"
            type="text"
            className="input"
            value={profileData.recoveryEmail} 
            onChange={(e) => setProfileData({ ...profileData, recoveryEmail: e.target.value })}
            readOnly={!isEditing}/>
            
            <button id="edit-button" className="button" onClick={handleEdit}>Edit</button>
            <button id="save-button" className="button" onClick={handleSave}>Save</button>
          </div>
        </section>

        <section id="bottom-section" className="section">
          <div className="courses-div">
            <h2 className="courses-header">Ongoing Courses</h2>
            <div id="ongoing-courses-scrollable-list" className="scrollable-list">
              <ul>
              {ongoingCourses.map((course) => (
                <li
                  className={`black-text ${selectedCourse?.entryID === course.entryID ? "selected" : ""}`}
                  key={course.entryID}
                  onClick={() => setSelectedCourse(course)}
                >
              {course.courseName}
                </li>
              ))}
              </ul>
            </div>
            <div id="ongoing-buttons-div">
              <button id="remove-button" className="button2" onClick={handleRemoveCourse}>Remove Selected Course</button>
              <button id="completed-button" className="button2" onClick={handleMarkAsCompleted}>Mark Selected Course as Complete</button>
            </div>
            <div id="ongoing-buttons-div">
              <input id="ongoing-courses-input" 
              type="text" 
              className="input" 
              onChange={(e) => setNewCourse(e.target.value)}
              placeholder="Enter a Class..."/>
              <button id="add-button" className="button2" onClick={handleAddCourse}>Add Course</button>
            </div>
          </div>
          <br /><br />
          <div className="courses-div">
            <h2 className="courses-header">Completed Courses</h2>
            <div id="completed-courses-scrollable-list" className="scrollable-list">
              <ul>
                {completedCourses.map((course) => (
                  <li
                    className={`black-text ${selectedCourse?.entryID === course.entryID ? "selected" : ""}`}
                    key={course.entryID}
                    onClick={() => setSelectedCourse(course)}
                  >
                {course.courseName}
                  </li>
                ))}
              </ul>
            </div>
            <div id="ongoing-buttons-div">
              <button id="remove-button" className="button2" onClick={handleRemoveCourse}>Remove Selected Course</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
