import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chatting from "./pages/Chatting";
import UserDashboard from "./pages/UserDashboard";

const AppLayout = () => {
  const location = useLocation();

  // Chatting page par header hide
  const hideNavbar = location.pathname === "/chatting";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
      </Routes>
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