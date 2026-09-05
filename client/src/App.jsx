import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

// Code-split everything except the landing page (Login) so the initial bundle
// is smaller. socket.io-client, emoji-picker-react, and the Google auth SDK
// were all being pulled into the main chunk even for someone who only ever
// views the login screen.
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Chatting = lazy(() => import("./pages/Chatting"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));

const RouteFallback = () => (
  <div className="flex h-screen w-full items-center justify-center bg-base-200">
    <span className="loading loading-spinner loading-lg text-primary" />
  </div>
);

const AppLayout = () => {
  const location = useLocation();

  // Chatting page par header hide
  const hideNavbar = location.pathname === "/chatting";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chatting"
            element={
              <ProtectedRoute>
                <Chatting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userDashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;