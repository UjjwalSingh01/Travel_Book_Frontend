import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-3xl font-bold mb-3">Travel Book</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create and share your travel experiences with a beautifully
              curated digital book.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/about" className="hover:text-gray-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-gray-300">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Policies</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/privacy-policy" className="hover:text-gray-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/cookie-policy" className="hover:text-gray-300">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-of-agreement" className="hover:text-gray-300">
                    Terms of Agreement
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gray-300 text-xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Travel Book. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;