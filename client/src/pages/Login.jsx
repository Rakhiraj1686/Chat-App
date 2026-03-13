import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../config/GoogleAuth";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { MdLock, MdMail, MdOutlineArrowOutward } from "react-icons/md";
import { RiChatSmile3Line } from "react-icons/ri";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();

  const handleGoogleSuccess = async (userData) => {
    console.log("Google Login Data", userData);
    setLoading(true);
    try {
      const res = await api.post("/auth/googleLogin", userData);

      toast.success(res.data.message);

      // optional: store user or token
      setUser(res.data.data);
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));

      handleClearForm();

      // simple redirect
      navigate("/chatting");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const GoogleLogin = () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [Loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      toast.success(res.data.message);

      // optional: store user or token
      setUser(res.data.data);
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));

      handleClearForm();

      // simple redirect
      navigate("/chatting");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-200 px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden rounded-4xl border border-base-300/60 bg-base-100/80 p-8 shadow-2xl backdrop-blur lg:block xl:p-10">
          <div className="flex h-full flex-col justify-between gap-10">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <RiChatSmile3Line className="text-lg" />
                DostiHUB Login Space
              </div>

              <h1 className="mt-6 max-w-md text-5xl font-black leading-tight text-base-content">
                Continue your chats without losing the flow.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-base-content/70">
                Fast login, clean access, and the same account logic you already use.
                Bas UI ko fresh look diya gaya hai.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-base-200 p-5">
                <p className="text-sm font-semibold text-base-content">Secure access</p>
                <p className="mt-2 text-sm leading-6 text-base-content/70">
                  Session save hoga aur login ke baad direct chatting page par redirect milega.
                </p>
              </div>

              <div className="rounded-3xl bg-primary p-5 text-primary-content">
                <p className="text-sm font-semibold">Quick entry</p>
                <p className="mt-2 text-sm leading-6 text-primary-content/80">
                  Email-password ya Google, dono options same backend logic ke saath available hain.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl rounded-4xl border border-base-300/60 bg-base-100/90 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                Welcome Back
              </p>
              <h2 className="mt-2 text-4xl font-black text-base-content">
                Login
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-base-content/70">
                Apne account me sign in karke chats aur contacts ko continue karo.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-base-200 p-4 sm:block">
              <RiChatSmile3Line className="text-3xl text-primary" />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            onReset={handleClearForm}
            className="space-y-5"
          >
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-base-content">
                Email Address
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 focus-within:border-primary">
                <MdMail className="text-xl text-base-content/50" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={Loading}
                  required
                  className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-base-content">
                Password
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 focus-within:border-primary">
                <MdLock className="text-xl text-base-content/50" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={Loading}
                  required
                  className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                />
              </div>
            </label>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <button
                type="reset"
                disabled={Loading}
                className="btn btn-outline h-13 rounded-2xl"
              >
                Clear Form
              </button>

              <button
                type="submit"
                disabled={Loading}
                className="btn btn-primary h-13 rounded-2xl"
              >
                {Loading ? "Logging in..." : "Login Now"}
              </button>
            </div>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-base-300" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
              or continue with
            </span>
            <div className="h-px flex-1 bg-base-300" />
          </div>

          <div>
            {error ? (
              <button
                className="btn btn-outline btn-error h-14 w-full rounded-2xl font-sans"
                disabled
              >
                <FcGoogle className="text-xl" />
                {error}
              </button>
            ) : (
              <button
                onClick={GoogleLogin}
                className="btn h-14 w-full rounded-2xl border border-base-300 bg-base-100 font-sans shadow-none hover:border-primary hover:bg-base-200"
                disabled={!isInitialized || isLoading}
              >
                <FcGoogle className="text-xl" />
                {isLoading
                  ? "Loading..."
                  : isInitialized
                    ? "Continue with Google"
                    : "Google Auth Error"}
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-base-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-base-content">New here?</p>
              <p className="text-sm text-base-content/70">
                Account create karke DostiHUB join karo.
              </p>
            </div>

            <Link to="/register" className="btn btn-primary btn-soft rounded-2xl">
              Create Account <MdOutlineArrowOutward className="text-lg" />
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-base-content/60">
            Your data is safe with us.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
