import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import HomePage from "./page/HomePage";
import SignUpPage from "./page/SignUpPage";
import LoginPage from "./page/LoginPage";
import SettingsPage from "./page/SettingsPage";
import ProfilePage from "./page/ProfilePage";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
