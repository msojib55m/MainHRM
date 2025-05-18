import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { motion } from "framer-motion";

// fontawesome Icon start
// custome Image
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
const AttendanceOne = () => {
    // dashbord title
    // bulk insert show
    const [isOpen, setIsOpen] = useState(false);
    // bulk insert show

    const [attendanceTime, setAttendanceTime] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState("Select Employee");
    // loadding
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedEmployee) {
            alert("Please select an employee");
            return;
        }
        setLoading(true); // loading start
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/attendance",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // যদি Laravel এ CSRF না লাগে বা API টোকেন থাকে তবে সেটা যুক্ত করো
                    },
                    body: JSON.stringify({
                        employee_name: selectedEmployee, // যদি employee object হয়
                        attendance_time: attendanceTime,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Attendance saved!");
                // এখানে ফর্ম রিসেট বা অন্য কাজ করো
            } else {
                alert(
                    "Failed to save attendance: " +
                        (data.message || "Unknown error")
                );
            }
        } catch (error) {
            console.error("Error submitting attendance:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false); //  Stop loading
        }
    };

    // bulk insert

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    // loadding add

    const handleSubmitBluk = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file");
            return;
        }
        setLoading(true); // loading start
        const formData = new FormData();
        formData.append("bulk", file);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json", // ✅ Ensure Laravel understands JSON
                    },
                }
            );

            alert(response.data.message);
        } catch (error) {
            console.error("Upload failed:", error.response?.data);
            alert(
                "File upload failed: " + JSON.stringify(error.response?.data)
            );
        } finally {
            setLoading(false); //  Stop loading
        }
    };
    // toggle active now
    const dropdownRef = useRef(null);
    const [isOpenOne, setIsOpenOne] = useState(false);

    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/EmployNameAddNow")
            .then((res) => res.json())
            .then((data) => {
                setEmployees(Array.isArray(data) ? data : Object.values(data));
            })
            .catch((error) =>
                console.error("Error fetching employees:", error)
            );
    }, []);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpenOne(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredEmployees = employees.filter(
        (employee) =>
            typeof employee === "string" &&
            employee.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="">
                <div className="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] shadow-[0px_9px_26px_0px_#00000024]">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold mb-0">
                                Take attendance
                            </div>

                            <div
                                onClick={() => setIsOpen(true)}
                                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 py-2 rounded-lg flex items-center"
                            >
                                <FontAwesomeIcon
                                    className="text-lg"
                                    icon={faCirclePlus}
                                />
                                <span className="text-base md:text-lg">
                                    Bulk insert
                                </span>
                            </div>
                            {isOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center">
                                    <div className="fixed inset-0 bg-black opacity-50"></div>
                                    <motion.div
                                        initial={{
                                            y: "-100vh",
                                            opacity: 0,
                                        }}
                                        animate={{ y: "0", opacity: 1 }}
                                        exit={{ y: "-100vh", opacity: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeOut",
                                        }}
                                        className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]"
                                    >
                                        {/* Modal Header */}
                                        <div className="px-6 py-4 border-b">
                                            <h5 className="text-lg font-semibold">
                                                Bulk Insert
                                            </h5>
                                        </div>

                                        <form
                                            onSubmit={handleSubmitBluk}
                                            className="p-6"
                                        >
                                            <div className="text-center mb-4">
                                                <h6 className="text-lg font-medium">
                                                    Excel sample file:
                                                    <a
                                                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                                                        href="https://hrm.bdtask-demoserver.com/assets/import/bulk.xlsx"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        bulk.xlsx
                                                    </a>
                                                </h6>
                                            </div>
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                            />
                                            <div className="flex justify-end space-x-3 border-t pt-4">
                                                <button
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                    type="button"
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
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
                                                        "Import"
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="mt-[20px]" />
                    {/* Employ start */}
                    <div className="p-4 flex  md:px-6 mx-auto">
                        <form onSubmit={handleSubmit} className="w-[600px]">
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full md:w-full mt-3">
                                    <div className="flex flex-wrap px-[20px]">
                                        <div className="flex mt-5 justify-between">
                                            <div>
                                                <h4> employee name </h4>
                                            </div>
                                            <div
                                                className=" w-[44rem] relative ml-[80px]"
                                                ref={dropdownRef}
                                            >
                                                {/* Select Box */}
                                                <div
                                                    className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
                                                    onClick={() =>
                                                        setIsOpenOne(!isOpenOne)
                                                    }
                                                >
                                                    {selectedEmployee}
                                                </div>

                                                {/* Dropdown */}
                                                {isOpenOne && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            className="w-full h-10 px-2 py-1 text-gray-700 border-b border-gray-300"
                                                            value={search}
                                                            onChange={(e) =>
                                                                setSearch(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <ul className="w-full h-40 overflow-y-auto">
                                                            {filteredEmployees.length >
                                                            0 ? (
                                                                filteredEmployees.map(
                                                                    (
                                                                        employee,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                            onClick={() => {
                                                                                setSelectedEmployee(
                                                                                    employee
                                                                                );
                                                                                setIsOpenOne(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            {
                                                                                employee
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="px-4 py-2 text-gray-500">
                                                                    No results
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full md:w-full mt-3 flex px-[20px]">
                                    <label
                                        htmlFor="time"
                                        className="w-full sm:w-1/4 md:w-full xl:w-1/4 font-semibold text-gray-800"
                                    >
                                        Time{" "}
                                        <span className="text-red-600">*</span>
                                    </label>
                                    <div className="w-full sm:w-3/4 md:w-full xl:w-3/4">
                                        <input
                                            type="datetime-local"
                                            value={attendanceTime}
                                            onChange={(e) =>
                                                setAttendanceTime(
                                                    e.target.value
                                                )
                                            }
                                            required
                                            autoComplete="off"
                                            className="w-[667px] ml-[38px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 text-right">
                                <div className="flex justify-end mx-[20px] w-[835px]">
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
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
                                            "Submit"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Employ Ends */}
                </div>
            </div>
            <div className="relative">
                <div>
                    <footer className="bg-[#fff] mt-[20px] h-[60px]  rounded-lg ml-[0px]">
                        <div className="flex items-center justify-between pr-[20px] pl-[20px]">
                            <div className="">
                                <h1 className="mt-[20px]">
                                    © 2025 BDTASK , All Rights Reserved.
                                </h1>
                            </div>
                            <div className="mt-[20px]">
                                <div className="flex">
                                    <div>
                                        <h1>Designed by:</h1>
                                    </div>
                                    <div className="ml-[10px] text-[blue]">
                                        <p className="">Sojib</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default AttendanceOne;
