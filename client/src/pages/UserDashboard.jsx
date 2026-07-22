import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import {
  MdEdit,
  MdLogout,
  MdMail,
  MdPhone,
  MdPerson,
  MdSave,
} from "react-icons/md";

const getProfileForm = (account) => ({
  fullName: account?.fullName || account?.name || "",
  email: account?.email || "",
  mobileNumber: account?.mobileNumber || account?.phoneNumber || "",
  about: account?.about || "",
});

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsLogin } = useAuth();

  const currentUser =
    user || JSON.parse(sessionStorage.getItem("AppUser") || "null");

  const [profileForm, setProfileForm] = useState(
    getProfileForm(currentUser)
  );

  const [isEditing, setIsEditing] = useState(false);

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

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

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

  const handleLogout = () => {
    sessionStorage.removeItem("AppUser");

    setUser(null);
    setIsLogin(false);

    toast.success("Logged out successfully");
    navigate("/login");
  };

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

  const handleSaveProfile = (event) => {
    event.preventDefault();

    if (!profileForm.fullName.trim()) {
      toast.error("Name is required");
      return;
    }

    if (
      profileForm.email &&
      !/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(profileForm.email)
    ) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (
      profileForm.mobileNumber &&
      !/^[0-9]{10,15}$/.test(profileForm.mobileNumber)
    ) {
      toast.error("Phone number should contain 10-15 digits");
      return;
    }

    const updatedUser = {
      ...(currentUser || {}),
      fullName: profileForm.fullName.trim(),
      email: profileForm.email.trim(),
      mobileNumber: profileForm.mobileNumber.trim(),
      about: profileForm.about.trim(),
    };

    sessionStorage.setItem(
      "AppUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setIsEditing(false);

    toast.success("Profile updated successfully");
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-base-200 px-3 py-5 md:px-6 md:py-8">
      <div className="mx-auto max-w-5xl">

        {/* Top Navigation */}
        <div className="mb-5 flex items-center justify-between">
          <Link
            to="/chatting"
            className="btn btn-ghost gap-2 rounded-xl"
          >
            <FaArrowLeft />
            Back to Chat
          </Link>

          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-error gap-2 rounded-xl"
          >
            <MdLogout className="text-lg" />
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl">

          {/* Cover */}
          <div className="h-32 bg-primary md:h-44" />

          {/* Profile Header */}
          <div className="relative px-5 pb-6 md:px-8">

            <div className="-mt-14 flex flex-col items-center gap-4 sm:flex-row sm:items-end">

              {/* Avatar */}
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-base-100 bg-primary text-4xl font-bold text-primary-content shadow-xl">
                  {initials || "DU"}
                </div>

                <button
                  type="button"
                  className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-base-100 text-primary shadow-md"
                  onClick={() =>
                    toast("Profile photo upload coming soon")
                  }
                >
                  <FaCamera />
                </button>
              </div>

              {/* Name */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-black md:text-3xl">
                  {userName}
                </h1>

                <p className="mt-1 text-sm text-base-content/60">
                  {userEmail}
                </p>
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary gap-2 rounded-xl"
                >
                  <MdEdit className="text-lg" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Strength */}
            <div className="mt-6 rounded-2xl bg-base-200 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                  Profile completion
                </p>

                <span className="font-bold text-primary">
                  {profileStrength}%
                </span>
              </div>

              <progress
                className="progress progress-primary mt-3 h-2 w-full"
                value={profileStrength}
                max="100"
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-6 border-t border-base-300 p-5 md:grid-cols-2 md:p-8">

            {/* Profile Information */}
            <section>
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Profile
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  Personal Information
                </h2>
              </div>

              <div className="space-y-3">

                {/* Email */}
                <div className="flex items-center gap-4 rounded-2xl bg-base-200 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MdMail className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase text-base-content/50">
                      Email
                    </p>

                    <p className="truncate font-medium">
                      {userEmail}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 rounded-2xl bg-base-200 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MdPhone className="text-xl" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-base-content/50">
                      Phone
                    </p>

                    <p className="font-medium">
                      {userPhone}
                    </p>
                  </div>
                </div>

                {/* About */}
                <div className="rounded-2xl bg-base-200 p-4">
                  <p className="text-xs font-semibold uppercase text-base-content/50">
                    About
                  </p>

                  <p className="mt-2 leading-relaxed text-base-content/80">
                    {userAbout}
                  </p>
                </div>
              </div>
            </section>

            {/* Edit Profile */}
            <section>
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Account Settings
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  {isEditing ? "Edit Profile" : "Your Account"}
                </h2>
              </div>

              {!isEditing ? (
                <div className="rounded-2xl border border-base-300 bg-base-200 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content">
                      <MdPerson className="text-2xl" />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Keep your profile updated
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-base-content/65">
                        Add your name, contact details, and a short bio so
                        your friends can easily recognize you.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary mt-5 w-full rounded-xl"
                  >
                    <MdEdit />
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSaveProfile}
                  className="space-y-4"
                >

                  {/* Name */}
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Full Name
                    </span>

                    <input
                      type="text"
                      name="fullName"
                      value={profileForm.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="input input-bordered w-full"
                    />
                  </label>

                  {/* Email */}
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Email
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleChange}
                      placeholder="name@email.com"
                      className="input input-bordered w-full"
                    />
                  </label>

                  {/* Phone */}
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Phone Number
                    </span>

                    <input
                      type="tel"
                      name="mobileNumber"
                      value={profileForm.mobileNumber}
                      onChange={handleChange}
                      placeholder="10 digit mobile number"
                      className="input input-bordered w-full"
                    />
                  </label>

                  {/* About */}
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      About
                    </span>

                    <textarea
                      name="about"
                      value={profileForm.about}
                      onChange={handleChange}
                      placeholder="Tell something about yourself..."
                      rows={4}
                      className="textarea textarea-bordered w-full"
                    />
                  </label>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-outline flex-1 rounded-xl"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary flex-1 gap-2 rounded-xl"
                    >
                      <MdSave className="text-lg" />
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default UserDashboard;