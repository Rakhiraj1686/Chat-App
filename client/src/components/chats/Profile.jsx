import React from "react";
import { IoArrowBack } from "react-icons/io5";

const ProfilePage = ({ setActivePage }) => {

  return (
    <div className="h-full flex flex-col bg-base-200">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4 bg-base-100 shadow">

        <button
          onClick={() => setActivePage("contacts")}
          className="text-xl"
        >
          <IoArrowBack />
        </button>

        <h2 className="text-lg font-bold">
          Profile
        </h2>

      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 "></div>

      </div>

    </div>
  );
};

export default ProfilePage;