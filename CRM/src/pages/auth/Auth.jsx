import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authServices";
import axiosConfig from "../../services/axiosConfig";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";


const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      if (res?.success) {
        await fetchUser(); // Ensure hydration
        
        const user = res.user;
        if (user.is_super_admin || user.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        console.log("Login failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
};

export default Auth;