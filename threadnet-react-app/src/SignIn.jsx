import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Onboarding-styles.module.css";
import { SignInDTO } from "./AuthDTO";  // Import DTO

function SignIn() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use DTO to structure login data
    const loginData = new SignInDTO(credentials.email, credentials.password);

    console.log("Logging in with:", loginData); // This logs the structured DTO object

    navigate("/homepage"); // Redirect to homepage
  };

  return (
    <div className={styles["onboarding-container"]}>
      <header className={styles["onboarding-header"]}>
        <div className={styles["banner"]} onClick={() => navigate("/")}>
          ThreadNet
        </div>
      </header>

      <div className={styles["form-container"]}>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
            value={credentials.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            value={credentials.password}
            onChange={handleChange}
          />

          <button type="submit" className={styles["login-btn"]}>
            Log in
          </button>

          <p className={styles["forgot-link"]}>
            <button className={styles["link-button"]} onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </button>
          </p>

          <p className={styles["register-text"]}>
            Don't have an account?{" "}
            <button className={styles["link-button"]} onClick={() => navigate("/sign-up")}>
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
