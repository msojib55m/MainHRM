import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { motion } from "framer-motion";

// fontawesome Icon start
// custome Image
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
const AttendaceMonthlyOne = () => {
    // Employ name state start
    const [selectedEmployee, setSelectedEmployee] = useState("Select Employee");
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
    // Employ name state  Ends

    // Year start
    const [isOpen, setIsOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState("");
    const years = Array.from({ length: 30 }, (_, i) => 2025 - i);
    const dropdownRefYear = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRefYear.current &&
                !dropdownRefYear.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // Year Ends

    // Month start
    const [isOpenMonth, setIsOpenMonth] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("");

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const dropdownRefMonth = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRefMonth.current &&
                !dropdownRefMonth.current.contains(event.target)
            ) {
                setIsOpenMonth(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // Month Ends

    // time start
    const [isOpenTimeStart, setIsOpenTimeStart] = useState(false);
    const [selectedTime, setSelectedTime] = useState("");

    const generateTimes = () => {
        const times = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 30) {
                const hour = h.toString().padStart(2, "0");
                const minute = m.toString().padStart(2, "0");
                times.push(`${hour}:${minute}`);
            }
        }
        return times;
    };

    const timeOptions = generateTimes();

    const dropdownRefTimeStart = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRefTimeStart.current &&
                !dropdownRefTimeStart.current.contains(event.target)
            ) {
                setIsOpenTimeStart(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // time start

    // time Ends start
    const [selectedTimeEnd, setSelectedTimeEnd] = useState("");
    const [isOpenEnd, setIsOpenEnd] = useState(false);
    const dropdownRefEnd = useRef(null);

    const generateTimesEnd = () => {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const h = hour.toString().padStart(2, "0");
                const m = minute.toString().padStart(2, "0");
                times.push(`${h}:${m}`);
            }
        }
        return times;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRefEnd.current &&
                !dropdownRefEnd.current.contains(event.target)
            ) {
                setIsOpenEnd(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // time Ends Ends
    // loading add now
    const [loading, setLoading] = useState(false);
    // data to send now laravel
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            employee_name: selectedEmployee,
            year: selectedYear,
            month: selectedMonth,
            time_in: selectedTime,
            time_out: selectedTimeEnd,
        };
        setLoading(true); // Start loading
        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/attendanceMonthly",
                payload
            );
        } catch (err) {
            console.error(err);
            alert("Error submitting attendance");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <div className="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] shadow-[0px_9px_26px_0px_#00000024] ">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold mb-0">
                        Take attendance
                    </div>
                </div>
                <div className="mt-[10px]">
                    <hr />
                </div>
                <div className=" p-4 bg-white shadow rounded-lg ">
                    <form onSubmit={handleSubmit}>
                        {/* Employee Select */}
                        <div className="flex flex-col md:flex-row md:items-center mt-5 justify-between">
                            <div className="mb-2 md:mb-0 md:mr-4 font-semibold text-gray-700">
                                Employee Name
                                <span className="text-red-500">*</span>
                            </div>
                            <div
                                className=" relative w-full md:w-[50rem]"
                                ref={dropdownRef}
                            >
                                {/* Select Box */}
                                <div
                                    className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
                                    onClick={() => setIsOpenOne(!isOpenOne)}
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
                                                setSearch(e.target.value)
                                            }
                                        />
                                        <ul className="w-full h-40 overflow-y-auto">
                                            {filteredEmployees.length > 0 ? (
                                                filteredEmployees.map(
                                                    (employee, index) => (
                                                        <li
                                                            key={index}
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
                                                            {employee}
                                                        </li>
                                                    )
                                                )
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">
                                                    No results found
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Year Select */}
                        {/* <div className="flex mt-5 justify-between">
                            <div>Year *</div>
                            <div
                                className="relative w-[70rem]"
                                ref={dropdownRefYear}
                            >
                                <div
                                    className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {selectedYear || "Select one"}
                                </div>
                                {isOpen && (
                                    <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow z-10 max-h-60 overflow-y-auto">
                                        {years.map((year) => (
                                            <li
                                                key={year}
                                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedYear(year);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {year}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div> */}
                        <div className="flex flex-col md:flex-row md:items-center mt-5 justify-between">
                            <div className="mb-2 md:mb-0 md:mr-4 font-semibold text-gray-700">
                                Year <span className="text-red-500">*</span>
                            </div>

                            <div
                                className="relative w-full md:w-[50rem]"
                                ref={dropdownRefYear}
                            >
                                <div
                                    className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {selectedYear || "Select one"}
                                </div>

                                {isOpen && (
                                    <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow z-10 max-h-60 overflow-y-auto">
                                        {years.map((year) => (
                                            <li
                                                key={year}
                                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedYear(year);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {year}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Month Select */}
                        <div className="flex flex-col md:flex-row md:items-center mt-5 justify-between">
                            {/* Select Box */}
                            <div className="mb-2 md:mb-0 md:mr-4 font-semibold text-gray-700">
                                Month <span className="text-red-500">*</span>
                            </div>
                            <div
                                className="relative w-full md:w-[50rem]"
                                ref={dropdownRefMonth}
                            >
                                <div
                                    className="border border-gray-300 rounded-lg p-2 bg-white cursor-pointer"
                                    onClick={() => setIsOpenMonth(!isOpenMonth)}
                                >
                                    {selectedMonth || "Select Month"}
                                </div>

                                {/* Dropdown List */}
                                {isOpenMonth && (
                                    <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow z-10 max-h-60 overflow-y-auto">
                                        {months.map((month, index) => (
                                            <li
                                                key={index}
                                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedMonth(month);
                                                    setIsOpenMonth(false);
                                                }}
                                            >
                                                {month}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Time In */}
                        <div className="flex flex-col md:flex-row md:items-center mt-5 justify-between">
                            <label className="mb-2 md:mb-0 md:mr-4 font-semibold text-gray-700">
                                Time In <span className="text-red-500">*</span>
                            </label>

                            <div
                                className="relative w-full md:w-[50rem]"
                                ref={dropdownRefTimeStart}
                            >
                                <input
                                    type="text"
                                    value={selectedTime}
                                    onClick={() =>
                                        setIsOpenTimeStart(!isOpenTimeStart)
                                    }
                                    readOnly
                                    required
                                    placeholder="select time"
                                    className="w-full border border-gray-300 rounded-lg p-2 mt-1 bg-white cursor-pointer focus:ring focus:ring-blue-200"
                                />
                                {isOpenTimeStart && (
                                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                        {timeOptions.map((time, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedTime(time);
                                                    setIsOpenTimeStart(false);
                                                }}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {time}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Time Out */}
                        <div className="flex flex-col md:flex-row md:items-center mt-5 justify-between">
                            <label className="mb-2 md:mb-0 md:mr-4 font-semibold text-gray-700">
                                Time Out <span className="text-red-500">*</span>
                            </label>

                            <div
                                className="relative w-full md:w-[50rem]"
                                ref={dropdownRefEnd}
                            >
                                <input
                                    type="text"
                                    value={selectedTimeEnd}
                                    onClick={() => setIsOpenEnd(!isOpenEnd)}
                                    readOnly
                                    required
                                    placeholder="select time"
                                    className="w-full border border-gray-300 rounded-lg p-2 mt-1 bg-white cursor-pointer focus:ring focus:ring-blue-200"
                                />
                                {isOpenEnd && (
                                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                        {generateTimesEnd().map((time, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedTimeEnd(time);
                                                    setIsOpenEnd(false);
                                                }}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {time}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-right mt-[20px]">
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
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
                    </form>
                </div>
            </div>
            {/* footer */}
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

export default AttendaceMonthlyOne;
