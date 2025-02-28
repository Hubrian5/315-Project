import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordDTO } from "./AuthDTO";
import { validateForgotPassword } from "./mockAuthService"; // Import mock validation
import styles from "./Onboarding-styles.module.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create DTO object
    const forgotPasswordData = new ForgotPasswordDTO(email);

    // Validate email before sending request
    const validation = validateForgotPassword(forgotPasswordData.email);
    if (!validation.success) {
      setMessage(validation.message);
      return;
    }

    console.log("Reset password request for:", forgotPasswordData);
    alert(validation.message); // Mock success message
  };

  return (
    <div className={styles["onboarding-container"]}>
      <header className={styles["onboarding-header"]}>
        <div className={styles["banner"]} onClick={() => navigate("/")}>ThreadNet</div>
      </header>

      <div className={styles["form-container"]}>
        <h2>Forgot Password?</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="forgot-email">Email Address</label>
          <input
            type="email"
            id="forgot-email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={handleChange}
          />

          {message && <p style={{ color: message.includes("Invalid") ? "red" : "green" }}>{message}</p>}

          <button type="submit" className={styles["reset-btn"]}>Reset Password</button>

          <p className={styles["register-text"]}>
            Remembered your password?{" "}
            <button className={styles["link-button"]} onClick={() => navigate("/sign-in")}>Log in</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
