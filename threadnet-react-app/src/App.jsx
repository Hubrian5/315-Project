import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx"; // Import the AuthProvider
import Thread from "./thread.jsx";
import HomePage from "./homepage";
import ProfilePage from "./ProfilePage.jsx";
import SignIn from "./SignIn";
import SignUp from "./SignUp"; 
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <AuthProvider> {/* */}
      <div>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/threads/topic/:topicTitle" element={<Thread />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;