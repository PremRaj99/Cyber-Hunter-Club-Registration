import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-col mt-4  h-auto w-full backdrop-blur-lg bg-opacity-20 bg-[#5CE1E6] ">
            <div className="h-auto w-full  p-8 z-10">
                <div className="flex justify-evenly text-[#ffffff] lg:text-lg text-xs ">
                    <p><span className=' text-[#5CE1E6] '>&#169;</span> Copyrights 2024 | <span className='text-[#5CE1E6] '>Cyber Hunter</span> All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
