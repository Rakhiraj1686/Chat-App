import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../config/GoogleAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();

  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();

  const handleGoogleSuccess = async (userData) => {
    console.log("Google Login Data", userData);
    setLoading(true);
    try {
      const res = await api.post("/auth/googleLogin", userData);

      toast.success(res.data.message);

      // optional: store user or token
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));

      handleClearForm();

      // simple redirect
      navigate("/dashboard");
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
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleLoginNow = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));
      handleClearForm();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.responsee?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-(--color-background) to-indigo-100 py-6 px-4">
        <div className="max-w-xl mx-auto">
          {/* From Container */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden mt-20">
            <form
              onSubmit={handleLoginNow}
              onReset={handleClearForm}
              className="px-8"
            >
              <div className="mb-5">
                <div className="text-center mb-10 mt-3">
                  <h1 className="text-4xl font-bold text-(--color-text)">
                    Login Now
                  </h1>
                  <p className="text-center text-base-content/70 mb-6">
                    Welcome back 👋
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={Loading}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg
                  text-(--color-text) placeholder:text-(--color-muted)
                  focus:outline-none focus:border-(--color-text)
                  transition disabled:cursor-not-allowed"
                    />

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      placeholder="Enter Your Password"
                      onChange={handleChange}
                      disabled={Loading}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg
                  text-(--color-text) placeholder:text-(--color-muted)
                  focus:outline-none focus:border-(--color-text)
                  transition disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="w-full flex justify-end">
                    <button
                      className="text-(--color-primary) hover:text-(--color-secondary) cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsForgetPasswordOpen(true);
                      }}
                    >
                      Forget Password ?
                    </button>
                  </div>
                </div>

                <hr className="border-gray-200 mt-4" />

                {/* Login Now */}
                <div className="flex gap-4 pt-8 border-t-2 border-gray-200">
                  <button
                    type="submit"
                    disabled={Loading}
                    className="flex-1 font-bold py-4 px-6 rounded-lg
                bg-(--color-secondary)
                text-(--color-on-primary)
                hover:text-(--color-text)
                transition duration-300 transform hover:scale-105 shadow-lg
                disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Laoding.." : "Login Now"}
                  </button>
                </div>

                <div className="mt-4">
                  {error ? (
                    <button
                      className="btn btn-outline btn-error font-sans flex items-center justify-center gap-2 w-full"
                      disabled
                    >
                      <FcGoogle className="text-xl" />
                      {error}
                    </button>
                  ) : (
                    <button
                      onClick={GoogleLogin}
                      className="btn btn-outline font-sans flex items-center justify-center gap-2 w-full"
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

                <div className="flex justify-between mt-5 text-(--color-muted)">
                  <p>Didn't Have Account ?</p>
                  <button className="text-(--color-primary) hover:text-(--color-secondary)">
                    Register Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
