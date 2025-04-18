import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from './images/weather-app.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in when component mounts
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/signin');
    };

    const handleGetStarted = () => {
        if (user) {
            navigate('/dashboard'); // Or wherever you want logged-in users to go
        } else {
            navigate('/signup');
        }
    };

    return (
        <div className="overflow-x-hidden relative w-screen flex p-2">
            <nav className="flex w-[99%] justify-between items-center p-4 shadow-md bg-black rounded-2xl font-bold">
                <div className="flex flex-row items-center text-xl hover:cursor-pointer">
                    <a href="/" className="flex flex-row justify-center items-center gap-2 hover:text-gray-400">
                        <img src={logo} alt="logo" className="w-10 h-10" />
                        WeatherApp
                    </a>
                </div>
                <div className="relative flex flex-row items-center text-[#2871a2]">
                    <ul className="w-[400px] flex flex-row items-center list-none justify-around">
                        <li className="relative group">
                            <NavLink to="/home" className="hover:text-[#2871a275]">
                                Home
                            </NavLink>
                            <div className="absolute left-0 bottom-[-20px] w-0 h-[2.5px] bg-[#2871a2] transition-all duration-300 group-hover:w-full"></div>
                        </li>
                        <span className="text-gray-300">|</span>
                        <li className="relative group">
                            <NavLink to="/search" className="hover:text-[#2871a275]">
                                Search
                            </NavLink>
                            <div className="absolute left-0 bottom-[-20px] w-0 h-[2.5px] bg-[#2871a2] transition-all duration-300 group-hover:w-full"></div>
                        </li>
                        <span className="text-gray-300">|</span>
                        <li className="relative group">
                            <NavLink to="/graph" className="hover:text-[#2871a275]">
                                Graph
                            </NavLink>
                            <div className="absolute left-0 bottom-[-20px] w-0 h-[2.5px] bg-[#2871a2] transition-all duration-300 group-hover:w-full"></div>
                        </li>
                        <span className="text-gray-300">|</span>
                        <li className="relative group">
                            <NavLink to="/map" className="hover:text-[#2871a275]">
                                Map
                            </NavLink>
                            <div className="absolute left-0 bottom-[-20px] w-0 h-[2.5px] bg-[#2871a2] transition-all duration-300 group-hover:w-full"></div>
                        </li>
                        <span className="text-gray-300">|</span>
                        <li className="relative group">
                            <NavLink to="/news" className="hover:text-[#2871a275]">
                                News
                            </NavLink>
                            <div className="absolute left-0 bottom-[-20px] w-0 h-[2.5px] bg-[#2871a2] transition-all duration-300 group-hover:w-full"></div>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <span className="text-[#2871a2] font-bold">
                                {user.firstName}
                            </span>
                            <span className="text-gray-300">|</span>
                            <button 
                                onClick={handleLogout}
                                className="text-[#2871a2] font-bold hover:text-[#2871a275]"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/signup" className="text-[#2871a2] font-bold hover:text-[#2871a275]">
                                Sign Up
                            </NavLink>
                            <span className="text-gray-300">|</span>
                            <NavLink to="/signin" className="text-[#2871a2] font-bold hover:text-[#2871a275]">
                                Log In
                            </NavLink>
                        </>
                    )}
                    {/* <button 
                        className="bg-[#2871a2] font-bold py-2 px-3.5 rounded-xl hover:opacity-70"
                        onClick={handleGetStarted}
                    >
                        {user ? 'Dashboard' : 'Get started'}
                    </button> */}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;