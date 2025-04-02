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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    // Create DTO object
    const forgotPasswordData = new ForgotPasswordDTO(email);
  
    // Validate email before sending request
    const validation = validateForgotPassword(forgotPasswordData.email);
    if (!validation.success) {
      setMessage(validation.message);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      setMessage(data.message); // Success message
    } catch (err) {
      setMessage(err.message); // Error message
    }
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
