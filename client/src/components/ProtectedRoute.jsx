import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Guards routes that require a logged-in user (e.g. /chatting, /userDashboard).
// Without this, visiting those URLs directly while logged out briefly renders
// the page before any redirect happens, and /userDashboard had no guard at all.
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
