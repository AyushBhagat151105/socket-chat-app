import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./page/HomePage";
import SignUpPage from "./page/SignUpPage";
import LoginPage from "./page/LoginPage";
import SettingsPage from "./page/SettingsPage";
import ProfilePage from "./page/ProfilePage";
import { useAuthStore } from "./store/useAuth.store";
import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThene.store";

function App() {
  const { authUser, checkAuth, isChecking, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, []);

  if (isChecking && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CgSpinner className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
