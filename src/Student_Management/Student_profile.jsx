import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Student_Navbar } from '../Components/Student_Navbar';

export const Student_profile = ({ studentId }) => {
  const userFormLocalStorage = JSON.parse(localStorage.getItem("user"));
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentResponse = await axios.get(`http://localhost:5000/student/${userFormLocalStorage?.id}`);
        setStudent(studentResponse.data);

        const subjectsResponse = await axios.get(`http://localhost:5000/studentclass/SID/${userFormLocalStorage?.id}`);
        setSubjects(subjectsResponse.data);

        const messagesPromises = subjectsResponse.data.map(subject =>
          axios.get(`http://localhost:5000/message/class/${subject.class}/${subject.subject}`)
        );
        const messagesResponses = await Promise.all(messagesPromises);
        const allMessages = messagesResponses.flatMap(response => response.data);
        setMessages(allMessages);
        console.log(allMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStudentData();
  }, [userFormLocalStorage?.id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Student_Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Profile</h1>

          {/* Personal Details Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Details</h2>
            <div className="space-y-2">
              <p className="text-gray-600"><strong>Name:</strong> {student.name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {student.email}</p>
              <p className="text-gray-600"><strong>Phone:</strong> {student.phone}</p>
              <p className="text-gray-600"><strong>Address:</strong> {student.address}</p>
            </div>
          </div>

          {/* Enrolled Subjects Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Enrolled Subjects</h2>
            <ul className="space-y-2">
              {subjects.map((subject, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700"><strong>Subject:</strong> {subject.subject}</p>
                  <p className="text-gray-700"><strong>Class:</strong> {subject.class}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Messages Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Messages</h2>
            <ul className="space-y-4">
              {messages.map((message, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700"><strong>Class:</strong> {message.class}</p>
                  <p className="text-gray-700"><strong>Subject:</strong> {message.subject}</p>
                  <p className="text-gray-600 mt-2"><strong>Message:</strong> {message.message}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};