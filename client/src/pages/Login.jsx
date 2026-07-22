
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../config/GoogleAuth.jsx";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import {
  MdLock,
  MdMail,
  MdOutlineArrowOutward,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { RiChatSmile3Line } from "react-icons/ri";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const {
    isLoading: googleLoading,
    error,
    isInitialized,
    signInWithGoogle,
  } = useGoogleAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  const handleGoogleSuccess = async (userData) => {
    setLoading(true);

    try {
      const res = await api.post("/auth/googleLogin", userData);

      toast.success(res.data.message);

      setUser(res.data.data);
      sessionStorage.setItem(
        "AppUser",
        JSON.stringify(res.data.data)
      );

      navigate("/chatting");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signInWithGoogle(
      handleGoogleSuccess,
      handleGoogleFailure
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post(
        "/auth/login",
        formData
      );

      toast.success(res.data.message);

      setUser(res.data.data);

      sessionStorage.setItem(
        "AppUser",
        JSON.stringify(res.data.data)
      );

      handleClearForm();

      navigate("/chatting");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-base-200">

      {/* Background */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-10">

        {/* ================= BRAND SIDE ================= */}
        <section className="hidden lg:block">

          <div className="max-w-xl">

            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl font-black text-primary-content shadow-lg">
                D
              </div>

              <div>
                <h1 className="text-2xl font-black">
                  Dosti<span className="text-primary">Hub</span>
                </h1>

                <p className="text-xs text-base-content/50">
                  Connect. Chat. Belong.
                </p>
              </div>
            </Link>

            {/* Heading */}
            <h2 className="mt-16 text-5xl font-black leading-tight xl:text-6xl">
              Welcome back.
              <span className="block text-primary">
                Your conversations are waiting.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-base-content/65">
              Sign in to continue your conversations, connect with your
              people, and stay close to the moments that matter.
            </p>

            {/* Chat Preview */}
            <div className="mt-10 max-w-md rounded-3xl border border-base-300 bg-base-100 p-4 shadow-xl">

              <div className="flex items-center gap-3 border-b border-base-300 pb-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-content">
                  <RiChatSmile3Line size={20} />
                </div>

                <div>
                  <p className="font-bold">
                    DostiHub Chat
                  </p>

                  <p className="text-xs text-success">
                    ● Everything is ready
                  </p>
                </div>
              </div>

              <div className="space-y-3 py-4 text-sm">

                <div className="w-fit rounded-2xl rounded-tl-sm bg-base-200 px-4 py-3">
                  Hey! Good to see you again 👋
                </div>

                <div className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-primary-content">
                  Let's catch up ✨
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= LOGIN CARD ================= */}
        <section className="mx-auto w-full max-w-md">

          {/* Mobile Logo */}
          <div className="mb-8 flex justify-center lg:hidden">

            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-black text-primary-content">
                D
              </div>

              <h1 className="text-2xl font-black">
                Dosti<span className="text-primary">HUB</span>
              </h1>
            </Link>

          </div>

          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-2xl sm:p-8">

            {/* Header */}
            <div className="mb-8">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Welcome Back
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Sign in to DostiHub
              </h2>

              <p className="mt-3 text-sm leading-6 text-base-content/60">
                Continue where you left off and get back to your conversations.
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <label className="block">

                <span className="mb-2 block text-sm font-semibold">
                  Email address
                </span>

                <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">

                  <MdMail className="text-xl text-base-content/40" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    disabled={loading}
                    required
                    className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                  />

                </div>

              </label>

              {/* Password */}
              <label className="block">

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-semibold">
                    Password
                  </span>

                  <button
                    type="button"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">

                  <MdLock className="text-xl text-base-content/40" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={loading}
                    required
                    className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="text-xl text-base-content/40 transition hover:text-primary"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <MdVisibilityOff />
                    ) : (
                      <MdVisibility />
                    )}
                  </button>

                </div>

              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary h-14 w-full rounded-2xl text-base font-bold"
              >
                {loading
                  ? "Signing in..."
                  : "Sign In"}
              </button>

            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">

              <div className="h-px flex-1 bg-base-300" />

              <span className="text-xs font-semibold uppercase tracking-widest text-base-content/40">
                or
              </span>

              <div className="h-px flex-1 bg-base-300" />

            </div>

            {/* Google */}
            {error ? (

              <button
                disabled
                className="btn btn-outline btn-error h-14 w-full rounded-2xl"
              >
                <FcGoogle size={21} />
                {error}
              </button>

            ) : (

              <button
                onClick={handleGoogleLogin}
                disabled={
                  !isInitialized ||
                  googleLoading ||
                  loading
                }
                className="btn h-14 w-full rounded-2xl border border-base-300 bg-base-100 shadow-none transition hover:border-primary hover:bg-base-200"
              >
                <FcGoogle size={21} />

                {googleLoading
                  ? "Connecting..."
                  : isInitialized
                    ? "Continue with Google"
                    : "Google unavailable"}
              </button>

            )}

            {/* Register */}
            <div className="mt-7 rounded-2xl bg-base-200 p-4">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-sm font-semibold">
                    New to DostiHub?
                  </p>

                  <p className="mt-1 text-xs text-base-content/60">
                    Create your account and start connecting.
                  </p>
                </div>

                <Link
                  to="/register"
                  className="btn btn-primary btn-sm rounded-xl"
                >
                  Register
                  <MdOutlineArrowOutward />
                </Link>

              </div>

            </div>

            <p className="mt-6 text-center text-xs text-base-content/45">
              Your account and conversations are protected.
            </p>

          </div>
        </section>

      </div>
    </main>
  );
};

export default Login;

