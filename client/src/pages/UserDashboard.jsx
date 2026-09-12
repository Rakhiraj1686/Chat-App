import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/api";
import { useAuth } from "../context/AuthContext";

import {
  IoArrowBack,
  IoCameraOutline,
  IoChevronForward,
  IoLogOutOutline,
  IoMailOutline,
  IoCallOutline,
  IoPersonOutline,
  IoInformationCircleOutline,
  IoCheckmarkCircle,
  IoCreateOutline,
} from "react-icons/io5";

const getProfileForm = (account) => ({
  fullName: account?.fullName || account?.name || "",
  email: account?.email || "",
  mobileNumber: account?.mobileNumber || account?.phoneNumber || "",
  about: account?.about || "",
});

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "DU";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsLogin } = useAuth();

  const currentUser =
    user || JSON.parse(sessionStorage.getItem("AppUser") || "null");

  const [profileForm, setProfileForm] = useState(
    getProfileForm(currentUser)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setProfileForm(getProfileForm(currentUser));
  }, [user]);

  const userName =
    currentUser?.fullName ||
    currentUser?.name ||
    "DostiHUB User";

  const userEmail = currentUser?.email || "No email added";

  const userPhone =
    currentUser?.mobileNumber ||
    currentUser?.phoneNumber ||
    "No phone added";

  const userAbout =
    currentUser?.about ||
    "Hey there! I am using DostiHUB.";

  const initials = getInitials(userName);

  const profileFields = [
    currentUser?.fullName || currentUser?.name,
    currentUser?.email,
    currentUser?.mobileNumber || currentUser?.phoneNumber,
    currentUser?.about,
  ];

  const profileStrength = Math.min(
    100,
    profileFields.filter(Boolean).length * 25
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setProfileForm(getProfileForm(currentUser));
    setIsEditing(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("AppUser");

    setUser(null);
    setIsLogin(false);

    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    const fullName = profileForm.fullName.trim();
    const email = profileForm.email.trim();
    const mobileNumber = profileForm.mobileNumber.trim();
    const about = profileForm.about.trim();

    if (!fullName) {
      toast.error("Name is required");
      return;
    }

    if (
      email &&
      !/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (
      mobileNumber &&
      !/^[0-9]{10,15}$/.test(mobileNumber)
    ) {
      toast.error("Phone number should contain 10-15 digits");
      return;
    }

    setIsSaving(true);

    try {
      const res = await api.put("/user/profile", {
        fullName,
        email,
        mobileNumber,
        about,
      });

      const updatedUser = {
        ...(currentUser || {}),
        ...res.data.data,
      };

      sessionStorage.setItem(
        "AppUser",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);
      setIsEditing(false);

      toast.success(
        res.data.message || "Profile updated successfully"
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-3 px-4">
          <button
            type="button"
            onClick={() => navigate("/chatting")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base-content/70 transition hover:bg-base-200 active:scale-95"
            aria-label="Back to chat"
          >
            <IoArrowBack className="text-xl" />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold">
              Profile
            </h1>

            <p className="text-xs text-base-content/50">
              DostiHUB
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              <IoCreateOutline className="text-lg" />
              <span className="hidden sm:inline">
                Edit
              </span>
            </button>
          )}
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="mx-auto max-w-3xl px-3 py-4 sm:px-5 sm:py-6">
        {/* =================================================
            PROFILE HERO
        ================================================= */}
        <section className="overflow-hidden rounded-2xl bg-base-100 shadow-sm">
          {/* Cover */}
          <div className="relative h-28 bg-gradient-to-r from-primary/80 via-primary to-primary/70 sm:h-36">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[25px] border-white/30" />
              <div className="absolute -bottom-24 left-10 h-48 w-48 rounded-full border-[25px] border-white/20" />
            </div>
          </div>

          {/* Profile */}
          <div className="relative px-5 pb-6 sm:px-8">
            {/* Avatar */}
            <div className="-mt-14 flex justify-center sm:justify-start">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-[5px] border-base-100 bg-neutral text-3xl font-bold text-neutral-content shadow-lg">
                  {initials}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    toast("Profile photo upload coming soon")
                  }
                  className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-content shadow-md transition hover:scale-105 active:scale-95"
                  aria-label="Change profile photo"
                >
                  <IoCameraOutline className="text-lg" />
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="mt-4 text-center sm:text-left">
              <h2 className="text-2xl font-bold">
                {userName}
              </h2>

              <p className="mt-1 text-sm text-base-content/55">
                {userEmail}
              </p>

              <div className="mt-3 flex items-center justify-center gap-2 sm:justify-start">
                <span className="flex items-center gap-1.5 text-xs font-medium text-success">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  DostiHUB user
                </span>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="mt-6 rounded-xl bg-base-200 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Profile completion
                  </p>

                  <p className="mt-0.5 text-xs text-base-content/50">
                    Complete your profile
                  </p>
                </div>

                <span className="text-sm font-bold text-primary">
                  {profileStrength}%
                </span>
              </div>

              <progress
                className="progress progress-primary h-1.5 w-full"
                value={profileStrength}
                max="100"
              />
            </div>
          </div>
        </section>

        {/* =================================================
            EDIT FORM
        ================================================= */}
        {isEditing ? (
          <section className="mt-4 overflow-hidden rounded-2xl bg-base-100 shadow-sm">
            <div className="border-b border-base-300 px-5 py-4 sm:px-6">
              <h2 className="font-semibold">
                Edit profile
              </h2>

              <p className="mt-1 text-xs text-base-content/50">
                Update your personal information
              </p>
            </div>

            <form
              onSubmit={handleSaveProfile}
              className="space-y-5 p-5 sm:p-6"
            >
              {/* Full Name */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Name
                </span>

                <div className="relative">
                  <IoPersonOutline className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-base-content/40" />

                  <input
                    type="text"
                    name="fullName"
                    value={profileForm.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="input input-bordered h-12 w-full pl-11 focus:border-primary focus:outline-none"
                  />
                </div>
              </label>

              {/* Email */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Email
                </span>

                <div className="relative">
                  <IoMailOutline className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-base-content/40" />

                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    className="input input-bordered h-12 w-full pl-11 focus:border-primary focus:outline-none"
                  />
                </div>
              </label>

              {/* Phone */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Phone
                </span>

                <div className="relative">
                  <IoCallOutline className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-base-content/40" />

                  <input
                    type="tel"
                    name="mobileNumber"
                    value={profileForm.mobileNumber}
                    onChange={handleChange}
                    placeholder="10 digit mobile number"
                    className="input input-bordered h-12 w-full pl-11 focus:border-primary focus:outline-none"
                  />
                </div>
              </label>

              {/* About */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  About
                </span>

                <div className="relative">
                  <IoInformationCircleOutline className="pointer-events-none absolute left-4 top-4 text-lg text-base-content/40" />

                  <textarea
                    name="about"
                    value={profileForm.about}
                    onChange={handleChange}
                    placeholder="Tell something about yourself..."
                    rows={4}
                    maxLength={150}
                    className="textarea textarea-bordered min-h-28 w-full resize-none pl-11 focus:border-primary focus:outline-none"
                  />
                </div>

                <p className="mt-1 text-right text-xs text-base-content/40">
                  {profileForm.about.length}/150
                </p>
              </label>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSaving}
                  className="btn btn-outline h-12 flex-1 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn btn-primary h-12 flex-1 rounded-xl"
                >
                  {isSaving ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Saving
                    </>
                  ) : (
                    <>
                      <IoCheckmarkCircle className="text-lg" />
                      Save
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        ) : (
          <>
            {/* =============================================
                ABOUT
            ============================================= */}
            <section className="mt-4 overflow-hidden rounded-2xl bg-base-100 shadow-sm">
              <div className="border-b border-base-300 px-5 py-4">
                <h2 className="text-sm font-semibold text-base-content/55">
                  About
                </h2>
              </div>

              <div className="px-5 py-5">
                <p className="text-sm leading-6 text-base-content/80">
                  {userAbout}
                </p>
              </div>
            </section>

            {/* =============================================
                CONTACT INFORMATION
            ============================================= */}
            <section className="mt-4 overflow-hidden rounded-2xl bg-base-100 shadow-sm">
              <div className="border-b border-base-300 px-5 py-4">
                <h2 className="text-sm font-semibold text-base-content/55">
                  Contact info
                </h2>
              </div>

              <div className="divide-y divide-base-300">
                {/* Email */}
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <IoMailOutline className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-base-content/45">
                      Email
                    </p>

                    <p className="mt-1 truncate text-sm font-medium">
                      {userEmail}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <IoCallOutline className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-base-content/45">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {userPhone}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =============================================
                ACCOUNT
            ============================================= */}
            <section className="mt-4 overflow-hidden rounded-2xl bg-base-100 shadow-sm">
              <div className="border-b border-base-300 px-5 py-4">
                <h2 className="text-sm font-semibold text-base-content/55">
                  Account
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-base-200"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <IoPersonOutline className="text-xl" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    Edit profile
                  </p>

                  <p className="mt-1 text-xs text-base-content/45">
                    Change your name, phone and about
                  </p>
                </div>

                <IoChevronForward className="shrink-0 text-lg text-base-content/35" />
              </button>
            </section>

            {/* =============================================
                LOGOUT
            ============================================= */}
            <section className="mt-4 overflow-hidden rounded-2xl bg-base-100 shadow-sm">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-4 px-5 py-4 text-left text-error transition hover:bg-error/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-error/10">
                  <IoLogOutOutline className="text-xl" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Log out
                  </p>

                  <p className="mt-1 text-xs text-base-content/45">
                    Sign out from this device
                  </p>
                </div>

                <IoChevronForward className="text-lg opacity-40" />
              </button>
            </section>
          </>
        )}

        {/* Footer */}
        <div className="px-4 py-8 text-center">
          <p className="text-xs font-medium text-base-content/35">
            DostiHUB
          </p>

          <p className="mt-1 text-[11px] text-base-content/25">
            Connect. Chat. Stay close.
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;