import React from "react";
import { Main_Navbar } from "./Components/Main_Navbar";

export const Home = () => {
  return (
    <div className="font-sans">
     <Main_Navbar/>
      <div
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/classroom.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Welcome to Our Class Management System</h1>
          <p className="text-2xl mb-8">Empowering educators and students with seamless class management.</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us</h2>
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 p-4">
              <img
                src={"https://i.pinimg.com/736x/99/c5/4a/99c54adb256d5b96bf39b997984a3e5b.jpg"}
                alt="About Us"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <p className="text-gray-600 text-lg mb-4">
                Our Class Management System is designed to simplify the way educators and students interact. With
                intuitive tools for scheduling, attendance, and communication, we aim to create a seamless
                learning experience for everyone.
              </p>
              <p className="text-gray-600 text-lg">
                Whether you're an instructor managing multiple classes or a student keeping track of assignments,
                our platform has everything you need to stay organized and focused.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
          <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-lg mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-lg mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-lg mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg mb-4">Follow us on social media:</p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
          <p className="mt-6 text-gray-400">&copy; 2023 Class Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};