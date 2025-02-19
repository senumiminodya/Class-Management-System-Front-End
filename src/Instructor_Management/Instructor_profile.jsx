import React, { useEffect, useState } from "react";
import axios from "axios";
import { Instructor_Navbar } from "../Components/Instructor_Navbar";

export const Instructor_profile = ({ instructorId }) => {
  const userFormLocalStorage = JSON.parse(localStorage.getItem("user"));
  const [instructor, setInstructor] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [studentCounts, setStudentCounts] = useState({});

  useEffect(() => {

    if (!(userFormLocalStorage?.role === "instructor")) {
      window.location.href = "/";
    }
    const fetchInstructorData = async () => {
      try {
        // Fetch instructor details
        const instructorResponse = await axios.get(`http://localhost:5000/instructor/${userFormLocalStorage?.id}`);
        setInstructor(instructorResponse.data);

        // Fetch subjects and classes taught by the instructor
        const subjectsResponse = await axios.get(`http://localhost:5000/instructorclass/instructor/${userFormLocalStorage?.id}`);
        setSubjects(subjectsResponse.data);

        // Fetch student counts for each subject and class
        const counts = {};
        for (const subject of subjectsResponse.data) {
          const studentsResponse = await axios.get(`http://localhost:5000/studentclass/class/${subject.class}/subject/${subject.subject}`);
          counts[`${subject.subject}-${subject.class}`] = studentsResponse.data.length;
        }
        setStudentCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInstructorData();
  }, [instructorId]);

  if (!instructor) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Instructor_Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            Instructor Profile
          </h1>

          {/* Personal Details Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Personal Details</h2>
            <div className="space-y-3">
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-blue-600">Name:</span> {instructor.name}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-blue-600">Email:</span> {instructor.email}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-blue-600">Phone:</span> {instructor.phone}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-blue-600">Address:</span> {instructor.address}
              </p>
            </div>
          </div>

          {/* Subjects and Classes Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Subjects and Classes</h2>
            <ul className="space-y-4">
              {subjects.map((subject, index) => (
                <li
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <p className="text-xl font-semibold text-gray-800">
                    <span className="text-blue-600">Subject:</span> {subject.subject}
                  </p>
                  <p className="text-xl font-semibold text-gray-800">
                    <span className="text-purple-600">Class:</span> {subject.class}
                  </p>
                  <p className="text-xl font-semibold text-gray-800">
                    <span className="text-green-600">Students Enrolled:</span>{" "}
                    {studentCounts[`${subject.subject}-${subject.class}`] || 0}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};