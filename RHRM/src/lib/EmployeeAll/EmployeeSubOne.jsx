import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeSubOne = () => {
    const [formData, setFormData] = useState({
        employee_id: "",
        name: "",
        email: "",
        mobile: "",
        dob: "",
        designation: "",
        joining_date: "",
        confirm_joining: "",
        status: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Step 1: Check what data is being sent

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/employees",
                formData
            );

            // Step 2: See the response from backend

            // Step 3: Optional - reset form
            setFormData({
                employee_id: "",
                name: "",
                email: "",
                mobile: "",
                dob: "",
                designation: "",
                joining_date: "",
                confirm_joining: "",
                status: "",
            });
        } catch (err) {
            alert(
                "Server error occurred: " +
                    (err.response?.data?.message || err.message)
            );
        } finally {
            setLoading(false); //  Stop loading
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl ">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                All Employees
            </h1>

            <form action="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employee ID
                        </label>
                        <input
                            type="text"
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleChange}
                            placeholder="Enter Employee ID"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 "
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name of Employee
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="mdsojibmia694@gmail.com"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile No
                        </label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="01XXXXXXXXX"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Designation
                        </label>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Joining Date
                        </label>
                        <input
                            type="date"
                            name="joining_date"
                            value={formData.joining_date}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Joining
                        </label>
                        <input
                            type="date"
                            name="confirm_joining"
                            value={formData.confirm_joining}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="col-span-full flex flex-col md:flex-row items-center justify-end gap-3 mt-6">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Processing...
                                </div>
                            ) : (
                                "save"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EmployeeSubOne;
