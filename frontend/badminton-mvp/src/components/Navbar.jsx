import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaUser,
  FaCreditCard,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPen,
  FaTasks
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const guestMenu = [
    { name: "Login", action: onLoginClick },
    { name: "Signup", action: onSignupClick },
    { name: "About", path: "/about" },
  ];

  const userMenu = [
    { name: "Home", path: "/home", icon: <FaHome /> },
    { name: "Create Session", path: "/create-session", icon: <FaPen /> },
    { name: "Join Session", path: "/join-session", icon: <FaTasks /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Payment", path: "/payment", icon: <FaCreditCard /> },
    {
      name: "Logout",
      action: () => {
        logout();
        navigate("/");
      },
      icon: <FaSignOutAlt />,
    },
  ];

  const menuItems = user ? userMenu : guestMenu;

  return (
    <nav className="bg-black text-white w-full fixed top-0 shadow-md z-10">
      <div className="flex justify-between items-center px-6 md:px-16 h-16">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src="/images/logo1.png"
            alt="Match Matrix Logo"
            className="h-10 w-auto"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            Match Matrix
          </span>
        </div>

        {/* Hamburger button for small screen*/}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.action ? (
                <button
                  onClick={item.action}
                  className="flex items-center space-x-2 hover:text-green-300 transition duration-200"
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <span>{item.name}</span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    (isActive ? "text-green-400 " : "") +
                    "flex items-center space-x-2 hover:text-green-300 transition duration-200"
                  }
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <span>{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger menu dropdown */}
      {menuOpen && (
        <ul className="md:hidden bg-black px-6 pb-4 space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.action ? (
                <button
                  onClick={() => {
                    item.action();
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 hover:text-green-300 transition duration-200 w-full text-left"
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <span>{item.name}</span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    (isActive ? "text-green-400 " : "") +
                    "flex items-center space-x-2 hover:text-green-300 transition duration-200"
                  }
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <span>{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
