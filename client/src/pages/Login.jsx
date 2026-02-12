import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
      handleClearForm();
    } catch (error) {
      console.log(error);
      toast.error(error?.responsee?.data?.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-(--color-background) to-indigo-100 py-6 px-4">
        <div className="max-w-xl mx-auto">
          {/* From Container */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden mt-20">
            <form onSubmit={handleLoginNow} className="p-8">
              <div className="mb-5">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-bold text-(--color-text)">
                    Login Now
                  </h1>
                </div>

                <div className="space-y-4">
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
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
                      disabled={isLoading}
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
