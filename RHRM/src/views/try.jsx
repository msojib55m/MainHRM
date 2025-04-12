// File: RequestForm.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const RequestForm = () => {
    const [selectedEmployee, setSelectedEmployee] = useState("Select Employee");
    const [selectedPosition, setSelectedPosition] = useState("Select Position");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description1, setDescription1] = useState("");
    const [description2, setDescription2] = useState("");
    const [amount, setAmount] = useState("");

    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);

    const dropdownRef = useRef(null);
    const dropdownRefOne = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenOne, setIsOpenOne] = useState(false);

    const employees = ["John Doe", "Jane Smith", "Alice"];
    const positions = ["Manager", "Accountant", "Technician"];

    const [search, setSearch] = useState("");
    const [searchPosition, setSearchPosition] = useState("");

    const filteredEmployees = employees.filter((emp) =>
        emp.toLowerCase().includes(search.toLowerCase())
    );

    const filteredPositions = positions.filter((pos) =>
        pos.toLowerCase().includes(searchPosition.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
            if (
                dropdownRefOne.current &&
                !dropdownRefOne.current.contains(event.target)
            ) {
                setIsOpenOne(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            employee: selectedEmployee,
            position: selectedPosition,
            start_date: startDate,
            end_date: endDate,
            description1,
            description2,
            amount,
        };

        try {
            await axios.post("http://localhost:8000/api/requests", formData);
            alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow rounded space-y-4 w-full max-w-3xl mx-auto"
        >
            {/* Employee Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <label>Requesting Person *</label>
                <div
                    className="h-10 px-3 py-2 border rounded cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedEmployee}
                </div>
                {isOpen && (
                    <div className="absolute w-full bg-white shadow border mt-1 rounded z-10">
                        <input
                            className="w-full h-10 px-3"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ul className="max-h-40 overflow-y-auto">
                            {filteredEmployees.map((emp, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setSelectedEmployee(emp);
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {emp}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Position Dropdown */}
            <div className="relative" ref={dropdownRefOne}>
                <label>Position *</label>
                <div
                    className="h-10 px-3 py-2 border rounded cursor-pointer"
                    onClick={() => setIsOpenOne(!isOpenOne)}
                >
                    {selectedPosition}
                </div>
                {isOpenOne && (
                    <div className="absolute w-full bg-white shadow border mt-1 rounded z-10">
                        <input
                            className="w-full h-10 px-3"
                            placeholder="Search..."
                            value={searchPosition}
                            onChange={(e) => setSearchPosition(e.target.value)}
                        />
                        <ul className="max-h-40 overflow-y-auto">
                            {filteredPositions.map((pos, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setSelectedPosition(pos);
                                        setIsOpenOne(false);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {pos}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Date Inputs */}
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border p-2 rounded"
            />

            {/* Textareas */}
            <textarea
                rows={3}
                value={description1}
                onChange={(e) => setDescription1(e.target.value)}
                className={`w-full p-2 border rounded ${
                    isFocused1 ? "border-green-500" : "border-gray-300"
                }`}
                onFocus={() => setIsFocused1(true)}
                onBlur={() => setIsFocused1(false)}
                placeholder="Description 1"
            />
            <textarea
                rows={3}
                value={description2}
                onChange={(e) => setDescription2(e.target.value)}
                className={`w-full p-2 border rounded ${
                    isFocused2 ? "border-green-500" : "border-gray-300"
                }`}
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                placeholder="Description 2"
            />

            {/* Number Input */}
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-[50px] px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                placeholder="0.00"
            />

            {/* Submit Button */}
            <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Submit
            </button>
        </form>
    );
};

export default RequestForm;
