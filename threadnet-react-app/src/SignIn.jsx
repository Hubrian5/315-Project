import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import styles from "./Onboarding-styles.module.css";

function SignIn() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.user);
      navigate("/homepage");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button 
            type="submit" 
            className={styles["login-btn"]}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className={styles["forgot-link"]}>
            <button 
              type="button"
              className={styles["link-button"]} 
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </p>

          <p className={styles["register-text"]}>
            Don't have an account?{" "}
            <button 
              type="button"
              className={styles["link-button"]} 
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;