import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Tickets from "../pages/Tickets/Tickets";
import Analytics from "../pages/Analytics/Analytics";
import ChatbotSettings from "../pages/Settings/ChatbotSettings";
import TeamManagement from "../pages/Team/TeamManagement";
import AccountSettings from "../pages/Account/AccountSettings";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import useAuth from "../hooks/useAuth";

const AppRouter = () => {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />

      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/dashboard" />}
      />

      <Route
        path="/signup"
        element={!token ? <Signup /> : <Navigate to="/dashboard" />}
      />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />

      <Route
        path="/tickets"
        element={<ProtectedRoute><Tickets /></ProtectedRoute>}
      />

      <Route
        path="/analytics"
        element={<ProtectedRoute><Analytics /></ProtectedRoute>}
      />

      {/* 🔐 Admin-only */}
      <Route
        path="/settings"
        element={<AdminRoute><ChatbotSettings /></AdminRoute>}
      />

      <Route
        path="/team"
        element={<AdminRoute><TeamManagement /></AdminRoute>}
      />

      {/* Profile for all users */}
      <Route
        path="/account"
        element={<ProtectedRoute><AccountSettings /></ProtectedRoute>}
      />

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
