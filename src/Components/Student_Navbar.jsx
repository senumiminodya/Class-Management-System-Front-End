import React from 'react'
import logo from '../assets/Logo.png'

export const Student_Navbar = () => {

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
                        <a href="/student/profile" className="hover:text-gray-200 transition">
                          Home
                        </a>
                      </li>
                      
                      <li>
                        <a href="/studentclass/enroll/student/class" className="hover:text-gray-200 transition">
                          Enroll Subject
                        </a>
                      </li>
                      <li>
                        <button onClick={handleLogout}>
                          logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </nav>
    </div>
  )
}
