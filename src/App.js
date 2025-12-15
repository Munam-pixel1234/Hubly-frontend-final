import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

// Private
import Dashboard from "./pages/Dashboard/Dashboard";
import Tickets from "./pages/Tickets/Tickets";
import Analytics from "./pages/Analytics/Analytics";
import ChatbotSettings from "./pages/Settings/ChatbotSettings";
import TeamManagement from "./pages/Team/TeamManagement";
import AccountSettings from "./pages/Account/AccountSettings";

import AuthRoute from "./components/AuthRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ---- PROTECTED ROUTES ---- */}
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <AuthRoute>
              <Tickets />
            </AuthRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <AuthRoute>
              <Analytics />
            </AuthRoute>
          }
        />

        <Route
          path="/chatbot-settings"
          element={
            <AuthRoute>
              <ChatbotSettings />
            </AuthRoute>
          }
        />

        <Route
          path="/team"
          element={
            <AuthRoute>
              <TeamManagement />
            </AuthRoute>
          }
        />

        <Route
          path="/account-settings"
          element={
            <AuthRoute>
              <AccountSettings />
            </AuthRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
