import React from 'react'
import logo from '../assets/Logo.png'
export const Instructor_Navbar = () => {

  const handleLogout = () => {
    // Remove the 'user' key from local storage
    localStorage.removeItem("user");
    // Optionally, redirect the user to the login page or home page
    window.location.href = "/"; // Change this to your desired redirect path
  };

  return (
    <div>
        <nav className="bg-blue-600 text-white p-4 shadow-md ">
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
                        <a href="/instructor/profile" className="hover:text-gray-200 transition">
                          Home
                        </a>
                      </li>
                      <li>
                        <a href="/students" className="hover:text-gray-200 transition">
                         All Students
                        </a>
                      </li>
                      <li>
                        <a href="/student/signup" className="hover:text-gray-200 transition">
                          Add Student
                        </a>
                      </li>
                      <li>
                        <a href="/message/create" className="hover:text-gray-200 transition">
                          Create Message
                        </a>
                      </li>
                      <li>
                        <a href="/messages" className="hover:text-gray-200 transition">
                          Messages
                        </a>
                      </li>
                      <li>
                        <a href="/enroll/insructor/class" className="hover:text-gray-200 transition">
                         Enroll Subject
                        </a>
                      </li>
                      <li>
                       <button onClick={handleLogout} className="hover:text-gray-200 transition">Logout</button>
                      </li>
                    </ul>
                  </div>
                </nav>
    </div>
  )
}
