

export class UserProfileDTO { 
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

export class CoursesDTO {
    constructor(courseName, courseStatus) {
        this.courseName = courseName;
        this.courseStatus = courseStatus;
    }
}
