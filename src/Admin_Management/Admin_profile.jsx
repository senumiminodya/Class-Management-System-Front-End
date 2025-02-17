import React, { useState, useEffect } from "react";
import { Admin_Navbar } from "../Components/Admin_Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

export const Admin_profile = () => {
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const userFormLocalStorage = JSON.parse(localStorage.getItem("user"));

  if(!(userFormLocalStorage?.role === "admin")){
    window.location.href = "/admin/login";
  }

  // Fetch students data
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/student");
      setStudents(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch instructors data
  const fetchInstructors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/instructor");
      setInstructors(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchInstructors();
  }, []);

  return (
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <Admin_Navbar />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Dashboard</h2>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Students Count */}
            <Link to={`/students`} className="block">
              <div className="p-6 bg-blue-500 text-white rounded-2xl shadow-lg hover:bg-blue-600 transition">
                <h3 className="text-lg font-semibold">Total Students</h3>
                <p className="text-4xl font-bold mt-2">{students.length}</p>
              </div>
            </Link>

            {/* Instructors Count */}
            <Link to={`/instructors`} className="block">
              <div className="p-6 bg-green-500 text-white rounded-2xl shadow-lg hover:bg-green-600 transition">
                <h3 className="text-lg font-semibold">Total Instructors</h3>
                <p className="text-4xl font-bold mt-2">{instructors.length}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
  );
};
