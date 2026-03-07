import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const profileHints = [
  "Ye name aapke contacts ko dikhega.",
  "About me ko short aur clear rakho.",
  "Email aur phone account recovery me kaam aayega.",
];

const getProfileForm = (account) => ({
  fullName: account?.fullName || account?.name || "",
  email: account?.email || "",
  mobileNumber: account?.mobileNumber || account?.phoneNumber || "",
  about: account?.about || "",
});

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsLogin } = useAuth();

  const currentUser = user || JSON.parse(sessionStorage.getItem("AppUser") || "null");
  const [profileForm, setProfileForm] = useState(getProfileForm(currentUser));
  const [mobilePanel, setMobilePanel] = useState("summary");

  useEffect(() => {
    setProfileForm(getProfileForm(currentUser));
  }, [user]);

  const userName = currentUser?.fullName || currentUser?.name || "DostiHUB User";
  const userEmail = currentUser?.email || "No email found";
  const userPhone = currentUser?.mobileNumber || currentUser?.phoneNumber || "Not added yet";
  const userAbout = currentUser?.about || "Tell people about yourself in a few lines.";

  const completedProfileFields = [
    currentUser?.fullName || currentUser?.name,
    currentUser?.email,
    currentUser?.mobileNumber || currentUser?.phoneNumber,
    currentUser?.about,
  ].filter(Boolean).length;
  const profileStrength = Math.min(100, completedProfileFields * 25);

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const handleLogout = () => {
    sessionStorage.removeItem("AppUser");
    setUser(null);
    setIsLogin(false);
    navigate("/login");
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetProfile = () => {
    setProfileForm(getProfileForm(currentUser));
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();

    if (profileForm.email && !/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(profileForm.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (profileForm.mobileNumber && !/^[0-9]{10,15}$/.test(profileForm.mobileNumber)) {
      toast.error("Phone number should contain 10 to 15 digits.");
      return;
    }

    const updatedUser = {
      ...(currentUser || {}),
      fullName: profileForm.fullName.trim(),
      email: profileForm.email.trim(),
      mobileNumber: profileForm.mobileNumber.trim(),
      about: profileForm.about.trim(),
    };

    sessionStorage.setItem("AppUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success("Profile updated successfully");
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-base-200 px-3 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-2xl">
        <div className="h-28 bg-primary" />

        <div className="-mt-16 px-4 pb-6 md:px-6">
          <div className="mb-4 rounded-xl bg-base-200 p-1 lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setMobilePanel("summary")}
                className={`btn btn-sm border-none ${
                  mobilePanel === "summary"
                    ? "btn-primary text-primary-content"
                    : "bg-transparent text-base-content"
                }`}
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => setMobilePanel("edit")}
                className={`btn btn-sm border-none ${
                  mobilePanel === "edit"
                    ? "btn-primary text-primary-content"
                    : "bg-transparent text-base-content"
                }`}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className={`flex gap-6 transition-transform duration-300 ease-out lg:grid lg:grid-cols-[320px_1fr] lg:gap-6 ${
                mobilePanel === "summary" ? "translate-x-0" : "-translate-x-[calc(100%+1.5rem)]"
              } lg:translate-x-0`}
            >
          <aside className="min-w-full rounded-2xl border border-base-300 bg-base-200 p-4 lg:min-w-0">
            <div className="flex flex-col items-center text-center">
              <div className="avatar avatar-placeholder">
                <div className="bg-primary text-primary-content h-24 w-24 rounded-full text-3xl font-bold">
                  <span>{initials || "DU"}</span>
                </div>
              </div>

              <h1 className="mt-3 text-2xl font-bold text-base-content">{userName}</h1>
              <p className="text-sm text-base-content/70">Available</p>

              <div className="mt-4 w-full rounded-xl bg-base-100 p-3 text-left">
                <p className="text-primary text-xs font-semibold uppercase tracking-wide">Profile Strength</p>
                <p className="mt-1 text-2xl font-bold text-base-content">{profileStrength}%</p>
                <progress className="progress progress-success mt-2 h-2 w-full" value={profileStrength} max="100" />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-base-100 p-3">
                <p className="text-xs uppercase text-base-content/70">Email</p>
                <p className="text-sm font-medium text-base-content">{userEmail}</p>
              </div>
              <div className="rounded-xl bg-base-100 p-3">
                <p className="text-xs uppercase text-base-content/70">Phone</p>
                <p className="text-sm font-medium text-base-content">{userPhone}</p>
              </div>
              <div className="rounded-xl bg-base-100 p-3">
                <p className="text-xs uppercase text-base-content/70">About</p>
                <p className="text-sm font-medium text-base-content">{userAbout}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <Link to="/chatting" className="btn btn-primary">
                Open Chats
              </Link>
              <button
                type="button"
                className="btn btn-outline lg:hidden"
                onClick={() => setMobilePanel("edit")}
              >
                Edit Profile
              </button>
              <button className="btn btn-outline btn-error" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </aside>

          <section className="min-w-full rounded-2xl border border-base-300 bg-base-200 p-4 md:p-5 lg:min-w-0">
            <div className="mb-4 border-b border-base-300 pb-3">
              <p className="text-primary text-xs font-semibold uppercase tracking-wide">Profile</p>
              <h2 className="text-2xl font-bold text-base-content">Edit Your Details</h2>
              <p className="text-sm text-base-content/70">WhatsApp-style profile settings, instantly editable.</p>
            </div>

            <form onSubmit={handleSaveProfile} onReset={handleResetProfile} className="space-y-4">
              <div className="rounded-xl border border-base-300 bg-base-100 p-3">
                <label className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your display name"
                  value={profileForm.fullName}
                  onChange={handleProfileChange}
                  className="input input-bordered h-11 w-full"
                />
              </div>

              <div className="rounded-xl border border-base-300 bg-base-100 p-3">
                <label className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                  About
                </label>
                <textarea
                  name="about"
                  placeholder="Hey there! I am using DostiHUB"
                  value={profileForm.about}
                  onChange={handleProfileChange}
                  rows={3}
                  className="textarea textarea-bordered w-full"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-base-300 bg-base-100 p-3">
                  <label className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@email.com"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="input input-bordered h-11 w-full"
                  />
                </div>

                <div className="rounded-xl border border-base-300 bg-base-100 p-3">
                  <label className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="10-15 digit number"
                    value={profileForm.mobileNumber}
                    onChange={handleProfileChange}
                    className="input input-bordered h-11 w-full"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-base-300 bg-base-100 p-3">
                <p className="text-primary text-xs font-semibold uppercase tracking-wide">Quick Tips</p>
                <ul className="mt-2 space-y-2 text-sm text-base-content/70">
                  {profileHints.map((hint) => (
                    <li key={hint} className="rounded-lg bg-base-200 p-2">
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <button type="reset" className="btn btn-outline flex-1">
                  Reset
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Save Changes
                </button>
              </div>

              <button
                type="button"
                className="btn btn-outline mt-2 w-full lg:hidden"
                onClick={() => setMobilePanel("summary")}
              >
                Back to Profile
              </button>
            </form>
          </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;