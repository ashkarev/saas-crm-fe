import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { user,loading } = useAuth();




  if(loading){
    return <div>Loading</div>
  }

  // not logged in
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/auth" />;
  }

  return children;
}