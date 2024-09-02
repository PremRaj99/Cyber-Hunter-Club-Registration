import React, { useState } from "react";
import BackgroundVideo from "./assets/videoback.mp4";
import Registration from "./components/Registration";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Service from "./components/Service";
import Course from "./components/Course";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className=" w-full h-full min-h-screen py-4 md:px-32 bg-black">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            className="fixed top-0 left-0 w-full h-full opacity-50 object-cover"
          >
            <source src={BackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Main Content */}
          <Routes>
            <Route path="/*" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/service" element={<Service />} />
            <Route path="/course" element={<Course />} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
