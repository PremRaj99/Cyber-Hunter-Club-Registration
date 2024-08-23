import React, { useState } from "react";
import BackgroundVideo from "./assets/videoback.mp4";
import Registration from "./components/Registration";
import Header from "./components/Header";

function App() {
  return (
    <>
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
        <Registration />
      </div>
    </>
  );
}

export default App;
