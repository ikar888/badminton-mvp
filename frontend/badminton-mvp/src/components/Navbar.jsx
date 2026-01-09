import React from "react";
import { NavLink } from "react-router";
import { FaHome, FaUser, FaCreditCard, FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  const guestMenu = [
    { name: "Login", action: onLoginClick },
    { name: "Signup", action: onSignupClick },
    { name: "About", path: "/about" },
  ];

  const userMenu = [
    { name: "Home", path: "/home", icon: <FaHome /> },
    { name: "Session", path: "/session", icon: <FaUser /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Payment", path: "/payment", icon: <FaCreditCard /> },
    { name: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ];

  const menuItems = isLoggedIn ? userMenu : guestMenu;

  return (
    <nav className="bg-black text-white w-full fixed top-0 shadow-md z-10">
      <div className="flex justify-between items-center px-16 h-16">
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo1.png"
            alt="Match Matrix Logo"
            className="h-10 w-auto"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
            Match Matrix
          </span>
        </div>

        <ul className="flex space-x-6">
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
    </nav>
  );
};

export default Navbar;
