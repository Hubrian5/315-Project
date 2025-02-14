import { Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./ProfilePage"; // Import your ProfilePage component
import Thread from "./Thread"; 

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/profile">Profile Page</Link> | <Link to="/thread">Thread</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/thread" element={<Thread />} /> {/* Add your Thread component */}
      </Routes>
    </div>
  );
}

export default App;
