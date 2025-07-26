"use client";

import React, { useState } from "react";
import { BiBell } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { CgMenu } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Login from "@/app/(UserPanel)/(Auth)/(Login)/Login/Login";
import { useAuth } from "@/context/AuthContext";
import { LuLogOut } from "react-icons/lu";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { logout, user } = useAuth();
  const navLinks = ["Home", "Map", "Itinerary", "My-Travel-Book"];

  return (
    <>
      <header className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 bg-gradient-to-r from-slate-50 to-slate-100 h-24 w-full border-b border-slate-200 shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-600 group-hover:to-blue-500">
            TravelBook
          </span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex gap-8 ml-4">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
              className="relative text-slate-600 font-medium text-lg hover:text-slate-900 transition-colors duration-200 group/nav"
            >
              {link.replaceAll("-", " ")}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover/nav:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Notification */}
          <div className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer">
            <BiBell className="w-6 h-6 text-slate-600" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full -translate-y-1/2 translate-x-1/2 shadow-sm">
              4
            </span>
          </div>

          {/* Profile (Desktop) */}
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="relative">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-10 h-10 rounded-full ring-2 ring-blue-400/30 object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-50"></div>
            </div>
            <div className="flex flex-col -space-y-1">
              <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
            </div>
          </div>

          {/* Login Button */}
          {user ? (
            isMenuOpen ? (
              <LuLogOut onClick={logout} size={26} />
            ) : null
          ) : (
            <Login />
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
              {isMenuOpen ? <MdClose className="h-8 w-8" /> : <CgMenu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar (Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >        
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-64 bg-white shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pb-6 border-b border-slate-200"
                >
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    TravelBook
                  </span>
                </motion.div>

                {/* Sidebar Nav Links */}
                <motion.nav
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                    },
                  }}
                  className="flex flex-col mt-6 gap-4"
                >
                  {navLinks.map((link) => (
                    <motion.div
                      key={link}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                        className="px-4 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-lg font-medium">{link.replaceAll("-", " ")}</span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* Sidebar Profile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto pt-6 border-t border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full ring-2 ring-blue-400/30 object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                    </div>
                    <div className="flex flex-col -space-y-1">
                      <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="mt-6 border-t border-slate-200 w-full text-left pt-5"
                  >
                    Sign Out
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;