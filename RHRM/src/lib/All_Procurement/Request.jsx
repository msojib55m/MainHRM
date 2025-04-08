import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// fontawesome Icon start
// custome Image
import {
    faCirclePlus,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Request = () => {
    const [openRequest, setRequest] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedEmployee, setSelectedEmployee] = useState("Select potion");
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // two selected now

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/employees")
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
                setIsOpen(false);
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
    // 2nd now
    const dropdownRefOne = useRef(null);

    const [positions, setPositions] = useState([]);
    const [filteredPositions, setFilteredPositions] = useState([]);
    const [searchOne, setSearchOne] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("Select position");
    const [isOpenOne, setIsOpenOne] = useState(false);
    // users date now

    // API থেকে ডেটা আনা
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/positionsOne")
            .then((response) => {
                setPositions(response.data);
                setFilteredPositions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching positions:", error);
            });
    }, []);

    // সার্চ ফিল্টার
    useEffect(() => {
        const filtered = positions.filter((pos) =>
            pos.toLowerCase().includes(searchOne.toLowerCase())
        );
        setFilteredPositions(filtered);
    }, [searchOne, positions]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRefOne.current &&
                !dropdownRefOne.current.contains(event.target)
            ) {
                setIsOpenOne(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                <div class="flex items-center justify-between w-[auto] ">
                    <div>
                        <h6 class="text-lg font-semibold mb-0">Request list</h6>
                    </div>
                    <div className="">
                        <button
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                            onClick={() => setRequest(true)}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <div className="ml-[5px]">Add new request</div>
                        </button>
                    </div>
                </div>
            </div>
            {openRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Background Overlay */}
                    <div className="fixed inset-0 bg-black opacity-50"></div>

                    {/* Position Form */}
                    <div className="w-[1200px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                        <h5 className="text-lg font-semibold">Add request</h5>
                        <hr className="border-t-1 border-gray-300 mt-2" />

                        {/* Input Fields */}
                        <form>
                            <div className="mt-4 ">
                                <div className="flex flex-col items-center mt-10 max-w-[1200px] mx-auto gap-6">
                                    {/* First Row: Employee Dropdown & Department Dropdown */}
                                    <div className="grid grid-cols-2 gap-6 w-full">
                                        {/* Employee Dropdown */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-[180px]">
                                                <h4 className="text-sm font-medium text-gray-700">
                                                    Requesting person *
                                                </h4>
                                            </div>
                                            <div
                                                className="w-full relative"
                                                ref={dropdownRef}
                                            >
                                                <div
                                                    className="h-10 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                                                    onClick={() =>
                                                        setIsOpen(!isOpen)
                                                    }
                                                >
                                                    {selectedEmployee}
                                                </div>

                                                {isOpen && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            className="w-full h-10 px-3 py-1 text-gray-700 border border-gray-300 rounded-t-lg focus:outline-none"
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
                                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                                            onClick={() => {
                                                                                setSelectedEmployee(
                                                                                    employee
                                                                                );
                                                                                setIsOpen(
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

                                        {/* Department Dropdown */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-[180px]">
                                                <h4 className="text-sm font-medium text-gray-700">
                                                    Requesting department *
                                                </h4>
                                            </div>
                                            <div
                                                className="w-full relative"
                                                ref={dropdownRefOne}
                                            >
                                                <div
                                                    className="h-10 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                                                    onClick={() =>
                                                        setIsOpenOne(!isOpenOne)
                                                    }
                                                >
                                                    {selectedPosition}
                                                </div>

                                                {isOpenOne && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            className="w-full h-10 px-3 py-1 text-gray-700 border border-gray-300 rounded-t-lg focus:outline-none"
                                                            value={searchOne}
                                                            onChange={(e) =>
                                                                setSearchOne(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <ul className="w-full h-40 overflow-y-auto">
                                                            {filteredPositions.length >
                                                            0 ? (
                                                                filteredPositions.map(
                                                                    (
                                                                        position,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                                            onClick={() => {
                                                                                setSelectedPosition(
                                                                                    position
                                                                                );
                                                                                setIsOpenOne(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            {
                                                                                position
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

                                    {/* Second Row: Two Text Inputs */}
                                    <div className="grid grid-cols-2 gap-6 w-full">
                                        {/* First Input */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-[180px]">
                                                <h4 className="text-sm font-medium text-gray-700">
                                                    Expected date to have the
                                                    good starts *
                                                </h4>
                                            </div>
                                            <input
                                                type="date"
                                                className="w-full h-10 px-3 py-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none"
                                            />
                                        </div>

                                        {/* Second Input */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-[180px]">
                                                <h4 className="text-sm font-medium text-gray-700">
                                                    Expected date to have the
                                                    good ends *
                                                </h4>
                                            </div>
                                            <input
                                                type="date"
                                                className="w-full h-10 px-3 py-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* active selected start */}

                                {/* active selected end */}
                                {/* Buttons */}
                                <div className="w-[700px] flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="px-4 h-[40px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
                                        disabled={loading} // সাবমিট বাটন ডিসেবল হবে যখন লোডিং চলবে
                                    >
                                        {loading ? (
                                            <div className="flex items-center">
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                                                    viewBox="0 0 24 24"
                                                ></svg>
                                                Processing...
                                            </div>
                                        ) : (
                                            "Save"
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                                        onClick={() =>
                                            setAddSalaryAdvance(false)
                                        }
                                        disabled={loading} // ক্লোজ বাটনও ডিসেবল হবে যখন লোডিং চলবে
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Request;
