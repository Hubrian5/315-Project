import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Onboarding-styles.module.css";

function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with:", userData);
    navigate("/");
  };

  return (
    <div className={styles["onboarding-container"]}> {/* Scoped wrapper */}
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
