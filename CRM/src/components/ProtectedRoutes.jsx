import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  //   wait until fetchUser finishes
  if (loading) return null;

  // not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // role check (optional)
  if (role === "admin" && user?.role_name?.toLowerCase() !== "admin" && !user?.is_super_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;