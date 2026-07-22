import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import { Link } from "react-router-dom";
import {
  MdLock,
  MdMail,
  MdOutlineArrowOutward,
  MdPerson,
  MdPhone,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationError((prev) => ({
      ...prev,
      [name]: "",
    }));
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
    const errors = {};

    if (formData.fullName.trim().length < 3) {
      errors.fullName = "Name should be at least 3 characters";
    } else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
      errors.fullName = "Only alphabets and spaces are allowed";
    }

    if (
      !/^[\w.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email
      )
    ) {
      errors.email = "Please enter a valid email address";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Enter a valid Indian mobile number";
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationError(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post("/auth/register", formData);

      toast.success(res.data.message);

      handleClearForm();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-base-200">

      {/* Background */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-10">

        {/* LEFT BRAND SECTION */}
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
              Meet your people.
              <span className="block text-primary">
                Start your conversations.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-base-content/65">
              Create your DostiHub account and connect with friends, family,
              and communities in one simple space.
            </p>

            {/* Preview */}
            <div className="mt-10 max-w-md rounded-3xl border border-base-300 bg-base-100 p-4 shadow-xl">

              <div className="flex items-center gap-3 border-b border-base-300 pb-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-content">
                  <RiChatSmile3Line size={20} />
                </div>

                <div>
                  <p className="font-bold">
                    DostiHub Community
                  </p>

                  <p className="text-xs text-success">
                    ● Start connecting
                  </p>
                </div>

              </div>

              <div className="space-y-3 py-4 text-sm">

                <div className="w-fit rounded-2xl rounded-tl-sm bg-base-200 px-4 py-3">
                  Welcome to the community 👋
                </div>

                <div className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-primary-content">
                  Let's connect ✨
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* REGISTER FORM */}
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
                Create Account
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Join DostiHub
              </h2>

              <p className="mt-3 text-sm leading-6 text-base-content/60">
                Create your account and start connecting with your people.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Full Name */}
              <label className="block">

                <span className="mb-2 block text-sm font-semibold">
                  Full name
                </span>

                <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">

                  <MdPerson className="text-xl text-base-content/40" />

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                  />

                </div>

                {validationError.fullName && (
                  <p className="mt-1 text-xs text-error">
                    {validationError.fullName}
                  </p>
                )}

              </label>

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
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                  />

                </div>

                {validationError.email && (
                  <p className="mt-1 text-xs text-error">
                    {validationError.email}
                  </p>
                )}

              </label>

              {/* Mobile */}
              <label className="block">

                <span className="mb-2 block text-sm font-semibold">
                  Mobile number
                </span>

                <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">

                  <MdPhone className="text-xl text-base-content/40" />

                  <span className="text-sm text-base-content/50">
                    +91
                  </span>

                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="10-digit number"
                    maxLength={10}
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                  />

                </div>

                {validationError.mobileNumber && (
                  <p className="mt-1 text-xs text-error">
                    {validationError.mobileNumber}
                  </p>
                )}

              </label>

              {/* Password */}
              <label className="block">

                <span className="mb-2 block text-sm font-semibold">
                  Password
                </span>

                <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">

                  <MdLock className="text-xl text-base-content/40" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="text-xl text-base-content/40 transition hover:text-primary"
                  >
                    {showPassword ? (
                      <MdVisibilityOff />
                    ) : (
                      <MdVisibility />
                    )}
                  </button>

                </div>

                {validationError.password && (
                  <p className="mt-1 text-xs text-error">
                    {validationError.password}
                  </p>
                )}

              </label>

              {/* Confirm Password */}
              <label className="block">

                <span className="mb-2 block text-sm font-semibold">
                  Confirm password
                </span>

                <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">

                  <MdLock className="text-xl text-base-content/40" />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="input h-14 w-full border-none bg-transparent px-0 shadow-none focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    className="text-xl text-base-content/40 transition hover:text-primary"
                  >
                    {showConfirmPassword ? (
                      <MdVisibilityOff />
                    ) : (
                      <MdVisibility />
                    )}
                  </button>

                </div>

                {validationError.confirmPassword && (
                  <p className="mt-1 text-xs text-error">
                    {validationError.confirmPassword}
                  </p>
                )}

              </label>

              {/* Buttons */}
              <div className="grid gap-3 pt-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={handleClearForm}
                  disabled={isLoading}
                  className="btn btn-outline h-14 rounded-2xl"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary h-14 rounded-2xl text-base font-bold"
                >
                  {isLoading
                    ? "Creating..."
                    : "Create Account"}
                </button>

              </div>

            </form>

            {/* Login Link */}
            <div className="mt-7 rounded-2xl bg-base-200 p-4">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-sm font-semibold">
                    Already have an account?
                  </p>

                  <p className="mt-1 text-xs text-base-content/60">
                    Sign in to continue your conversations.
                  </p>

                </div>

                <Link
                  to="/login"
                  className="btn btn-primary btn-sm rounded-xl"
                >
                  Login
                  <MdOutlineArrowOutward />
                </Link>

              </div>

            </div>

            <p className="mt-6 text-center text-xs text-base-content/45">
              Your account details are protected.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Register;
