import { useEffect, useState } from "react";
import "./ThreadNet-ProfilePage-Styling.css";
import appleImage from "./assets/apple.jpg"
import { UserProfileDTO, CoursesDTO} from "./ProfilePage.js";

let backendResponse = {
  //backendResponse: responisble for retrieving and holding onto values display on the webpage. Communicates with web page and database 

  userProfile: {
      username: "JohnDoe",
      password: "jDoe443%",
      email: "JohnDoe@example.com",
      recoveryEmail: "JohnD.backup@example.ca",
      dateJoined: "2025-01-30",
      numThreadsPosted: 15,
      numReplies: 91,
      aboutMe: "Lorem ipsum dolor sit amet, consectetur...."
  },

  courses: [
      { entryID: 1, courseName: "Introduction to Programming", courseStatus: "ongoing" },
      { entryID: 2, courseName: "Web Development Basics", courseStatus: "ongoing" },
      { entryID: 3, courseName: "Data Structures and Algorithms", courseStatus: "completed" },
      { entryID: 4, courseName: "Database Management", courseStatus: "completed" }
  ]
};

function ProfilePage() {

  const [profileData, setProfileData] = useState(null);
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newCourse, setNewCourse] = useState("");

  useEffect(() => {
    const userProfile = new UserProfileDTO(
      backendResponse.userProfile.username,
      backendResponse.userProfile.password,
      backendResponse.userProfile.email,
      backendResponse.userProfile.recoveryEmail,
      backendResponse.userProfile.dateJoined,
      backendResponse.userProfile.numThreadsPosted,
      backendResponse.userProfile.numReplies,
      backendResponse.userProfile.aboutMe
    );
  
    const coursesDTO = backendResponse.courses.map(
      (course) => new CoursesDTO(course.entryID, course.courseName, course.courseStatus)
    );
  
    setProfileData(userProfile);
    setOngoingCourses(coursesDTO.filter((course) => course.courseStatus === "ongoing"));
    setCompletedCourses(coursesDTO.filter((course) => course.courseStatus === "completed"));
  }, []);

  const handleAddCourse = () => {
    if (!newCourse.trim()) return; // Ignore empty input
  
    const allCourses = [...backendResponse.courses];
    const maxEntryID = Math.max(...allCourses.map((course) => course.entryID), 0);
    const newEntryID = maxEntryID + 1;
  
    const newCourseEntry = {
      entryID: newEntryID,
      courseName: newCourse.trim(),
      courseStatus: "ongoing",
    };
  
    backendResponse.courses.push(newCourseEntry);
  
    const newCourseDTO = new CoursesDTO(
      newEntryID,
      newCourse.trim(),
      "ongoing"
    );
    setOngoingCourses((prev) => [...prev, newCourseDTO]);
  
    // Clear input
    setNewCourse("");

    console.log("A new course has been added:", backendResponse.courses)
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    backendResponse.userProfile.password = profileData.password;
    backendResponse.userProfile.email = profileData.email;
    backendResponse.userProfile.recoveryEmail = profileData.recoveryEmail;
    backendResponse.userProfile.aboutMe = profileData.aboutMe;

    console.log("Saved Data: ", backendResponse.userProfile);
  };

  if (!profileData) {
    return <div>Loading...</div>; // Render a loading state while data is being initialized
  }

  return (
    <div>
      <header id="profile-page-header" className="header">
        <a href="homepage" id="threadnet-text">
          <div className="banner">
          {/* <Link to="/homepage">ThreadNet</Link> Use Link for navigation */}
            ThreadNet</div>
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
            <h2 className="black-text" placeholder="#USERNAME">{profileData.username}</h2>
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
                    <li className="black-text" key={course.entryID}>{course.courseName}</li>
                ))}
              </ul>
            </div>
            <div id="ongoing-buttons-div">
              <button id="remove-button" className="button2">Remove Selected Course</button>
              <button id="completed-button" className="button2">Mark Selected Course as Complete</button>
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
                  <li className="black-text" key={course.entryID}>{course.courseName}</li>
                ))}
              </ul>
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
