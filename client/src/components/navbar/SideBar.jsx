import React from "react";
import logo from "../../media/general/logo.png";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = ({ navItems, isOpen, setisOpen }) => {
  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="w-full h-screen bg-black opacity-40 fixed top-0 left-0 z-40"></div>

          {/* Sidebar */}
          <div className="bg-white fixed left-0 top-0 w-8/10 sm:w-[50%] h-screen p-10 z-50">
            <div className="flex items-center justify-between">
              <img src={logo} alt="logo" className="w-30" />
              <div
                className="border-gray-500 border cursor-pointer p-2 rounded-full"
                onClick={() => setisOpen(false)}
              >
                <FaTimes />
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-10">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="text-gray-600 hover:text-blue-600 font-medium uppercase border-b pb-4 pt-2"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SideBar;
