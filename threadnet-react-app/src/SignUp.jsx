import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpDTO } from "./AuthDTO";
import { validateSignUp, authenticateSignUp } from "./mockAuthService"; // Import mock services
import styles from "./Onboarding-styles.module.css";
import axios from "axios";

function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const signUpData = new SignUpDTO(userData.username, userData.email, userData.password);
  
    const validation = validateSignUp(signUpData);
    if (!validation.success) {
      setError(validation.message);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", signUpData);
  
      if (response.data.success) {
        console.log("Signed up:", response.data.user);
        alert("Signup successful!");
        navigate("/homepage");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed");
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

          <button type="submit" className={styles["login-btn"]}>Sign up</button>

          <p className={styles["register-text"]}>
            Already have an account?{" "}
            <button className={styles["link-button"]} onClick={() => navigate("/sign-in")}>Log in</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
