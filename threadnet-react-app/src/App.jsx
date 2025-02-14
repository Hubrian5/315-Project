import { Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./ProfilePage"; // Import your ProfilePage component
import Thread from "./Thread";
import HomePage from "./homepage";

function App() {
  return (
    <div>
      <nav>
        <Link to="/homepage">Home</Link> | <Link to="/profile">Profile Page</Link> | <Link to="/thread">Thread</Link>
      </nav>

      <h1>Welcome to the homepage</h1>
      <Routes>
        <Route path="/homepage" element={<HomePage />}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/thread" element={<Thread />} /> {/* Add your Thread component */}
      </Routes>
    </div>
  );
}

export default App;
