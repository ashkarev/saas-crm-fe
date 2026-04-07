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

  // role check — bypass for super admins
  if (role && !user.is_super_admin && user.role_id !== role) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;