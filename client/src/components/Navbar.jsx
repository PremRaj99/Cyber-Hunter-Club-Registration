import React, { useEffect, useState } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
// import logo from '../assets/logo.png';

// react icons
import { FaXmark, FaBars } from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // set toggle Menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    // naviitems array
    const navItems = [
        { link: "Home", path: "home" },
        { link: "Dashboard", path: "dashboard" },
        { link: "Services", path: "services" },
        { link: "Course", path: "course" },

    ];

    return (
        <BrowserRouter>
            <header className='w-full bg-transparent md:border-transparent fixed top-0 left-0 right-0 '>
                <nav className={`py-3 lg:px-14 px-4 bg-transparent ${isSticky ? "backdrop-blur-md sticky top-0 left-0 right-0 border-white bg-duration-300" : ""} `}> {/*if want border-b*/}
                    <div className='flex justify-between items-center text-base gap-8 border-b-2 border-b-[#5CE1E6] py-4'>
                        <a href="" className='text-3xl font-semibold flex items-center space-x-3 hover:-translate-y-1 transition-all duration-100 '><img src="" alt="" className='w-10 inline-block items-center' />
                            <span className='text-[#5CE1E6] font-bold'>CYBER</span>
                            <span className='text-[#5CE1E6] font-bold'>HUNTER</span>
                        </a>
                        {/* nav items for larger devices */}
                        <ul className="md:flex space-x-12 hidden">
                            {navItems.map(({ link, path }) => (
                                <li key={path}>
                                    <Link to={path} className="block text-base text-white  hover:text-neutralGrey hover:-translate-y-0.5 hover:border-b-2 transition-all duration-300">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* btn for  large devices */}
                        <div className='space-x12 hidden lg:flex items-center'>
                            <a href="/" className=' lg:px-8 px-2 py-1 lg:flex items-center text-[#5CE1E6] hover:text-black  hover:bg-[#5CE1E6] rounded-2xl outline mx-5'>LOGIN</a>
                            <button className='bg-transparent text-[#5CE1E6] py-1 lg:px-8 px-1 transition-all-during-300 rounded-2xl hover:text-black hover:bg-[#5CE1E6]  outline mx-3' >SIGN UP</button>
                        </div>

                        {/* menu button for only mobile devices */}
                        <div className='md:hidden'>
                            <button className='text-[#5CE1E6] focus:outline-none focus:text-[#5CE1E6] transition-all duration-700 ' onClick={toggleMenu}>
                                {
                                    isMenuOpen ? (<FaXmark className='h-6 w-6' />) : (<FaBars className='h-6 w-6' />)
                                }
                            </button>
                        </div>
                    </div>
                    <div className={` lg:hidden space-y-8 px-4 mt-16 py-7 text-center list-none  ${isMenuOpen ? "block fixed top-0 right-0 backdrop-blur-lg left-0 border bg-transparent" : "hidden"}`}>
                        {navItems.map(({ link, path }) => (
                            <li key={path}>
                                <Link to={path} className="block text-base text-[#5CE1E6] hover:text-neutralGrey">
                                    {link}
                                </Link>
                            </li>
                        ))}
                        <div className='space-x12  lg:flex items-center'>
                            <a href="/" className=' lg:px-8 px-2 py-1 lg:flex items-center text-[#5CE1E6] hover:text-black  hover:bg-[#5CE1E6] rounded-2xl outline mx-5'>LOGIN</a>
                            <button className='bg-transparent text-[#5CE1E6] py-1 lg:px-8 px-1 transition-all-during-300 rounded-2xl hover:text-black hover:bg-[#5CE1E6]  outline mx-3' >SIGN UP</button>
                        </div>
                    </div>

                </nav>
            </header>
        </BrowserRouter>
    )
}

export default Navbar
