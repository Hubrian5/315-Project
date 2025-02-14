// Forgot Password DTO
class ForgotPasswordDTO {
    constructor(email) {
        this.email = email;
    }
}

// Sign-up DTO
class SignUpDTO {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

// Login DTO
class LoginDTO {
    constructor(email, password, rememberMe = false) {
        this.email = email;
        this.password = password;
        this.rememberMe = rememberMe;
    }
}

// Ensure event listener is attached after the page loads
document.addEventListener("DOMContentLoaded", function () {
    
    // Handle Forgot Password Form
    const forgotPasswordForm = document.getElementById("fpword-form"); // ✅ Corrected
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page reload

            const email = document.getElementById("forgot-email").value;
            const forgotPasswordDTO = new ForgotPasswordDTO(email);

            console.log("Forgot Password DTO:", forgotPasswordDTO);

        
        });
    }

    // Handle Sign-up Form
    const signupForm = document.getElementById("signup-form"); // ✅ Corrected
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("signup-username").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            const signUpDTO = new SignUpDTO(username, email, password);

            console.log("Sign Up DTO:", signUpDTO);

        });
    }

    // Handle Login Form
    const loginForm = document.getElementById("login-form"); // ✅ Corrected
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
            const rememberMe = document.getElementById("remember-me")?.checked || false;

            const loginDTO = new LoginDTO(email, password, rememberMe);

            console.log("Login DTO:", loginDTO);

        });
    }
});
