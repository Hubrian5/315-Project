// src/dto/AuthDTO.js

// DTO for Sign In
export class SignInDTO {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
}

// DTO for Forgot Password
export class ForgotPasswordDTO {
    constructor(email) {
      this.email = email;
    }
}

// DTO for Sign Up
export class SignUpDTO {
    constructor(username, email, password) {
      this.username = username;
      this.email = email;
      this.password = password;
    }
}
