import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // const[userData,setUserData]=useState({
  //   name:"",
  //   email:"",
  //   password:"",
  //   orgName:""
  // })

  const toggle = () => setIsLogin(!isLogin);


  // const userRegister=async()=>{
  //   try {

      
  //   } catch (error) {
  //     console.log(error)
  //     toast.error('Something went wronng while registering User')
  //   }
  // }

  return (
    <div
      className="min-h-screen bg-[#070a12] flex items-center justify-center px-4 py-10"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <div className="relative w-full max-w-[820px] min-h-[520px] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] bg-[#0d1117]">

        {/* LOGIN */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center px-11 py-12 transition-all duration-700"
          style={{
            opacity: isLogin ? 1 : 0,
            transform: isLogin ? "translateX(0)" : "translateX(-20px)",
            pointerEvents: isLogin ? "auto" : "none",
            zIndex: 1,
          }}
        >
          <h2 className="text-[22px] font-black text-white tracking-tight mb-1.5">
            Access your workspace
          </h2>

          <p className="text-[12px] text-white/25 font-light mb-6">
            Continue managing your organizations and system data
          </p>

          <div className="flex gap-2.5 mb-5">
            {["G", "f", "in"].map((s, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-[10px] bg-white/[0.03] border border-white/[0.08] text-white/40 text-sm font-bold transition-all hover:border-[#2176ff]/40 hover:text-[#2176ff]"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-[11px] text-white/20 font-light">
              or use your email
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          {[
            { placeholder: "Email address", type: "email" },
            { placeholder: "Password", type: "password" },
          ].map((f, i) => (
            <div key={i} className="relative mb-3">
              <input
                type={
                  f.type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : f.type
                }
                placeholder={f.placeholder}
                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-[10px] pl-4 pr-10 py-3 text-[13px] text-white placeholder:text-white/15 outline-none transition-all focus:border-[#2176ff]/45 focus:bg-[#2176ff]/[0.03]"
              />

              {f.type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#2176ff] transition cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
          ))}

          <div className="text-right text-[11px] text-[#2176ff] font-semibold cursor-pointer mb-5 hover:text-blue-400 transition-colors">
            Reset access
          </div>

          <button className="w-full bg-[#2176ff] text-white py-3.5 rounded-full text-[13.5px] font-bold transition-all hover:bg-[#1a60e0] shadow-[0_0_24px_rgba(33,118,255,0.25)]">
            Continue →
          </button>
        </div>

        {/* REGISTER */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center px-11 py-12 transition-all duration-700"
          style={{
            opacity: isLogin ? 0 : 1,
            transform: isLogin ? "translateX(20px)" : "translateX(0)",
            pointerEvents: isLogin ? "none" : "auto",
            zIndex: 1,
          }}
        >
          <h2 className="text-[22px] font-black text-white tracking-tight mb-1.5">
            Create your workspace
          </h2>

          <p className="text-[12px] text-white/25 font-light mb-6">
            Set up your organization and start managing users and workflows
          </p>

          <div className="flex gap-2.5 mb-5">
            {["G", "f", "in"].map((s, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-[10px] bg-white/[0.03] border border-white/[0.08] text-white/40 text-sm font-bold transition-all hover:border-[#2176ff]/40 hover:text-[#2176ff]"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-[11px] text-white/20 font-light">
              or use your email
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          {[
            { placeholder: "Full name", type: "text" },
            { placeholder: "Email address", type: "email" },
            { placeholder: "Password", type: "password" },
            { placeholder: "Organization name", type: "text" },
          ].map((f, i) => (
            <div key={i} className="relative mb-3">
              <input
                type={
                  f.type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : f.type
                }
                placeholder={f.placeholder}
                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-[10px] pl-4 pr-10 py-3 text-[13px] text-white placeholder:text-white/15 outline-none transition-all focus:border-[#2176ff]/45 focus:bg-[#2176ff]/[0.03]"
              />

              {f.type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#2176ff] transition cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
          ))}

          <button className="w-full bg-[#2176ff] text-white py-3.5 rounded-full text-[13.5px] font-bold mt-2 transition-all hover:bg-[#1a60e0] shadow-[0_0_24px_rgba(33,118,255,0.25)]">
            Create Workspace →
          </button>
        </div>

        {/* PANEL */}
        <div
          className="absolute top-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-11 py-12 transition-all duration-700"
          style={{
            background:
              "linear-gradient(135deg, #1a50e0 0%, #2176ff 50%, #1040c0 100%)",
            left: isLogin ? "50%" : "0%",
            zIndex: 10,
            borderRadius: isLogin ? "0 24px 24px 0" : "24px 0 0 24px",
          }}
        >
          <div className="text-lg font-black text-white mb-8">HELIX</div>

          <h3 className="text-[26px] font-black text-white mb-3">
            {isLogin ? "Start building with Helix" : "Continue your workflow"}
          </h3>

          <p className="text-[13px] text-white/70 max-w-[240px] mb-8">
            {isLogin
              ? "Create your account to manage organizations, users, and workflows in one system."
              : "Sign in to access your workspace and continue managing your system."}
          </p>

          <button
            onClick={toggle}
            className="border border-white/50 px-8 py-2.5 rounded-full text-[13px] font-bold hover:bg-white/10 transition"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Auth;
