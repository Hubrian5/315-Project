import { Routes, Route } from "react-router-dom";
import Thread from "./Thread";
import HomePage from "./homepage";
import ProfilePage from "./ProfilePage.jsx"; // Import your ProfilePage component

function App() {
  return (
    <div>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/thread" element={<Thread />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} /> {/* Default route */}
      </Routes>
    </div>
  );
}

export default App;