import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    cfPassword: "",
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
      mobileNumber: "",
      password: "",
      cfPassword: "",
    });
  };

  const handleRegisterNow = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.cfPassword) {
      toast.error("Password and Confirm Password do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      sessionStorage.setItem("ChatKro", JSON.stringify(res.data.data));
      handleClearForm();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-linear-to-br  from-(--color-background)  to-indigo-100 py-6 px-4 ">
        <div className="max-w-xl mx-auto">
          {/* From Container  */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden mt-15">
            <form onSubmit={handleRegisterNow} className="p-8">
              <div className="mb-5">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-bold text-gray-900">
                    Register Now
                  </h1>
                </div>
                <div className="space-y-4 ">
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter Your Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
                    />
                    <input
                      type="number"
                      name="mobileNumber"
                      placeholder="Enter Your Mobile Number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      placeholder="Enter Your Password"
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
                    />
                    <input
                      type="Password"
                      name="cfPassword"
                      value={formData.cfPassword}
                      placeholder="Enter Your Confirm Password"
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
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

                {/* Login Now  */}
                <div className="flex gap-4 pt-8 border-t-2 border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-linear-to-r bg-(--color secondary)  font-bold py-4 px-6 rounded-lg bg-(--color-secondary) hover:-text-(--color-text)  transition duration-300 transform hover:scale-105 shadow-lg disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Laoding.." : "Register Now"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* Footer Note */}
          <p className="text-center text-gray-600 mt-8 text-sm">
            All fields marked are mandatory. We respect your privacy.
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
