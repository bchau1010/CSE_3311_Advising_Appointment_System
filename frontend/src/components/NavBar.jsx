import React, { useState } from 'react'
import Button from './Button';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const NavBar = () => {
    let Links = [
        { name: "HOME", url: "/" },
        { name: "ABOUT", url: "/about" },
        { name: "BACKEND TEST", url: "/backendtest" },
        { name: "STUDENT HOME", url: "/studentHome" }
        
    ];

    let [open, setOpen] = useState(false);

    return (
        <header>
            <div className='shadow-md w-full fixed top-0 left-0'>
                <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
                        CSE-3311
                    </div>

                    <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                        {open ? <FiX /> : <FiMenu />}
                    </div>

                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                        {
                            Links.map((link) => (
                                <ul key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                                    <a href={link.url} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
                                </ul>
                            ))
                        }

                        <li className="md:ml-8 text-xl md:my-0 my-7 md:flex items-center">
                            <Link to="/login" className="md:mr-4 md:mb-0 mb-4 block">
                                <Button>
                                    LOGIN
                                </Button>
                            </Link>
                            <Link to="/signup" className="block">
                                <Button>
                                    SIGNUP
                                </Button>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="container mx-auto mt-20"></div>
        </header>
    )
}

export default NavBar