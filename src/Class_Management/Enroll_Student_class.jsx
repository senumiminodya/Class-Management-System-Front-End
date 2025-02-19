import React, { useState } from "react";
import axios from "axios";
import { Student_Navbar } from "../Components/Student_Navbar";

export const Enroll_Student_class = () => {
  const userFormLocalStorage = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    subject: "",
    class: "",
    SID: userFormLocalStorage?.id,
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/studentclass",
        formData
      );
      setMessage("Enrollment successful!");
      console.log("Enrollment response:", response.data);
      // Reset form after successful submission
      setFormData({
        subject: "",
        class: "",
        SID: "",
      });
    } catch (error) {
      setMessage("Error enrolling in subject. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div>
    <Student_Navbar/>
     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Enroll in a Subject
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <select
              value={formData.subject}
              name="subject"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">select</option>
              <option value="sinhala">Sinhala</option>
              <option value="english">English</option>
              <option value="tamil">Tamil</option>
              <option value="science">Science</option>
              <option value="mathematics">Mathematics</option>
              <option value="history">History</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="class"
              className="block text-sm font-medium text-gray-700"
            >
              Class
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">select</option>
              <option value="grade 6">Grade 6</option>
              <option value="grade 7">Grade 7</option>
              <option value="grade 8">Grade 8</option>
              <option value="grade 9">Grade 9</option>
              <option value="grade 10">Grade 10</option>
              <option value="grade 11">Grade 11</option>
              <option value="grade 12">Grade 12</option>
              <option value="grade 13">Grade 13</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="SID"
              className="block text-sm font-medium text-gray-700"
            >
              Student ID
            </label>
            <input
              type="text"
              id="SID"
              name="SID"
              value={formData.SID}
              onChange={handleChange}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? "Enrolling..." : "Enroll"}
            </button>
          </div>
          {message && (
            <div className="mt-4 text-center text-sm text-green-600">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
   </div>
  );
};
