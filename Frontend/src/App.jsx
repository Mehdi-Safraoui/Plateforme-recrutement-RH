import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Profile from "./pages/profile"
import boardUser from "./components/board-user";
import boardAdmin from "./components/board-admin";
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
                <Route path="/user" Component={boardUser} />
                <Route path="/adminboard" Component={boardAdmin} />
                <Route path="/rhboard" Component={rhBoard} />
              </Routes>
            </main>
          </Router>
        </div>
        
      </>
    );

  }

