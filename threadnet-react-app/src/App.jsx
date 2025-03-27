import { Routes, Route } from "react-router-dom";
import Thread from "./thread.jsx";
import HomePage from "./homepage";
import ProfilePage from "./ProfilePage.jsx"; // Import your ProfilePage component
import SignIn from "./SignIn";  // Login page
import SignUp from "./SignUp"; 
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/threads/topic/:topicTitle" element={<Thread />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/sign-in" element={<SignIn />} />  {/* Login Route */}
        <Route path="/sign-up" element={<SignUp />} />  {/* Signup Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Forgot Password Route */}
        <Route path="/" element={<SignIn />} /> {/* Default route */}
      </Routes>
    </div>
  );
}

export default App;