import { Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./ProfilePage.jsx"; // Import your ProfilePage component

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/profile">Profile Page</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;

