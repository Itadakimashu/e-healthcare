import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(null);

  // Check if the token is stored in localStorage on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem(ACCESS_TOKEN);
    if (savedToken) {
      setToken(true);
    } else {
      setToken(false); 
    }
  }, []);

 
  const handleLogout = () => {
    setToken(false);
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex item-center cursor-pointer gap-2 group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown icon" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex-col gap-4 p-4">
                <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-appoinments')} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={handleLogout} className="hover:text-black cursor-pointer">Log Out</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded-lg hidden md:block">
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
