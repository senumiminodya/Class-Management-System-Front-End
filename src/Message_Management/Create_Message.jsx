import React, { useState } from "react";
import axios from "axios";
import { Instructor_Navbar } from "../Components/Instructor_Navbar";
import { Admin_Navbar } from "../Components/Admin_Navbar";

export const Create_Message = () => {
    const userFormLocalStorage = JSON.parse(localStorage.getItem("user"));
    const [formData, setFormData] = useState({
        subject: "",
        className: "",
        message: "",
        IID: userFormLocalStorage?.id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/message", formData);
            if (response.status === 201) {
                alert("Message created successfully!");
                setFormData({ subject: "", class: "", message: "", IID: "" });
            }
        } catch (err) {
            console.error("Error creating message:", err);
            alert("Failed to create the message. Please check the console for more details.");
        }
    };

    return (
       <div>
        {userFormLocalStorage?.role === 'instructor' ? (<Instructor_Navbar/>) : (<Admin_Navbar/>)}
         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#3b5998] mb-6">Create Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Subject</label>
                        <select value={formData.subject} name="subject" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b9dc3]">
                            <option value="" >select</option>
                            <option value="sinhala" >Sinhala</option>
                            <option value="english" defaultChecked>English</option>
                            <option value="tamil">Tamil</option>
                            <option value="science">Science</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="history">History</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Class</label>
                        <select name="class" value={formData.className} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b9dc3]">
                            <option value="" >select</option>
                            <option value="grade 6" >Grade 6</option>
                            <option value="grade 7">Grade 7</option>
                            <option value="grade 8" selected>Grade 8</option>
                            <option value="grade 9">Grade 9</option>
                            <option value="grade 10">Grade 10</option>
                            <option value="grade 11">Grade 11</option>
                            <option value="grade 12">Grade 12</option>
                            <option value="grade 13">Grade 13</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b9dc3]"
                            placeholder="Enter message"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Instructor ID</label>
                        <input
                            type="text"
                            name="IID"
                            value={formData.IID}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b9dc3]"
                            placeholder="Enter instructor ID"
                            readOnly
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#3b5998] text-white py-2 rounded-lg hover:bg-[#2e477d] transition"
                    >
                        Create Message
                    </button>
                </form>
            </div>
        </div>
       </div>
    );
};