import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../config/GoogleAuth.jsx";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { MdLock, MdMail, MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const {
    isLoading: googleLoading,
    error,
    isInitialized,
    signInWithGoogle,
  } = useGoogleAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleFailure = (err) => {
    console.error("Google login failed:", err);
    toast.error("Google login failed. Please try again.");
  };

  const handleGoogleSuccess = async (userData) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/googleLogin", userData);
      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));
      navigate("/chatting");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));
      navigate("/chatting");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-base-100 md:grid-cols-2">
      {/* ================= BRAND PANEL ================= */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-neutral px-12 py-12 text-neutral-content md:flex lg:px-16">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-display flex h-9 w-9 items-center justify-center rounded-field bg-primary text-lg font-semibold text-primary-content">
            द
          </span>
          <span className="font-display text-xl font-semibold">DostiHub</span>
        </Link>

        <div className="max-w-sm">
          <p className="font-display text-3xl font-medium leading-snug text-neutral-content/95 lg:text-4xl">
            &ldquo;Good to see you back — pick up right where you left
            off.&rdquo;
          </p>
        </div>

        <p className="text-xs text-neutral-content/45">
          © {new Date().getFullYear()} DostiHub. Made with ❤️ in India.
        </p>
      </section>

      {/* ================= FORM PANEL ================= */}
      <section className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="mb-10 flex items-center gap-2.5 md:hidden">
            <span className="font-display flex h-9 w-9 items-center justify-center rounded-field bg-neutral text-lg font-semibold text-primary">
              द
            </span>
            <span className="font-display text-xl font-semibold">DostiHub</span>
          </Link>

          <h1 className="font-display text-2xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-base-content/55">
            Log in to continue your conversations.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-base-content/80">
                Email address
              </span>
              <div className="flex items-center gap-2.5 rounded-field border border-base-300 bg-base-100 px-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                <MdMail className="text-lg text-base-content/35" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={loading}
                  required
                  className="h-12 w-full border-none bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            <label className="block">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-base-content/80">Password</span>
                <button
                  type="button"
                  onClick={() =>
                    toast(
                      "Password reset isn't available yet. Contact support to reset your password."
                    )
                  }
                  className="text-xs font-medium text-link hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="flex items-center gap-2.5 rounded-field border border-base-300 bg-base-100 px-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                <MdLock className="text-lg text-base-content/35" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={loading}
                  required
                  className="h-12 w-full border-none bg-transparent text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-lg text-base-content/35 hover:text-base-content/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-field bg-primary text-sm font-semibold text-primary-content shadow-sm transition-transform hover:-translate-y-px active:translate-y-0 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-base-300" />
            <span className="text-xs font-medium text-base-content/40">or</span>
            <div className="h-px flex-1 bg-base-300" />
          </div>

          {error ? (
            <button
              disabled
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-field border border-base-300 text-sm text-base-content/40"
            >
              <FcGoogle size={19} />
              {error}
            </button>
          ) : (
            <button
              onClick={() => signInWithGoogle(handleGoogleSuccess, handleGoogleFailure)}
              disabled={!isInitialized || googleLoading || loading}
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-field border border-base-300 text-sm font-medium transition hover:bg-base-200 disabled:opacity-60"
            >
              <FcGoogle size={19} />
              {googleLoading
                ? "Connecting…"
                : isInitialized
                  ? "Continue with Google"
                  : "Google unavailable"}
            </button>
          )}

          <p className="mt-8 text-center text-sm text-base-content/55">
            New to DostiHub?{" "}
            <Link to="/register" className="font-semibold text-link hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
