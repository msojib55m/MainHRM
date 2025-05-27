import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
    faFileExcel,
    faFileCsv,
    faRotate,
    faEye,
    faEdit,
    faTrash,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
const MainEmployList = () => {
    const [employees, setEmployees] = useState([]);

    const [loadingTable, setLoadingTable] = useState(true);
    const fetchEmployees = async () => {
        setLoadingTable(true);
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/EmpolySub");
            setEmployees(res.data);
        } catch (err) {
            console.error("Error fetching employees:", err);
        } finally {
            setLoadingTable(false); // ✅ লোডিং শেষ
        }
    };
    // Edit form work
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
    useEffect(() => {
        if (employees) {
            setFormData({ ...employees });
        }
    }, [employees]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [editForm, setEditForm] = useState(false);
    const AllEdit = (id) => {
        const selected = employees.find((emp) => emp.id === id);
        if (selected) {
            setFormData(selected);
            setEditForm(true);
        }
    };
    const [loading, setLoading] = useState(false);
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/SubEmpolyEdit/${formData.id}`,
                formData
            );

            if (response.status === 200) {
                // সফলভাবে আপডেট হয়েছে
                fetchEmployees();

                // ফর্ম রিসেট এবং বন্ধ
                setFormData({
                    id: "",
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
                setEditForm(false);
            }
        } catch (error) {
            if (error.response) {
                console.error("Error Response:", error.response.data);
                console.error("Status:", error.response.status);
            } else {
                console.error("Error:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (id) => {
        setDeletingId(id);

        try {
            await axios.delete(
                `http://localhost:8000/api/SubEmpolyDelete/${id}`
            );
            await fetchEmployees(); // DELETE শেষ হলে নতুন ডেটা লোড হবে
            console.log("Deleted and data reloaded");
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setDeletingId(null); // ✅ কাজ শেষ হলে রিসেট
        }
    };
    useEffect(() => {
        fetchEmployees();
    }, []);
    // সাচ ইনপুট
    const [searchTerm, setSearchTerm] = useState("");
    const [searching, setSearching] = useState(false);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSearching(true);

        // Debounce effect — 300ms পর সার্চ হবে
        setTimeout(() => {
            setSearching(false);
        }, 300);
    };
    const filteredEmployees = employees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.mobile.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // ভ্যালু সিলেক্ট
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const displayedEmployees =
        entriesPerPage === -1
            ? filteredEmployees
            : filteredEmployees.slice(0, entriesPerPage);
    const handleResetEmployees = async () => {
        try {
            const response = await axios.delete(
                "http://127.0.0.1:8000/api/employees/reset"
            );
            alert(response.data.message);
        } catch (error) {
            alert(
                "Error resetting employees: " +
                    (error.response?.data?.message || error.message)
            );
        }
    };

    return (
        <div className="mt-[20px] ml-[15px]">
            <div className="flex align-center justify-between">
                {/* Page handler now one */}
                <div className="mt-[20px]">
                    <label className="flex items-center space-x-2 text-gray-700">
                        <span>Show</span>
                        <select
                            className="border border-gray-300 rounded-md py-1 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={entriesPerPage}
                            onChange={(e) =>
                                setEntriesPerPage(parseInt(e.target.value))
                            }
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="-1">All</option>
                        </select>
                        <span>entries</span>
                    </label>
                </div>
                {/* Page handler now one */}
                {/* download now Excel and Csv */}
                <div className="">
                    <div className="bg-blue-500 text-white py-2 px-4 rounded-sm flex">
                        <button className="flex w-[70px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            <div>
                                <FontAwesomeIcon icon={faFileCsv} />
                            </div>
                            CSV
                        </button>
                        <button className="flex w-[70px]  bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Excel
                            <div>
                                <FontAwesomeIcon icon={faFileExcel} />
                            </div>
                        </button>
                    </div>
                </div>
                {/* download now Excel and Csv */}
                <div className="mt-[20px]">
                    <div className="flex align-center justify-center">
                        <div className="mt-[5px] mr-[3px]">
                            <label>Search :</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Search awards..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
                {/* download now Excel and Csv */}
                <div className="p-4">
                    {/* Reset Button */}
                    <button
                        onClick={handleResetEmployees}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Reset All Employees
                    </button>

                    {/* এখানে টেবিল বা অন্যান্য UI থাকবে */}
                </div>
            </div>
            <div className="mt-[20px]">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="text-left">
                        <tr className="">
                            <th className="border border-gray-300 px-4 py-2">
                                Sl
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Employee id
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Name of employee
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Email
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Mobile no
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Date of birth
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Designation
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Joining date
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                End date
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Status
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loadingTable || searching ? (
                            <tr>
                                <td colSpan="11" className="text-center py-4">
                                    <div className="flex items-center justify-center space-x-2 text-gray-500">
                                        <svg
                                            className="animate-spin h-5 w-5"
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
                                                d="M4 12a8 8 0 018-8v8z"
                                            ></path>
                                        </svg>
                                        <span>
                                            {searching
                                                ? "Searching..."
                                                : "Loading..."}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ) : displayedEmployees.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="11"
                                    className="text-center py-4 text-gray-500"
                                >
                                    No employees found.
                                </td>
                            </tr>
                        ) : (
                            displayedEmployees.map((emp, idx) => (
                                <tr key={emp.id} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2">
                                        {idx + 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {emp.employee_id}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {emp.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {emp.email}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {emp.mobile}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {emp.dob}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {emp.designation}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {emp.joining_date}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {emp.confirm_joining}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {emp.status}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => AllEdit(emp.id)}
                                            className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1 mt-[10px]"
                                            disabled={deletingId === emp.id}
                                        >
                                            {deletingId === emp.id ? (
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
                                                </div>
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {editForm && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md w-[900px] max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4 ">
                            Edit Employee
                        </h2>
                        <form onSubmit={handleUpdate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter Full Name"
                                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                        placeholder="example@email.com"
                                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile
                                    </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="01XXXXXXXXX"
                                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Joining Date
                                    </label>
                                    <input
                                        type="date"
                                        name="confirm_joining"
                                        value={formData.confirm_joining}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6 gap-4">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
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
                                        "Update"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditForm(false)}
                                    className="bg-red-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainEmployList;
