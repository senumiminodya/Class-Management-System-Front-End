import React, { useState } from "react";
import axios from "axios";
import { Instructor_Navbar } from "../Components/Instructor_Navbar";

export const Enroll_Instructor_Class = () => {
    const userFormLocalStorage = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    subject: "",
    class: "",
    IID: userFormLocalStorage?.id,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post("http://localhost:5000/instructorclass", formData);
      if (response.status === 201) {
        setMessage("Class enrolled successfully!");
        setFormData({ subject: "", class: "", IID: "" });
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to enroll the class. Please try again.");
    }
  };

  return (
    <div>
      <Instructor_Navbar/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Add Subject
        </h2>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-gray-700 font-medium mb-2"
            >
              Subject
            </label>
            <select value={formData.subject} name="subject" onChange={handleChange}  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="" >select</option>
                            <option value="sinhala" >Sinhala</option>
                            <option value="english" defaultChecked>English</option>
                            <option value="tamil">Tamil</option>
                            <option value="science">Science</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="history">History</option>
                        </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="class"
              className="block text-gray-700 font-medium mb-2"
            >
              Class
            </label>
            <select name="class" value={formData.class} onChange={handleChange}  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="" >select</option>
                            <option value="grade 6" >Grade 6</option>
                            <option value="grade 7">Grade 7</option>
                            <option value="grade 8">Grade 8</option>
                            <option value="grade 9">Grade 9</option>
                            <option value="grade 10">Grade 10</option>
                            <option value="grade 11">Grade 11</option>
                            <option value="grade 12">Grade 12</option>
                            <option value="grade 13">Grade 13</option>
                        </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="IID"
              className="block text-gray-700 font-medium mb-2"
            >
              Instructor ID
            </label>
            <input
              type="text"
              id="IID"
              name="IID"
              value={formData.IID}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Enroll Class
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

