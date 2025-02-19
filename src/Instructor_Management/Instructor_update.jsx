import { useEffect, useState } from "react";
import axios from "axios";
import { Main_Navbar } from "../Components/Main_Navbar";
import { useParams, useNavigate } from "react-router-dom";

export const Instructor_update = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    // password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    // Fetch instructor details to pre-fill the form
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/instructor/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      }
    };
    fetchInstructor();
  }, [id]);

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return "Name can only contain letters and spaces";
        }
        return "";
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          return "Phone number must be exactly 10 digits";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input field
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const formErrors = {
      name: validate("name", formData.name),
      phone: validate("phone", formData.phone),
    };

    setErrors(formErrors);

    // Prevent submission if there are errors
    if (Object.values(formErrors).some((error) => error !== "")) {
      console.error("Form validation failed");
      return;
    }

    try {
      // Handle password encryption on the backend if necessary
      await axios.put(`http://localhost:5000/instructor/${id}`, formData);
      alert("Instructor updated successfully");
      navigate("/instructors"); // Redirect to the instructors list
    } catch (error) {
      console.error("Error updating instructor:", error);
    }
  };

  return (
    <div>
      <Main_Navbar />
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-bold text-[#3b5998]">
              Update Instructor
            </h2>
            <p className="mt-2 text-center text-sm text-[#8b9dc3]">
              Update the details of the instructor
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-[#3b5998] font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#dfe3ee] placeholder-[#8b9dc3] text-gray-900 focus:outline-none focus:ring-[#3b5998] focus:border-[#3b5998] sm:text-sm"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-[#3b5998] font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#dfe3ee] placeholder-[#8b9dc3] text-gray-900 focus:outline-none focus:ring-[#3b5998] focus:border-[#3b5998] sm:text-sm"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-[#3b5998] font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#dfe3ee] placeholder-[#8b9dc3] text-gray-900 focus:outline-none focus:ring-[#3b5998] focus:border-[#3b5998] sm:text-sm"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="text-[#3b5998] font-medium">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows="3"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#dfe3ee] placeholder-[#8b9dc3] text-gray-900 focus:outline-none focus:ring-[#3b5998] focus:border-[#3b5998] sm:text-sm"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b5998] hover:bg-[#8b9dc3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b5998] transition-colors duration-200"
              >
                Update Instructor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
