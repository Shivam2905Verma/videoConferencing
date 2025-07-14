import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./pages/Login";
import VideoMeet from "./pages/VideoMeet";
import Home from "./pages/Home";
import History from "./pages/History";

function App() {
  return (
    <Router>
        <AuthProvider>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/meeting/:url" element={<VideoMeet />} />
      </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
