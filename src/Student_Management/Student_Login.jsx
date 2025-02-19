import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext } from 'react';

export const Student_Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post('http://localhost:5000/student/login', {
        email: email,
        password: password,
      });

      const user = await response.data
      setCurrentUser(user)

      // Check if the response is successful
      if (response.data && response.data.status === true) {
       
        navigate('/student/profile'); // Navigate to the instructor's profile
      } else {
        alert('Invalid credentials'); // Handle invalid credentials
      }
    } catch (error) {
      console.error('Error logging in:', error);

      // Handle specific errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with an error:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Invalid credentials'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
        alert('Error: No response from the server. Please try again.');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up the request:', error.message);
        alert('Error: Unable to process your request. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Student Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>
       
      </div>
    </div>
  );
}
