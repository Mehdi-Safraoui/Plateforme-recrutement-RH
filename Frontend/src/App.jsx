import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Profile from "./pages/profile"
import UserBoard from "./components/board-user";
import AdminBoard from "./components/board-admin";
import RhBoard from "./components/board-rh";

import { BrowserRouter as Router ,Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="navbar">
        <Router>
          <Navbar />
          <main className="form-signing">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={<UserBoard />} />
              <Route path="/adminboard" element={<AdminBoard />} />
              <Route path="/rhboard" element={<RhBoard />} />
            </Routes>
          </main>
        </Router>
      </div>
    </>
  );
}
