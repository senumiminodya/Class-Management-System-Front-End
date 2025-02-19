import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Main_Navbar } from '../Components/Main_Navbar';
import {Admin_Navbar} from "../Components/Admin_Navbar.jsx";

export const All_Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    const navigate = useNavigate();

    // Fetch all instructors
    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/instructor');
                setInstructors(response.data);
            } catch (error) {
                console.error('Error fetching instructors:', error);
            }
        };
        fetchInstructors();
    }, []);

    // Delete an instructor
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/instructor/${id}`);
            setInstructors(instructors.filter((instructor) => instructor._id !== id));
            alert('Instructor deleted successfully');
        } catch (error) {
            console.error('Error deleting instructor:', error);
        }
    };

    // Navigate to edit page (or open a modal)
    const handleEdit = (id) => {
        navigate(`/instructor/edit/${id}`);
    };

    return (
        <div>
            <Admin_Navbar/>
            <div className="p-6" style={{ backgroundColor: '#f7f7f7' }}>
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#3b5998' }}>
                Instructors
            </h1>
            <table className="min-w-full bg-white border" style={{ borderColor: '#8b9dc3' }}>
                <thead>
                    <tr style={{ backgroundColor: '#dfe3ee' }}>
                        <th className="py-2 px-4 border-b" style={{ color: '#3b5998', borderColor: '#8b9dc3' }}>
                            Name
                        </th>
                        <th className="py-2 px-4 border-b" style={{ color: '#3b5998', borderColor: '#8b9dc3' }}>
                            Email
                        </th>
                        <th className="py-2 px-4 border-b" style={{ color: '#3b5998', borderColor: '#8b9dc3' }}>
                            Phone
                        </th>
                        <th className="py-2 px-4 border-b" style={{ color: '#3b5998', borderColor: '#8b9dc3' }}>
                            Address
                        </th>
                        <th className="py-2 px-4 border-b" style={{ color: '#3b5998', borderColor: '#8b9dc3' }}>
                            Enroll Date
                        </th>
                        <th className="py-2 px-4 border-b" style={{ color: '#3b5998', borderColor: '#8b9dc3' }}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {instructors.map((instructor) => (
                        <tr key={instructor._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b text-center" style={{ borderColor: '#8b9dc3' }}>
                                {instructor.name}
                            </td>
                            <td className="py-2 px-4 border-b text-center" style={{ borderColor: '#8b9dc3' }}>
                                {instructor.email}
                            </td>
                            <td className="py-2 px-4 border-b text-center" style={{ borderColor: '#8b9dc3' }}>
                                {instructor.phone}
                            </td>
                            <td className="py-2 px-4 border-b text-center " style={{ borderColor: '#8b9dc3' }}>
                                {instructor.address}
                            </td>
                            <td className="py-2 px-4 border-b text-center" style={{ borderColor: '#8b9dc3' }}>
                            {new Date(instructor.createdAt).toISOString().slice(0, 10)}
                            </td>
                            <td className="py-2 px-4 border-b text-center" style={{ borderColor: '#8b9dc3' }}>
                                <button
                                    onClick={() => handleEdit(instructor._id)}
                                    className="text-white px-3 py-1 rounded mr-2"
                                    style={{ backgroundColor: '#3b5998' }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(instructor._id)}
                                    className="text-white px-3 py-1 rounded"
                                    style={{ backgroundColor: '#8b9dc3' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};
