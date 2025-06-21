import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../media/general/logo.png";
import SideBar from "./SideBar";
const Navbar = () => {
    const [isOpen, setisOpen] = useState(false)
  const navItems = [
    {
      id: 0,
      name: "home",
      path: "/",
    },
    {
      id: 1,
      name: "about",
      path: "/about",
    },
    {
      id: 2,
      name: "services",
      path: "/services",
    },
    {
      id: 3,
      name: "portfolio",
      path: "/portfolio",
    },
    {
      id: 4,
      name: "blog",
      path: "/blog",
    },
    {
      id: 5,
      name: "contact",
      path: "/contact",
    },
  ];
  return (
    <nav className="bg-green-00  py-4  flex justify-center sm:justify-between  items-center max-w-7xl mx-auto">
      {/* Mobile menu button (hidden on larger screens) */}
      <button className="lg:hidden text-gray-600 focus:outline-none bg-amber-00"
      onClick={()=>setisOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {/* Logo section */}
      <div className="flex items-center px-5 sm:px-0 bg-yellow-00 w-[80%] sm:w-auto justify-center">
        <Link to="/">
          <img src={logo} alt="logo" className="cursor-pointer" />
        </Link>
      </div>

      {/* Navigation links */}
      <div className="hidden lg:flex space-x-6 xl:space-x-8">
        {navItems.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.path}
              className="text-gray-600 hover:text-blue-600 font-medium uppercase"
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="hidden md:flex">
        <button className="bg-blue-400 cursor-pointer py-4 px-6 rounded-full text-white font-bold">
          Get In Touch
        </button>
      </div>

      <SideBar navItems={navItems} isOpen={isOpen} setisOpen={setisOpen}/>
    </nav>
  );
};

export default Navbar;
