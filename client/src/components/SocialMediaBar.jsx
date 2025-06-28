import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const socials = [
  { icon: <FaFacebookF />, url: 'https://facebook.com', label: 'Facebook', color: 'text-[#1877F3]' },
  { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter', color: 'text-[#1DA1F2]' },
  { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram', color: 'text-[#E4405F]' },
  { icon: <FaLinkedinIn />, url: 'https://linkedin.com', label: 'LinkedIn', color: 'text-[#0A66C2]' },
  { icon: <FaGithub />, url: 'https://github.com', label: 'GitHub', color: 'text-black' },
];

const SocialMediaBar = () => (
  <div className="hidden md:flex flex-col fixed left-4 top-2/5 z-40 space-y-3">
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
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md border-2 border-white group-hover:border-red-600 group-hover:shadow-red-400 group-hover:shadow-lg transition-all duration-300`}
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

export default SocialMediaBar; 