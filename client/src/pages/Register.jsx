import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api.jsx";
import { Link } from "react-router-dom";
import { MdLock, MdMail, MdOutlineArrowOutward, MdPerson, MdPhone } from "react-icons/md";
import { RiChatSmile3Line } from "react-icons/ri";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    });
    setValidationError({});
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be more than 3 characters";
    } else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
      Error.fullName = "Only alphabets and spaces allowed";
    }

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email
      )
    ) {
      Error.email = "Use proper email format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Only Indian mobile numbers allowed";
    }

    // ✅ Only password match check
    if (formData.password !== formData.confirmPassword) {
      Error.confirmPassword = "Passwords do not match";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Fill the form correctly");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
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
                DostiHUB Registration
              </div>

              <h1 className="mt-6 max-w-md text-5xl font-black leading-tight text-base-content">
                Start your conversation journey today.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-base-content/70">
                Naya account banao aur instantly rooms create karke friends,
                family, ya team ke saath connected raho.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-base-200 p-5">
                <p className="text-sm font-semibold text-base-content">Fast onboarding</p>
                <p className="mt-2 text-sm leading-6 text-base-content/70">
                  Sirf basic details do aur minutes me account ready.
                </p>
              </div>

              <div className="rounded-3xl bg-primary p-5 text-primary-content">
                <p className="text-sm font-semibold">Safe account setup</p>
                <p className="mt-2 text-sm leading-6 text-primary-content/80">
                  Validation checks ke saath secure registration flow.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl rounded-4xl border border-base-300/60 bg-base-100/90 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                Join DostiHUB
              </p>
              <h2 className="mt-2 text-4xl font-black text-base-content">Register</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-base-content/70">
                Apna profile complete karke real-time chats start karo.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-base-200 p-4 sm:block">
              <RiChatSmile3Line className="text-3xl text-primary" />
            </div>
          </div>

          <form onSubmit={handleSubmit} onReset={handleClearForm} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-base-content">Full Name</span>
              <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 focus-within:border-primary">
                <MdPerson className="text-xl text-base-content/50" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                />
              </div>
              {validationError.fullName && (
                <p className="mt-1 text-sm text-error">{validationError.fullName}</p>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-base-content">Email Address</span>
              <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 focus-within:border-primary">
                <MdMail className="text-xl text-base-content/50" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                />
              </div>
              {validationError.email && (
                <p className="mt-1 text-sm text-error">{validationError.email}</p>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-base-content">Mobile Number</span>
              <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 focus-within:border-primary">
                <MdPhone className="text-xl text-base-content/50" />
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="10-digit Indian number"
                  maxLength="10"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                />
              </div>
              {validationError.mobileNumber && (
                <p className="mt-1 text-sm text-error">{validationError.mobileNumber}</p>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-base-content">Create Password</span>
              <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 focus-within:border-primary">
                <MdLock className="text-xl text-base-content/50" />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-base-content">Confirm Password</span>
              <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 focus-within:border-primary">
                <MdLock className="text-xl text-base-content/50" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                />
              </div>
              {validationError.confirmPassword && (
                <p className="mt-1 text-sm text-error">{validationError.confirmPassword}</p>
              )}
            </label>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <button
                type="reset"
                disabled={isLoading}
                className="btn btn-outline h-13 rounded-2xl"
              >
                Clear Form
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary h-13 rounded-2xl"
              >
                {isLoading ? "Submitting..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-base-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-base-content">Already have an account?</p>
              <p className="text-sm text-base-content/70">Login karke apni chats continue karo.</p>
            </div>

            <Link to="/login" className="btn btn-primary btn-soft rounded-2xl">
              Go to Login <MdOutlineArrowOutward className="text-lg" />
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-base-content/60">
            We respect your privacy and protect your data.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Register;