import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Instructor_Navbar } from "../Components/Instructor_Navbar";
import { Admin_Navbar } from "../Components/Admin_Navbar";

export const All_Messages = () => {
  const userFormLocalStorage = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]); // Ensure it's initialized as an array
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/message/IID/${userFormLocalStorage?.id}`
      );
      // Ensure response data is an array
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      setMessages([]); // Set to an empty array if an error occurs
    } finally {
      setLoading(false); // Stop loading once the request completes
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/message/${id}`);
      alert("Message deleted successfully!");
      fetchMessages(); // Refresh the messages after deletion
    } catch (err) {
      console.error(err);
      alert("Failed to delete the message.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
        {userFormLocalStorage?.role === 'instructor' ? (<Instructor_Navbar/>) : (<Admin_Navbar/>)}
        <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-[#3b5998] mb-6">View All Messages</h2>
        {messages.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#dfe3ee]">
                <th className="border border-gray-300 px-4 py-2">Subject</th>
                <th className="border border-gray-300 px-4 py-2">Class</th>
                <th className="border border-gray-300 px-4 py-2">Message</th>
                <th className="border border-gray-300 px-4 py-2">Instructor ID</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className="hover:bg-[#f7f7f7]">
                  <td className="border border-gray-300 px-4 py-2">{msg.subject}</td>
                  <td className="border border-gray-300 px-4 py-2">{msg.class}</td>
                  <td className="border border-gray-300 px-4 py-2">{msg.message}</td>
                  <td className="border border-gray-300 px-4 py-2">{msg.IID}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link to={`/message/edit/${msg._id}`}>
                    <button
                      className="mr-2 bg-[#8b9dc3] text-white px-3 py-1 rounded hover:bg-[#7185a9] transition"
                    >
                      Edit
                    </button></Link>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600 font-semibold">No messages found.</p>
        )}
      </div>
    </div>
    </div>
  );
};
