import { Routes, Route } from "react-router-dom";
import Thread from "./Thread";
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
        <Route path="/thread" element={<Thread />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/sign-in" element={<SignIn />} />  {/* Login Route */}
        <Route path="/sign-up" element={<SignUp />} />  {/* Signup Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Forgot Password Route */}
        <Route path="/" element={<HomePage />} /> {/* Default route */}
      </Routes>
    </div>
  );
}

export default App;