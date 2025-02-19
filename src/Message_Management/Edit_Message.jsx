import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const Edit_Message = () => {
  const { id } = useParams(); // Get the message ID from the URL
  const navigate = useNavigate(); // For navigating back after editing

  const [messageData, setMessageData] = useState({
    subject: "",
    class: "",
    message: "",
    IID: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch the message by ID
  const fetchMessage = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/message/${id}`);
      setMessageData(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch the message.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/message/${id}`, messageData);
      alert("Message updated successfully!");
      navigate("/messages"); // Redirect back to the messages page
    } catch (err) {
      console.error(err);
      alert("Failed to update the message.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-[#3b5998] mb-6">Edit Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="subject"
            >
              Subject
            </label>
            <select
              value={messageData.subject}
              name="subject"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="class"
            >
              Class
            </label>
            <select
              name="class"
              value={messageData.class}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={messageData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="IID"
            >
              Instructor ID
            </label>
            <input
              type="text"
              id="IID"
              name="IID"
              value={messageData.IID}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              readOnly
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/messages")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#3b5998] text-white px-4 py-2 rounded hover:bg-[#2e4378] transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
