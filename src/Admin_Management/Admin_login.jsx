import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../UserContext';
import { Main_Navbar } from '../Components/Main_Navbar';

export const Admin_Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setCurrentUser} = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request
      const response = await axios.post('http://localhost:5000/admin/login', {
        email: email,
        password: password,
      });

      const user = await response.data
      setCurrentUser(user)

      // Check if the response is successful
      if (response.data && response.data.status === true) {
       
        navigate('/admin/profile'); // Navigate to the instructor's profile
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
   <div>
    <Main_Navbar/>
     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
   </div>
  );
};