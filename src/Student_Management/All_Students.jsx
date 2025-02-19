import React, { useEffect, useState } from "react";
import axios from "axios";
import { Instructor_Navbar } from "../Components/Instructor_Navbar";
import { Main_Navbar } from "../Components/Main_Navbar";

export const All_Students = () => {
  const userFormLocalStorage = JSON.parse(localStorage.getItem("user"));
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    IID: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/student");
      setStudents(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle edit form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle edit button click
  const handleEdit = (student) => {
    setEditingStudent(student._id);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
      password: "", // Keep password blank for editing
      IID: student.IID,
    });
  };

  // Save edited student
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.put(`http://localhost:5000/student/${editingStudent}`, formData);
      setMessage("Student updated successfully!");
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      setError("Failed to update student. Please try again.");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/student/${id}`);
      setMessage("Student deleted successfully!");
      fetchStudents();
    } catch (err) {
      setError("Failed to delete student. Please try again.");
    }
  };

  return (
   <div>
    {userFormLocalStorage?.role === 'instructor' ? (<Instructor_Navbar/>):(<Main_Navbar/>)}
     <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">All Students</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">Phone</th>
              <th className="p-2 border border-gray-300">Address</th>
              <th className="p-2 border border-gray-300">Actions</th>
              <th className="p-2 border border-gray-300">Instructor</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300">{student.name}</td>
                <td className="p-2 border border-gray-300">{student.email}</td>
                <td className="p-2 border border-gray-300">{student.phone}</td>
                <td className="p-2 border border-gray-300">{student.address}</td>
                <td className="p-2 border border-gray-300">{student.IID}</td>
                <td className="p-2 border border-gray-300">
                  <button
                    className="px-4 py-1 text-white bg-green-500 hover:bg-green-600 rounded-md mr-2"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingStudent && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Edit Student</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
   </div>
  );
};
