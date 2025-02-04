

class UserProfileDTO { 
    constructor(username, password, email, recoveryEmail, dateJoined, numThreadsPosted, numReplies, aboutMe) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.recoveryEmail = recoveryEmail;
        this.dateJoined = dateJoined;
        this.numThreadsPosted = numThreadsPosted;
        this.numReplies = numReplies;
        this.aboutMe = aboutMe;
    }
}

class CoursesDTO {
    constructor(entryID, courseName, courseStatus) {
        this.entryID = entryID;
        this.courseName = courseName;
        this.courseStatus = courseStatus;
    }
}

let backendResponse = {
    //backendResponse: responisble for retrieving and holding onto values display on the webpage. Communicates with web page and database 

    userProfile: {
        username: "JohnDoe",
        password: "jDoe443%",
        email: "JohnDoe@example.jeez",
        recoveryEmail: "JohnD.backup@example.what",
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

const userProfileDTO = new UserProfileDTO (
    // creates a DTO object
    backendResponse.userProfile.username,
    backendResponse.userProfile.password,
    backendResponse.userProfile.email,
    backendResponse.userProfile.recoveryEmail,
    backendResponse.userProfile.dateJoined,
    backendResponse.userProfile.numThreadsPosted,
    backendResponse.userProfile.numReplies,
    backendResponse.userProfile.aboutMe
);

const courseDTO = backendResponse.courses.map(
    // creates a DTO object
    course => new CoursesDTO(course.entryID, course.courseName, course.courseStatus)
);

function populateUserProfile(userProfileDTO) {
    // populates web page with what ProfilePage.js knows the current contents of a given data entry is 
    document.querySelector("#username-div h2").textContent = `#${userProfileDTO.username}`;
    document.querySelector("#username-div input[type='password']").value = userProfileDTO.password;
    document.querySelector("#email-input").value = userProfileDTO.email;
    document.querySelector("#recovery-email-input").value = userProfileDTO.recoveryEmail;
    document.querySelector("#date-joined-div h2").textContent = `Date Joined: ${userProfileDTO.dateJoined}`;
    document.querySelector("#number-of-threads-posted h2").textContent = `# of Threads posted: ${userProfileDTO.numThreadsPosted} | # of replies: ${userProfileDTO.numReplies}`;
    document.querySelector("#about-me-content").textContent = `Wow ${userProfileDTO.aboutMe}`;
}

function populateOngoingCourses(courseDTO) {
    // populates web page with what ProfilePage.js knows the current contents of a given data entry is 
    let ongoingCoursesList = document.querySelector("#ongoing-courses-scrollable-list ul");

    //Clear the existing list
    ongoingCoursesList.innerHTML = "";

    // Filter courses with status 'ongoing'
    let ongoingCourses = courseDTO.filter(course => course.courseStatus == "ongoing");

    // Populate the list with ongoing courses
    ongoingCourses.forEach(course => {
        let listItem = document.createElement("li");
        listItem.textContent = course.courseName;
        ongoingCoursesList.appendChild(listItem);
    });
}

function populateCompletedCourses(courseDTO) {
    // populates web page with what ProfilePage.js knows the current contents of a given data entry is 
    let completedCoursesList = document.querySelector("#completed-courses-scrollable-list ul");

    // Clear the existing list
    completedCoursesList.innerHTML = "";

    // Filter courses with status "completed"
    let completedCourses = courseDTO.filter(course => course.courseStatus === "completed");

    // Populate the list with completed courses
    completedCourses.forEach(course => {
        let listItem = document.createElement("li");
        listItem.textContent = course.courseName;
        completedCoursesList.appendChild(listItem);
    });
}

// Populate the page with DTO data
populateUserProfile(userProfileDTO);
populateOngoingCourses(courseDTO); 
populateCompletedCourses(courseDTO);

document.getElementById("edit-button").addEventListener("click", () => {
    // Allows input fields (password, email, recovery email) to be editable 
    const inputs = document.querySelectorAll("#username-div input");
    inputs.forEach(input => input.removeAttribute("readonly"));
});

document.getElementById("save-button").addEventListener("click", () => {
    // updates changes made to user data. Not functional until connected to the database
    let updatedPassword = document.querySelector("#password-input");
    let updatedEmail = document.querySelector("#email-input");
    let updatedRecoveryEmail = document.querySelector("#recovery-email-input");

    // Remove readonly before updating
    updatedPassword.removeAttribute("readonly");
    updatedEmail.removeAttribute("readonly");
    updatedRecoveryEmail.removeAttribute("readonly");

    backendResponse.userProfile.password = updatedPassword.value.trim();
    backendResponse.userProfile.email = updatedEmail.value.trim();
    backendResponse.userProfile.recoveryEmail = updatedRecoveryEmail.value.trim();

    userProfileDTO.password = backendResponse.userProfile.password;
    userProfileDTO.email = backendResponse.userProfile.email;
    userProfileDTO.recoveryEmail = backendResponse.userProfile.recoveryEmail;

    updatedPassword.setAttribute("readonly", true);
    updatedEmail.setAttribute("readonly", true);
    updatedRecoveryEmail.setAttribute("readonly", true);

    populateUserProfile(userProfileDTO);

    alert("Changes saved!");
});

document.getElementById("add-button").addEventListener("click", () => {
    // updates changes made to user data. Not functional until connected to the database
    const courseName = document.querySelector("#ongoing-buttons-div input").value;
    if (courseName) {
        const newCourse = new CourseDTO(Date.now(), courseName, "ongoing");
        courseDTO.push(newCourse);
        populateCourses(courseDTOs);
    }
});


