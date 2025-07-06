// DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  HiMenu, 
  HiX, 
  HiHome, 
  HiBookOpen, 
  HiUserGroup, 
  HiCog,
  HiTemplate,
  HiPhotograph,
  HiLogout,
  HiUser,
} from 'react-icons/hi';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { admin, signOut } = useAuth();
  
  // Debug: Log admin state
  console.log('Admin state in DashboardLayout:', admin);
  
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <HiHome size={20} /> },
    { path: '/admin/dashboard/blogs', label: 'Blogs', icon: <HiBookOpen size={20} /> },
    { path: '/admin/dashboard/admins', label: 'Admins', icon: <HiUserGroup size={20} /> },
    { path: '/admin/dashboard/settings', label: 'Settings', icon: <HiCog size={20} /> },
    { path: '/admin/dashboard/page-builder', label: 'Page Builder', icon: <HiTemplate size={20} /> },
    { path: '/admin/dashboard/portfolios', label: 'Portfolio', icon: <HiPhotograph size={20} /> }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen -mt-[80px] ">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-20 w-64 bg-gray-800 text-white h-full transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        
        {/* Admin Profile Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <HiUser size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">
                {admin ? (admin.name || admin.email || 'Admin User') : 'Admin User'}
              </p>
              <p className="text-xs text-gray-300">Administrator</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 transition-colors duration-200 hover:bg-gray-700 ${
                location.pathname === item.path ? 'bg-gray-700 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        {/* Logout Section */}
        <div className="mt-auto p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200 rounded-md"
          >
            <HiLogout size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className=" flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* Nested routes render here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;