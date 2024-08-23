import React from 'react'
import logo from '../assets/CyberHunterLogo.png'

export default function Header() {
  return (
    <div className='flex items-center gap-2 relative px-10  w-screen overflow-hidden bg-black top-0 z-30 py-2 text-white'>
        <img src={logo} className='w-12 object-cover aspect-auto' alt="" />
        <h1 className='text-2xl font-bold'><span className='text-[#5CE1E6]'>Cyber</span> Hunter</h1>
    </div>
  )
}
