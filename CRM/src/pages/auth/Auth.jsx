import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authServices";
import axiosConfig from "../../services/axiosConfig";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";


const Auth = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => setIsLogin(!isLogin);

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser({ email, password });
    console.log("LOGIN RESPONSE:", res);

    if (res?.success) {
      toast.success("Login success");

      await fetchUser(); // hydrate AuthContext state

      // use login response role_id directly — most reliable
      if (res.user?.is_super_admin || res.user?.role_id === 1) {
        navigate("/members");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      toast.error(res?.message || "Login failed");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
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