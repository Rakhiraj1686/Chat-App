import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import {
  MdLock,
  MdMail,
  MdPerson,
  MdPhone,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();

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
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError((prev) => ({ ...prev, [name]: "" }));
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

    if (!/^[\w.+-]+@[\w-]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/.test(formData.email)) {
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
      toast.success(res.data.message || "Account created — log in to continue");
      handleClearForm();
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const fieldClass = (hasError) =>
    `flex items-center gap-2.5 rounded-field border bg-base-100 px-3.5 transition ${
      hasError
        ? "border-error focus-within:border-error focus-within:ring-2 focus-within:ring-error/20"
        : "border-base-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25"
    }`;

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
            &ldquo;A minute to sign up. A lifetime of group chats
            ahead.&rdquo;
          </p>
        </div>

        <p className="text-xs text-neutral-content/45">
          © {new Date().getFullYear()} DostiHub. Made with ❤️ in India.
        </p>
      </section>

      {/* ================= FORM PANEL ================= */}
      <section className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2.5 md:hidden">
            <span className="font-display flex h-9 w-9 items-center justify-center rounded-field bg-neutral text-lg font-semibold text-primary">
              द
            </span>
            <span className="font-display text-xl font-semibold">DostiHub</span>
          </Link>

          <h1 className="font-display text-2xl font-semibold">Create your account</h1>
          <p className="mt-2 text-sm text-base-content/55">
            Start connecting with the people who matter to you.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-base-content/80">
                Full name
              </span>
              <div className={fieldClass(validationError.fullName)}>
                <MdPerson className="text-lg text-base-content/35" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  disabled={isLoading}
                  className="h-11 w-full border-none bg-transparent text-sm outline-none"
                />
              </div>
              {validationError.fullName && (
                <p className="mt-1 text-xs text-error">{validationError.fullName}</p>
              )}
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-base-content/80">
                Email address
              </span>
              <div className={fieldClass(validationError.email)}>
                <MdMail className="text-lg text-base-content/35" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={isLoading}
                  className="h-11 w-full border-none bg-transparent text-sm outline-none"
                />
              </div>
              {validationError.email && (
                <p className="mt-1 text-xs text-error">{validationError.email}</p>
              )}
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-base-content/80">
                Mobile number
              </span>
              <div className={fieldClass(validationError.mobileNumber)}>
                <MdPhone className="text-lg text-base-content/35" />
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  disabled={isLoading}
                  className="h-11 w-full border-none bg-transparent text-sm outline-none"
                />
              </div>
              {validationError.mobileNumber && (
                <p className="mt-1 text-xs text-error">{validationError.mobileNumber}</p>
              )}
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-base-content/80">
                  Password
                </span>
                <div className={fieldClass(validationError.password)}>
                  <MdLock className="text-base text-base-content/35" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••"
                    disabled={isLoading}
                    className="h-11 w-full min-w-0 border-none bg-transparent text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="shrink-0 text-base text-base-content/35 hover:text-base-content/70"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-base-content/80">
                  Confirm
                </span>
                <div className={fieldClass(validationError.confirmPassword)}>
                  <MdLock className="text-base text-base-content/35" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••"
                    disabled={isLoading}
                    className="h-11 w-full min-w-0 border-none bg-transparent text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="shrink-0 text-base text-base-content/35 hover:text-base-content/70"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </div>
              </label>
            </div>
            {(validationError.password || validationError.confirmPassword) && (
              <p className="-mt-2 text-xs text-error">
                {validationError.password || validationError.confirmPassword}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-field bg-primary text-sm font-semibold text-primary-content shadow-sm transition-transform hover:-translate-y-px active:translate-y-0 disabled:opacity-60"
            >
              {isLoading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-base-content/55">
            Already on DostiHub?{" "}
            <Link to="/login" className="font-semibold text-link hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
