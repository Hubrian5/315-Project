import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin, authenticateUser } from "./mockAuthService"; // Import mock services
import styles from "./Onboarding-styles.module.css";

function SignIn() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State to store validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1: Validate input fields using mock validation service
    const validation = validateLogin(credentials);
    if (!validation.success) {
      setError(validation.message); // Display validation error
      return;
    }

    // Step 2: Authenticate user using mock authentication service
    const authResponse = authenticateUser(credentials);
    if (!authResponse.success) {
      setError(authResponse.message); // Display authentication error
      return;
    }

    // Step 3: Navigate to the homepage on successful login
    console.log("Logging in with:", credentials);
    navigate("/homepage");
  };

  return (
    <div className={styles["onboarding-container"]}>
      <header className={styles["onboarding-header"]}>
        <div className={styles["banner"]} onClick={() => navigate("/")}>ThreadNet</div>
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

          {/* Display error message if login fails */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className={styles["login-btn"]}>Log in</button>

          <p className={styles["forgot-link"]}>
            <button className={styles["link-button"]} onClick={() => navigate("/forgot-password")}>Forgot Password?</button>
          </p>

          <p className={styles["register-text"]}>
            Don't have an account?{" "}
            <button className={styles["link-button"]} onClick={() => navigate("/sign-up")}>Sign up</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
