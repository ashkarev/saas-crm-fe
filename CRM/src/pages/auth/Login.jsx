import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(email);
  };

  // redirect after login
  if (user) {
    if (user.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/user");
    }
  }

  return (
    <div  className="text-white">
      <h1>Login</h1>

      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}