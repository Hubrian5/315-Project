import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import styles from "./Onboarding-styles.module.css";

function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // use login from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      login(data.user); // same as SignIn
      navigate("/sign-in");
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
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your name"
            required
            value={userData.username}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={userData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={userData.password}
            onChange={handleChange}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button 
            type="submit" 
            className={styles["login-btn"]}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          <p className={styles["register-text"]}>
            Already have an account?{" "}
            <button 
              type="button"
              className={styles["link-button"]} 
              onClick={() => navigate("/sign-in")}
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
