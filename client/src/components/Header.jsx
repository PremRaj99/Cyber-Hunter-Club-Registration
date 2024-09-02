// import React from 'react'
// import logo from '../assets/CyberHunterLogo.png'

// export default function Header() {
//   return (
//     <div className='flex items-center gap-2 relative px-10  w-screen overflow-hidden bg-black top-0 z-30 py-2 text-white'>
//         <img src={logo} className='w-12 object-cover aspect-auto' alt="" />
//         <h1 className='text-2xl font-bold'><span className='text-[#5CE1E6]'>Cyber</span> Hunter</h1>
//     </div>
//   )
// }
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // set toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full h-16 md:px-10 px-4 relative z-20 bg-black">
      <div className="w-full h-full flex justify-between items-center border-b-2 border-[#00D8FF]">
        <div className="text-2xl flex items-center gap-2 font-bold relative">
          <div
            className="z-10 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <span className="text-[#00D8FF]">Cyber</span> Hunter
          </div>
          <div className="h-40 w-40 bg-[#00D8FF] absolute top-0 -translate-y-1/2 right-0 translate-x-1/4 rounded-full opacity-45 blur-2xl"></div>
        </div>
        <div className="md:flex items-center hidden text-gray-300 justify-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-white"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/service"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-white"
            }
          >
            Service
          </NavLink>
          <NavLink
            to="/course"
            className={({ isActive }) =>
              isActive ? "text-[#00D8FF]" : "hover:text-white"
            }
          >
            Courses
          </NavLink>
        </div>
          <div className="flex items-center justify-center gap-4">
            <button
              className="px-4 py-1 font-semibold rounded-full text-[#00D8FF] border border-[#00D8FF] bg-transparent hover:bg-[#00D8FF] hover:text-black"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
            <button
              className="px-4 py-1 font-semibold rounded-full text-[#00D8FF] border border-[#00D8FF] bg-transparent hover:bg-[#00D8FF] hover:text-black"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        {/* menu button for only mobile devices */}
        <div className="md:hidden">
          <button
            className="text-brandPrimary focus:outline-none focus:text-brandPrimary transition-all duration-700 "
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FaXmark className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
        <div
          className={`space-y-8 px-4 mt-16 py-7 text-center list-none  ${
            isMenuOpen
              ? "block fixed top-0 right-0 backdrop-blur-lg left-0 z-10 border bg-black backdrop:opacity-50"
              : "hidden"
          }`}
        >
          <div className="flex flex-col items-center text-gray-300 justify-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#00D8FF]" : "hover:text-white"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-[#00D8FF]" : "hover:text-white"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/service"
              className={({ isActive }) =>
                isActive ? "text-[#00D8FF]" : "hover:text-white"
              }
            >
              Service
            </NavLink>
            <NavLink
              to="/course"
              className={({ isActive }) =>
                isActive ? "text-[#00D8FF]" : "hover:text-white"
              }
            >
              Courses
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
