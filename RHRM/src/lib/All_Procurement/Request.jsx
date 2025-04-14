import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// fontawesome Icon start
// custome Image
import {
    faCirclePlus,
    faEdit,
    faTrash,
    faPlusSquare,
    faFileCsv,
    faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { unparse } from "papaparse";
import * as XLSX from "xlsx";

const Request = () => {
    const [openRequest, setRequest] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedEmployee, setSelectedEmployee] = useState("Select potion");
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // two selected now
    // work now

    // work now
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
    // new
    const dropdownRefOne = useRef(null);
    const [startDate, setStartDate] = useState("");
    const [description1, setDescription1] = useState("");
    const [description2, setDescription2] = useState("");
    const [amount, setAmount] = useState("");
    const [endDate, setEndDate] = useState("");
    // new
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
    // textArya color green now
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedNow, setIsFocusedNow] = useState(false);
    // selected
    const unitOptions = [
        { value: "kg", label: "KG" },
        { value: "litre", label: "Litre" },
        { value: "piece", label: "Piece" },
        { value: "meter", label: "Meter" },
        { value: "dozen", label: "Dozen" },
        { value: "gram", label: "Gram" },
        { value: "ml", label: "Millilitre" },
        { value: "pack", label: "Pack" },
    ];

    const [selectedUnit, setSelectedUnit] = useState(null);

    // এখন ডাটা react.jsx থেকে ল্যারাবেল পাঠানো হলো
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUnit) {
            alert("Please select a unit.");
            return;
        }

        const formData = {
            employee: selectedEmployee,
            position: selectedPosition,
            start_date: startDate,
            end_date: endDate,
            description1,
            description2,
            unit_id: selectedUnit.value,
            amount: parseFloat(amount),
        };
        setLoading(true);
        try {
            // POST request for new data submission
            await axios.post("http://127.0.0.1:8000/api/requests", formData);

            resetForm(); // Reset form after submission
            fetchTableData(); // Refresh table data
            setSelectedEmployee(""); // Employee reset
            setSelectedPosition(""); // Position reset
            setStartDate(""); // Start date reset
            setEndDate(""); // End date reset
            setDescription1(""); // Description 1 reset
            setDescription2(""); // Description 2 reset
            setAmount(""); // Amount reset
            setSelectedUnit(null); // Unit reset
            setRequest(false); // Form/modal hide
            editRequest(null);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };
    // data state
    const [data, setData] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true);
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/Request-data")
            .then((response) => {
                setData(response.data);
                setLoadingTable(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoadingTable(false);
            });
    }, []);
    const fetchTableData = () => {
        setLoadingTable(true);
        axios
            .get("http://127.0.0.1:8000/api/Request-data")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setLoadingTable(false);
            });
    };
    useEffect(() => {
        fetchTableData();
    }, []);
    const [openEdit, editRequest] = useState(null);
    useEffect(() => {
        if (openEdit) {
            axios
                .get(`http://127.0.0.1:8000/api/edit-data/${openEdit}`)
                .then((res) => {
                    const d = res.data;
                    setSelectedEmployee(d.employee);
                    setSelectedPosition(d.position);
                    setStartDate(d.start_date);
                    setEndDate(d.end_date);
                    setDescription1(d.description1);
                    setDescription2(d.description2);
                    setAmount(d.amount);
                });
        }
    }, [openEdit]);
    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedData = {
            employee: selectedEmployee,
            position: selectedPosition,
            start_date: startDate,
            end_date: endDate,
            description1,
            description2,
            amount: parseFloat(amount),
        };
        setLoading(true);
        try {
            // PUT request for data update
            const res = await axios.put(
                `http://127.0.0.1:8000/api/update-data/${openEdit}`,
                updatedData
            );

            fetchTableData(); // Refresh table data
            resetForm(); // Reset form after update
        } catch (err) {
            console.error("Update error:", err.response?.data || err.message);
            alert("Failed to update.");
        } finally {
            setLoading(false);
        }
    };
    const resetForm = () => {
        setSelectedEmployee("");
        setSelectedPosition("");
        setStartDate("");
        setEndDate("");
        setDescription1("");
        setDescription2("");
        setAmount("");
        setSelectedUnit(null);
        setRequest(false);
        editRequest(null); // Clear edit mode after submit or update
    };
    const [searchText, setSearchText] = useState("");
    const filterDataTextValue = data.filter(
        (item) =>
            item.employee
                .toLowerCase()
                .includes(searchText.toLocaleLowerCase()) ||
            item.position.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description1
                ?.toLowerCase()
                .includes(searchText.toLowerCase()) ||
            item.description2?.toLowerCase().includes(searchText.toLowerCase())
    );
    const downloadCSVRequest = () => {
        if (filterDataTextValue.length === 0) return;

        const csvData = filterDataTextValue.map((item, index) => ({
            SL: index + 1,
            "Requesting Person": item.employee,
            Position: item.position,
            Date: item.end_date,
            "Quote Status": item.amount,
        }));

        const csv = unparse(csvData, {
            quotes: true,
            delimiter: ",",
            header: true,
            encoding: "UTF-8",
        });

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "request_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const downloadExcelRequest = () => {
        if (filterDataTextValue.length === 0) return;

        const excelData = filterDataTextValue.map((item, index) => ({
            SL: index + 1,
            "Requesting Person": item.employee,
            Position: item.position,
            Date: item.end_date,
            "Quote Status": item.amount,
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Request Data");

        XLSX.writeFile(workbook, "request_data.xlsx");
    };
    const [entriesToShow, setEntriesToShow] = useState(10);
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
                {/* show page */}
                <div class="mt-[20px]">
                    <div class="flex justify-between items-center ">
                        <div className="mt-[20px]  ">
                            <label className="text-sm font-medium text-[20px]">
                                Show
                                <select
                                    name="entries"
                                    className=" p-2 border border-gray-300 rounded-md 
                                                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                                                        appearance-none h-[40px] ml-[10px] mr-[10px]"
                                    value={entriesToShow}
                                    onChange={(e) =>
                                        setEntriesToShow(Number(e.target.value))
                                    }
                                >
                                    <option value="10" selected>
                                        10
                                    </option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="75">75</option>
                                    <option value="100">100</option>
                                </select>
                                entries
                            </label>
                        </div>
                        <div className="bg-blue-500 text-white py-2 px-4 rounded-sm flex">
                            <button
                                className="flex w-[70px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={downloadCSVRequest}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faFileCsv} />
                                </div>
                                CSV
                            </button>
                            <button
                                className="flex w-[70px]  bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={downloadExcelRequest}
                            >
                                Excel
                                <div>
                                    <FontAwesomeIcon icon={faFileExcel} />
                                </div>
                            </button>
                        </div>
                        <div class="mr-[10px] mt-[20px] w-[362px]">
                            <div class="flex items-center justify-between w-[250px]">
                                <div>
                                    <label class="text-sm font-medium text-[20px]">
                                        Search:
                                    </label>
                                </div>
                                <div className="">
                                    <input
                                        type="text"
                                        class="w-[300px] ml-[20px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Search..."
                                        value={searchText}
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* show page */}
                {/* table now */}
                <div className="mt-[20px]">
                    <hr />
                </div>
                <div class="mt-[20px]">
                    <table class="min-w-full table-auto border-collapse">
                        <thead class="text-left">
                            <tr class="bg-gray-100">
                                <th class="border border-gray-300 px-4 py-2">
                                    SL
                                </th>
                                <th class="border border-gray-300 px-4 py-2">
                                    Requesting person
                                </th>
                                <th class="border border-gray-300 px-4 py-2">
                                    Requesting person
                                </th>

                                <th class="border border-gray-300 px-4 py-2">
                                    Date
                                </th>
                                <th class="border border-gray-300 px-4 py-2">
                                    Quote status
                                </th>
                                <th class="border border-gray-300 px-4 py-2">
                                    action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingTable ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-4"
                                    >
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
                                            <span>Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filterDataTextValue.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-4"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                filterDataTextValue
                                    .slice(0, entriesToShow)
                                    .map((item, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="border border-gray-300 px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.employee}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.position}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.end_date}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.amount}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-left">
                                                <button
                                                    className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                    onClick={() =>
                                                        editRequest(item.id)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />
                                                </button>
                                                <button className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1">
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* table */}
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
                        <form onSubmit={handleSubmit}>
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
                                                onFocus={(e) => {
                                                    e.target.showPicker();
                                                }}
                                                value={startDate}
                                                onChange={(e) =>
                                                    setStartDate(e.target.value)
                                                }
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
                                                onFocus={(e) => {
                                                    e.target.showPicker();
                                                }}
                                                value={endDate}
                                                onChange={(e) =>
                                                    setEndDate(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[20px]">
                                    <div className=" flex">
                                        <div className="w-[145px]">
                                            <h6>Reason for requesting *</h6>
                                        </div>
                                        <textarea
                                            rows={3}
                                            value={description1}
                                            onChange={(e) =>
                                                setDescription1(e.target.value)
                                            }
                                            className={`w-[400px] px-3 py-2 border rounded-lg transition-all duration-200
                                               ${
                                                   isFocused
                                                       ? "border-green-500 outline-green-500"
                                                       : "border-gray-300"
                                               }`}
                                            placeholder="Description of materials /Goods /Service "
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* table add now */}
                                <div className="mt-[20px]">
                                    <table className="min-w-full border border-gray-300 text-left">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-2 border">
                                                    Description of materials
                                                    /Goods /Service *
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Unit *
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Quantity *
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-2 border">
                                                    <textarea
                                                        rows={3}
                                                        className={`w-[400px] px-3 py-2 border rounded-lg transition-all duration-200
                                               ${
                                                   isFocusedNow
                                                       ? "border-green-500 outline-green-500"
                                                       : "border-gray-300"
                                               }`}
                                                        placeholder=" Description of materia Goods /Service"
                                                        onFocus={() =>
                                                            setIsFocusedNow(
                                                                true
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            setIsFocusedNow(
                                                                false
                                                            )
                                                        }
                                                        value={description2}
                                                        onChange={(e) =>
                                                            setDescription2(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></textarea>
                                                </td>

                                                <td className="w-1/5 px-2 py-2">
                                                    <select
                                                        value={
                                                            selectedUnit?.value ||
                                                            ""
                                                        }
                                                        onChange={(e) => {
                                                            const selected =
                                                                unitOptions.find(
                                                                    (option) =>
                                                                        option.value ===
                                                                        e.target
                                                                            .value
                                                                );
                                                            setSelectedUnit(
                                                                selected
                                                            );
                                                        }}
                                                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    >
                                                        <option value="">
                                                            Select Unit
                                                        </option>
                                                        {unitOptions.map(
                                                            (option) => (
                                                                <option
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </td>

                                                <td className="px-4 py-2 border">
                                                    <input
                                                        type="number"
                                                        className="w-full h-[50px] px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                                        placeholder="0.00"
                                                        value={amount}
                                                        onChange={(e) => {
                                                            const value =
                                                                e.target.value;
                                                            // Ensure the value is a valid number, and prevent empty input
                                                            if (
                                                                !value ||
                                                                !isNaN(value)
                                                            ) {
                                                                setAmount(
                                                                    value
                                                                );
                                                            }
                                                        }}
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                </td>

                                                <td className="px-4 py-2 border">
                                                    <button
                                                        id="add_dev_plan"
                                                        class="bg-blue-500 h-[40px] w-[40px] hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPlusSquare}
                                                        />
                                                    </button>

                                                    <button class="bg-red-500 h-[40px] w-[40px] hover:bg-red-600 text-white px-3 py-1 rounded text-sm ml-2">
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* আরও রো চাইলে এখানে অ্যাড করুন */}
                                        </tbody>
                                    </table>
                                </div>
                                {/* table add now */}

                                {/* active selected end */}
                                {/* Buttons */}
                                <div className="w-[1170px] flex items-center justify-end mt-[20px]">
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
                                        onClick={() => setRequest(false)}
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
            {openEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Background Overlay */}
                    <div className="fixed inset-0 bg-black opacity-50"></div>

                    {/* Position Form */}
                    <div className="w-[1200px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                        <h5 className="text-lg font-semibold">Edit request</h5>
                        <hr className="border-t-1 border-gray-300 mt-2" />

                        {/* Input Fields */}
                        <form onSubmit={handleUpdate}>
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
                                                onFocus={(e) => {
                                                    e.target.showPicker();
                                                }}
                                                value={startDate}
                                                onChange={(e) =>
                                                    setStartDate(e.target.value)
                                                }
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
                                                onFocus={(e) => {
                                                    e.target.showPicker();
                                                }}
                                                value={endDate}
                                                onChange={(e) =>
                                                    setEndDate(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[20px]">
                                    <div className=" flex">
                                        <div className="w-[145px]">
                                            <h6>Reason for requesting *</h6>
                                        </div>
                                        <textarea
                                            rows={3}
                                            value={description1}
                                            onChange={(e) =>
                                                setDescription1(e.target.value)
                                            }
                                            className={`w-[400px] px-3 py-2 border rounded-lg transition-all duration-200
                                               ${
                                                   isFocused
                                                       ? "border-green-500 outline-green-500"
                                                       : "border-gray-300"
                                               }`}
                                            placeholder="Description of materials /Goods /Service "
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* table add now */}
                                <div className="mt-[20px]">
                                    <table className="min-w-full border border-gray-300 text-left">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-2 border">
                                                    Description of materials
                                                    /Goods /Service *
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Unit *
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Quantity *
                                                </th>
                                                <th className="px-4 py-2 border">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-2 border">
                                                    <textarea
                                                        rows={3}
                                                        className={`w-[400px] px-3 py-2 border rounded-lg transition-all duration-200
                                               ${
                                                   isFocusedNow
                                                       ? "border-green-500 outline-green-500"
                                                       : "border-gray-300"
                                               }`}
                                                        placeholder=" Description of materia Goods /Service"
                                                        onFocus={() =>
                                                            setIsFocusedNow(
                                                                true
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            setIsFocusedNow(
                                                                false
                                                            )
                                                        }
                                                        value={description2}
                                                        onChange={(e) =>
                                                            setDescription2(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></textarea>
                                                </td>

                                                <td className="w-1/5 px-2 py-2">
                                                    <select
                                                        value={
                                                            selectedUnit?.value ||
                                                            ""
                                                        }
                                                        onChange={(e) => {
                                                            const selected =
                                                                unitOptions.find(
                                                                    (option) =>
                                                                        option.value ===
                                                                        e.target
                                                                            .value
                                                                );
                                                            setSelectedUnit(
                                                                selected
                                                            );
                                                        }}
                                                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    >
                                                        <option value="">
                                                            Select Unit
                                                        </option>
                                                        {unitOptions.map(
                                                            (option) => (
                                                                <option
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </td>

                                                <td className="px-4 py-2 border">
                                                    <input
                                                        type="number"
                                                        className="w-full h-[50px] px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                                        placeholder="0.00"
                                                        value={amount}
                                                        onChange={(e) => {
                                                            const value =
                                                                e.target.value;
                                                            // Ensure the value is a valid number, and prevent empty input
                                                            if (
                                                                !value ||
                                                                !isNaN(value)
                                                            ) {
                                                                setAmount(
                                                                    value
                                                                );
                                                            }
                                                        }}
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                </td>

                                                <td className="px-4 py-2 border">
                                                    <button
                                                        id="add_dev_plan"
                                                        class="bg-blue-500 h-[40px] w-[40px] hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPlusSquare}
                                                        />
                                                    </button>

                                                    <button class="bg-red-500 h-[40px] w-[40px] hover:bg-red-600 text-white px-3 py-1 rounded text-sm ml-2">
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* আরও রো চাইলে এখানে অ্যাড করুন */}
                                        </tbody>
                                    </table>
                                </div>
                                {/* table add now */}

                                {/* active selected end */}
                                {/* Buttons */}
                                <div className="w-[1170px] flex items-center justify-end mt-[20px]">
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
                                        onClick={() => editRequest(false)}
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
