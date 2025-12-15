import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user?.role === "Admin" 
    ? children 
    : <Navigate to="/dashboard" replace />;
}
