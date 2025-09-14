import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-custom-gradient text-white py-8">
      <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row lg:justify-between items-center gap-4">
        
        {/* Brand Section */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2">Linklytics</h2>
          <p className="text-gray-200 text-sm">
            Simplifying URL shortening for efficient sharing
          </p>
        </div>

        {/* Copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} Linklytics. All rights reserved.</p>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-300 transition-colors">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
