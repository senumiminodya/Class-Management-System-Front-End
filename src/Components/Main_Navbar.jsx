import React from "react";
import logo from "../assets/Logo.png"
export const Main_Navbar = () => {
  const userFormLocalStorage = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      
        <nav className="bg-blue-600 text-white p-4 shadow-md  fixed top-0 w-full z-10">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo and Name */}
            <div className="flex items-center">
              <img
                src={logo} // Replace with your logo path
                alt="Logo"
                className="h-12 w-12 mr-3"
              />
              <span className="text-xl font-bold">Class Management System</span>
            </div>

            {/* Navigation Tabs */}
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="hover:text-gray-200 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/instructor/login" className="hover:text-gray-200 transition">
                  Instructor Login
                </a>
              </li>
              <li>
                <a href="/student/login" className="hover:text-gray-200 transition">
                  Student Login
                </a>
              </li>
              
            </ul>
          </div>
        </nav>
    
    </div>
  );
};
