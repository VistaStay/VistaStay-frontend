import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaRss } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 w-full py-6 text-gray-300">
      <div className="flex flex-col items-center">
        {/* Social Media Icons */}
        <div className="flex gap-4 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
          >
            <FaYoutube size={20} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
          >
            <FaRss size={20} />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <p>Makes booking easy, offering the best rooms, exclusive deals, and personalized recommendations.</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-center mt-6">
  <p className="text-white font-bold">Copyright © 2025 sharada417. All Rights Reserved</p>
</div>

    </footer>
  );
};

export default Footer;