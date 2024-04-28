import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import UserBoard from "./components/board-user";
import AdminBoard from "./components/board-admin";
import RhBoard from "./components/board-rh";
import Jobs from "./pages/jobs";
import JobDetails from "./components/jobdetails";

export default function App() {
  return (
    <Router>
      <div className="navbar">
        <Navbar />
      </div>
      <main className="form-signing">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<UserBoard />} />
          <Route path="/adminboard" element={<AdminBoard />} />
          <Route path="/rhboard" element={<RhBoard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />  {/* Route dynamique pour les détails de l'emploi avec un paramètre d'ID */}
        </Routes>
      </main>
    </Router>
  );
}


