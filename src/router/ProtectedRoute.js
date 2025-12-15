import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return null; // or a spinner

  return token ? children : <Navigate to="/login" replace />;
}
