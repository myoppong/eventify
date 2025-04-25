// components/requireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { getUserFromToken } from "../utils/authHelpers";

export default function RequireAuth({ children, requiredRole = "organizer" }) {
  const location = useLocation();
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
