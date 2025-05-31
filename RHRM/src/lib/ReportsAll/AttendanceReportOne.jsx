import React, { useEffect, useRef, useState } from "react";
import {
    faCirclePlus,
    faTimes,
    faPenToSquare,
    faTrashCan,
    faFileExcel,
    faFileCsv,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../../axiosClient";
const AttendanceReportOne = () => {
    // dropdown Employee start

    // all state off
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("Employee name");
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    // data to mysql in react table 1
    const fetchData = async () => {
        setLoadingTable(true);
        try {
            const res = await axiosClient.get("/attendance_report_All");
            setAttendanceData(res.data);
        } catch (err) {
            console.error("Error fetching attendance reoprt:", err);
        } finally {
            setLoadingTable(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    // data to mysql in react table 1
    // Employee namne : 1
    useEffect(() => {
        axiosClient
            .get("/AllEmployName")
            .then((response) => {
                console.log("Fetched employees:", response.data);
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });
    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                console.log("Outside clicked. Closing dropdown.");
                setIsOpen(false);
            }
        };

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
    // Employee namne : 1
    // input filed open
    // loading now
    const [loading, setLoading] = useState(false);
    const [openAttendance, setAttendace] = useState(false);

    const [date, setDate] = useState("");
    const [inTime, setInTime] = useState("");
    const [outTime, setOutTime] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true);
    // mysql to table show
    // data store in mysql
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axiosClient
            .post("/attendance_report", {
                employee_name: selectedEmployee,
                date,
                in_time: inTime,
                out_time: outTime,
            })
            .then(() => {
                setAttendace(false);
                fetchData();
            })
            .catch((err) => console.error("Error", err))
            .finally(() => setLoading(false));
    };
    const resetForm = () => {
        setSelectedEmployee("Employee name");
        setDate("");
        setInTime("");
        setOutTime("");
        setAttendace(true); // কেবল তখনই true করো যদি এটা আগে false ছিল
    };

    const [editId, setEditId] = useState(null);
    const [editadd, setEdit] = useState(false);
    const allEdit = (item) => {
        setEditId(item.id);
        setSelectedEmployee(item.employee_name);
        setDate(item.date);
        setInTime(item.in_time);
        setOutTime(item.out_time);
        setEdit(true);
    };
    const handleEdit = async (e) => {
        e.preventDefault();
        const payload = {
            employee_name: selectedEmployee,
            date,
            in_time: inTime,
            out_time: outTime,
        };
        setLoading(true);
        try {
            await axiosClient.put(
                `/Allattendance_report_update/${editId}`,
                payload
            );
            setEdit(false);
            fetchData();
            resetForm();
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data);
            }
        } finally {
            setLoading(false);
        }
    };
    // delete  to  mysql and react table
    const [deletingId, setDeletingId] = useState(null);
    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await axiosClient.delete(`/Allattendance_report_delete/${id}`);
            fetchData();
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data);
            }
        } finally {
            setDeletingId(null);
        }
    };
    // search input now table
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = attendanceData.filter(
        (item) =>
            item.employee_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            item.date.includes(searchTerm) ||
            item.in_time.includes(searchTerm) ||
            item.out_time.includes(searchTerm)
    );
    // search input now table
    // Enter page handle now
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    return (
        <div>
            <div className="sticky mt-[100px] h-[auto] p-2 z-10 flex items-start justify-between bg-[white] rounded-[12px]">
                <div className="w-full">
                    <div className="flex items-center justify-between w-full h-[50px] pr-[10px] pl-[10px] relative">
                        <div>
                            <h5>Attendance report</h5>
                        </div>
                        <div className="p-4">
                            {/* Add New Award Button */}
                            <div
                                className="flex bg-green-600 h-[40px] items-center p-3 cursor-pointer"
                                onClick={() => !openAttendance && resetForm()}
                            >
                                <FontAwesomeIcon
                                    className="text-white mr-2"
                                    icon={faCirclePlus}
                                />
                                <a href="#" className="text-white">
                                    Add new Report
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[10px]">
                        <hr />
                    </div>
                    <div className="mt-[20px]">
                        <div className=" flex align-center justify-between">
                            {/* card one */}
                            <div className="mt-[20px]  ">
                                <label className="text-sm font-medium text-[20px]">
                                    Show
                                    <select
                                        className="    p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none h-[40px] ml-[10px] mr-[10px]"
                                        value={entriesPerPage}
                                        onChange={(e) =>
                                            setEntriesPerPage(e.target.value)
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

                            {/* card Two */}
                            {/* card Three */}
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
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* card three */}
                        </div>
                    </div>
                    {/* table one */}
                    <div className="mt-[30px]">
                        <table
                            className="table-auto w-full border-collapse border border-gray-200 text-sm"
                            id="award-table"
                            role="grid"
                        >
                            <thead className="text-left">
                                <tr role="text-left" className="bg-gray-100">
                                    <th
                                        title="Sl"
                                        width="50"
                                        className="text-center-center px-3 py-2 border-b border-gray-300"
                                    >
                                        Sl
                                    </th>
                                    <th
                                        title="Award name"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Employee
                                    </th>
                                    <th
                                        title="Award description"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Date
                                    </th>
                                    <th
                                        title="Gift item"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        In Time
                                    </th>
                                    <th
                                        title="Date"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Out Time
                                    </th>
                                    <th
                                        title="Employee name"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-left">
                                {loadingTable ? (
                                    <tr>
                                        <td
                                            colSpan="11"
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
                                ) : filteredData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-4"
                                        >
                                            No data found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="text-center px-3 py-2 border-b">
                                                {index + 1}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {item.employee_name}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {item.date}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {item.in_time}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {item.out_time}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                    onClick={() =>
                                                        allEdit(item)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />
                                                </button>
                                                <button
                                                    className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1"
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    } // এখানে ঠিক আছে
                                                    disabled={
                                                        deletingId === item.id
                                                    }
                                                >
                                                    {deletingId === item.id ? (
                                                        <svg
                                                            className="animate-spin h-4 w-4 text-red-600"
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
                    {/* table end */}
                </div>
                {openAttendance && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
                        <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg w-[950px]">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">
                                    Add Attendance report
                                </h2>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="cursor-pointer text-gray-500"
                                />
                            </div>

                            <form
                                className="flex flex-col gap-3"
                                onSubmit={handleSubmit}
                            >
                                {/* Employe name Frist: one  */}
                                <div className="flex mt-5 justify-between">
                                    <div>
                                        <h4>Employee Name</h4>
                                    </div>
                                    <div
                                        className=" w-[44rem] relative"
                                        ref={dropdownRef}
                                    >
                                        {/* Select Box */}
                                        <div
                                            className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            {selectedEmployee}
                                        </div>

                                        {/* Dropdown */}
                                        {isOpen && (
                                            <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    className="w-full h-10 px-2 py-1 text-gray-700 border-b border-gray-300"
                                                    value={search}
                                                    onChange={(e) =>
                                                        setSearch(
                                                            e.target.value
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
                                                                    key={index}
                                                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                    onClick={() => {
                                                                        setSelectedEmployee(
                                                                            employee
                                                                        );
                                                                        setIsOpen(
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
                                {/*Date  2nd number : 2 */}

                                <div className="flex mt-[20px]">
                                    <div className="">
                                        <h4>Date</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            className="w-[705px] ml-[163px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Selection terms"
                                            onFocus={(e) => {
                                                e.target.showPicker();
                                            }}
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                {/* on time : 3 frist  */}
                                <div className="flex mt-[20px]">
                                    <div className="">
                                        <h4>In time</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="time"
                                            className="w-[705px] ml-[146px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Selection terms"
                                            onFocus={(e) => {
                                                e.target.showPicker();
                                            }}
                                            value={inTime}
                                            onChange={(e) =>
                                                setInTime(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                {/* out time : 4 */}
                                <div className="flex mt-[20px]">
                                    <div className="">
                                        <h4>Out time</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="time"
                                            className="w-[705px] ml-[130px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Selection terms"
                                            onFocus={(e) => {
                                                e.target.showPicker();
                                            }}
                                            value={outTime}
                                            onChange={(e) =>
                                                setOutTime(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => setAttendace(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded"
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
                                            "Save"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {editadd && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
                        <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg w-[950px]">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">
                                    Edit Attendance report
                                </h2>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="cursor-pointer text-gray-500"
                                />
                            </div>

                            <form
                                className="flex flex-col gap-3"
                                onSubmit={handleEdit}
                            >
                                {/* Employe name Frist: one  */}
                                <div className="flex mt-5 justify-between">
                                    <div>
                                        <h4>Employee Name</h4>
                                    </div>
                                    <div
                                        className=" w-[44rem] relative"
                                        ref={dropdownRef}
                                    >
                                        {/* Select Box */}
                                        <div
                                            className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            {selectedEmployee}
                                        </div>

                                        {/* Dropdown */}
                                        {isOpen && (
                                            <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    className="w-full h-10 px-2 py-1 text-gray-700 border-b border-gray-300"
                                                    value={search}
                                                    onChange={(e) =>
                                                        setSearch(
                                                            e.target.value
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
                                                                    key={index}
                                                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                    onClick={() => {
                                                                        setSelectedEmployee(
                                                                            employee
                                                                        );
                                                                        setIsOpen(
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
                                {/*Date  2nd number : 2 */}

                                <div className="flex mt-[20px]">
                                    <div className="">
                                        <h4>Date</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            className="w-[705px] ml-[163px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Selection terms"
                                            onFocus={(e) => {
                                                e.target.showPicker();
                                            }}
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                {/* on time : 3 frist  */}
                                <div className="flex mt-[20px]">
                                    <div className="">
                                        <h4>In time</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="time"
                                            className="w-[705px] ml-[146px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Selection terms"
                                            onFocus={(e) => {
                                                e.target.showPicker();
                                            }}
                                            value={inTime}
                                            onChange={(e) =>
                                                setInTime(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                {/* out time : 4 */}
                                <div className="flex mt-[20px]">
                                    <div className="">
                                        <h4>Out time</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="time"
                                            className="w-[705px] ml-[130px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Selection terms"
                                            onFocus={(e) => {
                                                e.target.showPicker();
                                            }}
                                            value={outTime}
                                            onChange={(e) =>
                                                setOutTime(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => setEdit(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded"
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
                                            "Edit"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendanceReportOne;
