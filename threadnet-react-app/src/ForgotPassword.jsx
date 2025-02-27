import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Onboarding-styles.module.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password request for:", email);
  };

  return (
    <div className={styles["onboarding-container"]}> {/* Same wrapper as SignIn */}
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
