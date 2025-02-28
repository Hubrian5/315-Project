// mockAuthService.js

// Centralized function to store and retrieve mock users
const getMockUsers = () => [
    { username: "testuser", email: "test@example.com", password: "password123" },
    { username: "user1", email: "user@example.com", password: "securepass" }
];

// Validate login credentials
export const validateLogin = (credentials) => {
    if (!credentials.email.includes("@")) {
        return { success: false, message: "Invalid email format" };
    }
    if (credentials.password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
    }
    return { success: true };
};

// Authenticate login attempt using mock users
export const authenticateUser = (credentials) => {
    const mockUsers = getMockUsers(); // Retrieve mock users

    const user = mockUsers.find(user => 
        user.email === credentials.email && user.password === credentials.password
    );

    return user
        ? { success: true, message: "Login successful!" }
        : { success: false, message: "Invalid email or password" };
};

// Validate sign-up data
export const validateSignUp = (signUpData) => {
    if (!signUpData.email.includes("@")) {
        return { success: false, message: "Invalid email format" };
    }
    if (signUpData.password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
    }
    if (signUpData.username.length < 3) {
        return { success: false, message: "Username must be at least 3 characters" };
    }
    return { success: true };
};

// Authenticate sign-up (Check if email is already registered)
export const authenticateSignUp = (signUpData) => {
    const mockUsers = getMockUsers(); // Retrieve mock users

    const existingUser = mockUsers.find(user => user.email === signUpData.email);
    if (existingUser) {
        return { success: false, message: "Email already registered" };
    }

    return { success: true, message: "Sign-up successful!" };
};

// Validate forgot password request
export const validateForgotPassword = (email) => {
    if (!email.includes("@")) {
        return { success: false, message: "Invalid email format" };
    }
    return { success: true, message: "Password reset email sent successfully!" };
};
