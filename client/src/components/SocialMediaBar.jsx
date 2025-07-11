import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const socials = [
  { icon: <FaFacebookF />, url: 'https://www.facebook.com/share/1BLxJKtqrB/', label: 'Facebook', color: 'text-[#1877F3]' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/marsevtech?igsh=MXFwamlrOGt0cDY5dw==', label: 'Instagram', color: 'text-[#E4405F]' },
  { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/company/marsevtech/', label: 'LinkedIn', color: 'text-[#0A66C2]' },
];

const SocialMediaBar = () => {
  const location = useLocation();
  // Hide on admin dashboard routes
  if (location.pathname.startsWith('/admin/dashboard')) return null;
  return (
    <div className="hidden md:flex flex-col fixed left-2 bottom-0 z-40 space-y-3">
      {socials.map(({ icon, url, label, color }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`group transition-all duration-300 flex items-center justify-center`}
          style={{ transition: 'all 0.3s cubic-bezier(.4,2,.6,1)' }}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-black shadow-md border-2 border-white group-hover:border-red-600 group-hover:shadow-red-400 group-hover:shadow-lg transition-all duration-300`}
            style={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            }}
          >
            <span
              className={`text-2xl ${color} group-hover:text- group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}
              style={{ display: 'inline-block' }}
            >
              {icon}
            </span>
          </span>
        </a>
      ))}
      <div className="w-0.5 h-16 bg-red-600 mx-auto mt-2" />
    </div>
  );
};

export default SocialMediaBar; 