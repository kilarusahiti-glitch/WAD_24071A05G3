import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Courses from "./Courses";
import VideoPage from "./VideoPage";
import Progress from "./Progress";
import Contact from "./Contact";
import Dashboard from "./Dashboard";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <footer className="app-footer">
          @24071A05G3 (Kilaru Sahiti)
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
