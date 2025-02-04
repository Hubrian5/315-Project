

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
    course => new CoursesDTO(course.entryID, course.courseName, course.courseStatus)
);

function populateUserProfile(userProfileDTO) {
    document.querySelector("#username-div h2").textContent = `#${userProfileDTO.username}`;
    document.querySelector("#username-div input[type='password']").value = userProfileDTO.password;
    document.querySelector("#email-input").value = userProfileDTO.email;
    document.querySelector("#recovery-email-input").value = userProfileDTO.recoveryEmail;
    document.querySelector("#date-joined-div h2").textContent = `Date Joined: ${userProfileDTO.dateJoined}`;
    document.querySelector("#number-of-threads-posted h2").textContent = `# of Threads posted: ${userProfileDTO.numThreadsPosted} | # of replies: ${userProfileDTO.numReplies}`;
    document.querySelector("#about-me-content").textContent = `Wow ${userProfileDTO.aboutMe}`;
}

function populateCompletedCourses(courseDTOs) {
    const completedCoursesList = document.querySelector("#courses-div:nth-of-type(2) .scrollable-list ul");

    // Clear the existing list
    completedCoursesList.innerHTML = "";

    // Filter courses with status "completed"
    const completedCourses = courseDTOs.filter(course => course.status === "completed");

    // Populate the list with completed courses
    completedCourses.forEach(course => {
        const listItem = document.createElement("li");
        listItem.textContent = course.name;
        completedCoursesList.appendChild(listItem);
    });
}

// Populate the page with DTO data
populateUserProfile(userProfileDTO);
populateCompletedCourses(courseDTO);

document.getElementById("edit-button").addEventListener("click", () => {
    const inputs = document.querySelectorAll("#username-div input");
    inputs.forEach(input => input.removeAttribute("readonly"));
});

// document.getElementById("save-button").addEventListener("click", () => {
//     const inputs = document.querySelectorAll("#username-div input");
//     inputs.forEach(input => input.setAttribute("readonly", true));
//     alert("Changes saved!");
// });

document.getElementById("save-button").addEventListener("click", () => {
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
    const courseName = document.querySelector("#ongoing-buttons-div input").value;
    if (courseName) {
        const newCourse = new CourseDTO(Date.now(), courseName, "ongoing");
        courseDTO.push(newCourse);
        populateCourses(courseDTOs);
    }
});


