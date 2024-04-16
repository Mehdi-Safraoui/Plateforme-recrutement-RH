import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Profile from "./pages/profile"
import userBoard from "./components/board-user";
import adminBoard from "./components/board-admin";
import rhBoard from "./components/board-rh";

import { BrowserRouter as Router ,Routes, Route } from "react-router-dom";


export default function App() {

    return (
      <>
  
        <div className="navbar">
          <Router>
            <Navbar />
  
            <main className="form-signing">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/user" Component={userBoard} />
                <Route exact path="/adminboard" Component={adminBoard} />
                <Route exact path="/rhboard" Component={rhBoard} />
              </Routes>
            </main>
          </Router>
        </div>
        
      </>
    );

  }

