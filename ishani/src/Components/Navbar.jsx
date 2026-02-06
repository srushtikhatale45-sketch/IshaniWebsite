import React from 'react'
import { NavLink } from 'react-router-dom'
import  {logo}  from '../assets'
function Navbar() {
  return (

    <div className='bg-white p-8  fixed w-full z-40 top-0 gap-10'>
     <div className='h-0 w-24' >
        <img src={logo} alt="Logo" />

        </div>
    <div className='flex gap-10 justify-end mr-2'>
       

        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/contact'>Contact</NavLink>
        <NavLink to='/gallery'>Gallery</NavLink>
        <NavLink to='/product'>Product</NavLink>
    </div>
    </div>
    
  )
  
}

export default Navbar