import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileCsv,
    faFileExcel,
    faEye,
    faEdit,
    faTrash,
    faTimes,
    faPrint,
} from "@fortawesome/free-solid-svg-icons";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const EmployeeParformanceTwo = () => {
    // mysql to data show
    const [performances, setPerformances] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // For search input
    const [filteredPerformances, setFilteredPerformances] =
        useState(performances);

    // search From now
    // Function to filter performances based on search term
    useEffect(() => {
        setFilteredPerformances(
            performances.filter((performance) => {
                const name = performance.employee_name || ""; // null হলে empty string নেবে
                return (
                    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    performance.total_score.toString().includes(searchTerm) ||
                    (performance.created_at || "").includes(searchTerm) // created_at null হলে error আসবে, তাই চেক করা হলো
                );
            })
        );
    }, [searchTerm, performances]);

    // search Form now
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/EmployeesPerformanceTwo"
                );
                const data = await response.json();

                setPerformances(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // mysql to data show
    // view now add
    const [selectedPerformance, setSelectedPerformance] = useState(null); // রেকর্ড নির্বাচন করা

    // View আইকন ক্লিক করলে ডাটা দেখাবে
    const handleViewClick = (performance) => {
        setSelectedPerformance(performance); // ক্লিক করা রেকর্ডটি নির্বাচন করা
    };

    // Modal বন্ধ করার জন্য
    const closeModal = () => {
        setSelectedPerformance(null); // মডাল বন্ধ করা
    };
    // কিভাবে পিন্ট্র করব
    const handlePrint = () => {
        const printContent = document.getElementById("print-area").innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent; // শুধু print-area এর কনটেন্ট দেখাবে
        window.print(); // প্রিন্ট অপশন ওপেন হবে
        document.body.innerHTML = originalContent; // আগের কনটেন্ট ফিরিয়ে আনবে
        window.location.reload();
    };
    // Edit performance now
    const [selectedPerformanceEdit, setSelectedPerformanceEdit] =
        useState(null);
    const [updatedData, setUpdatedData] = useState({
        employee_name: "",
        total_score: "",
    });

    const handleEditClick = (performance) => {
        setSelectedPerformanceEdit(performance); // Modal এ প্রেরিত performance সেট করুন
        setUpdatedData({
            employee_name: performance.employee_name, // Performance থেকে নাম এবং স্কোর সেট করুন
            total_score: performance.total_score,
        });
    };

    const handleUpdate = async () => {
        if (!selectedPerformanceEdit) return;

        try {
            const response = await fetch(
                `http://localhost:8000/api/update-performance/${selectedPerformanceEdit.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        employee_name: updatedData.employee_name, // Update employee_name
                        total_score: updatedData.total_score, // Update total_score
                    }),
                }
            );

            if (response.ok) {
                alert("Updated Successfully!");

                // Update the table with the new data without reloading the page
                setPerformances((prevPerformances) =>
                    prevPerformances.map((item) =>
                        item.id === selectedPerformanceEdit.id
                            ? {
                                  ...item,
                                  total_score: updatedData.total_score,
                                  employee_name: updatedData.employee_name,
                              }
                            : item
                    )
                );

                setSelectedPerformanceEdit(null); // Close the modal after updating
            } else {
                alert("Failed to update!");
            }
        } catch (error) {
            console.error("Error updating:", error);
        }
    };
    // Edit performance now
    // delete performname now
    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/delete-performance/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                // Filter out the deleted performance from the state
                setFilteredPerformances((prevPerformances) =>
                    prevPerformances.filter(
                        (performance) => performance.id !== id
                    )
                );
                alert("Performance deleted successfully!");
            } else {
                alert("Failed to delete performance.");
            }
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Error deleting performance.");
        }
    };
    // csv dolownlod
    // Function to convert data to CSV format and trigger download
    const handleDownloadCSV = () => {
        const csv = Papa.unparse(
            filteredPerformances.map((performance, index) => ({
                Sl: index + 1,
                "Employee name": performance.employee_name,
                "Total score": performance.total_score,
                "Create date": performance.created_at,
            }))
        );

        // Create a Blob from the CSV string
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

        // Create a link element and trigger the download
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "performances.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filteredPerformances.map((performance, index) => ({
                Sl: index + 1,
                "Employee name": performance.employee_name,
                "Total score": performance.total_score,
                "Create date": performance.created_at,
            }))
        );

        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Performances");

        // Write the Excel file
        XLSX.writeFile(workbook, "performances.xlsx");
    };
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    // Handle change in number of entries per page
    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(parseInt(e.target.value));
    };

    // Slice the filteredPerformances based on selected entries per page
    const slicedPerformances = filteredPerformances.slice(0, entriesPerPage);
    return (
        <div>
            <div className="mt-[20px]">
                <hr />
            </div>
            <div className="mt-[20px]">
                <div className=" flex align-center justify-between">
                    {/* card one */}
                    <div className="flex items-center space-x-2">
                        <label className="text-gray-700 text-sm font-medium">
                            Show
                        </label>
                        <select
                            name="award-table_length"
                            className="block w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={handleEntriesPerPageChange}
                            value={entriesPerPage}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="-1">All</option>
                        </select>
                        <label className="text-gray-700 text-sm font-medium">
                            entries
                        </label>
                    </div>
                    {/* card one */}
                    <div className="bg-blue-500 text-white py-2 px-4 rounded-sm flex">
                        <button
                            className="flex w-[70px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={handleDownloadCSV}
                        >
                            <div>
                                <FontAwesomeIcon icon={faFileCsv} />
                            </div>
                            CSV
                        </button>
                        <button
                            className="flex w-[70px]  bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={handleDownloadExcel}
                        >
                            Excel
                            <div>
                                <FontAwesomeIcon icon={faFileExcel} />
                            </div>
                        </button>
                    </div>
                    {/* card Two */}
                    {/* card Three */}
                    <div className="flex align-center justify-center mt-[15px]">
                        <div className="mt-[5px] mr-[3px]">
                            <label>Search :</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-sm "
                                placeholder="Search awards..."
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* card three */}
                </div>
                <div className="overflow-x-auto mt-[20px]">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className=" text-left">
                                <th className="px-4 py-2 border border-gray-200">
                                    Sl
                                </th>
                                <th className="px-4 py-2 border border-gray-200">
                                    Employee name
                                </th>
                                <th className="px-4 py-2 border border-gray-200">
                                    Total score
                                </th>
                                <th className="px-4 py-2 border border-gray-200">
                                    Create date
                                </th>
                                <th className="px-4 py-2 border border-gray-200">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {slicedPerformances.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-4 text-red-600"
                                    >
                                        No results found.
                                    </td>
                                </tr>
                            ) : (
                                slicedPerformances.map((performance, index) => (
                                    <tr
                                        key={performance.id}
                                        className="hover:bg-gray-50 text-left"
                                    >
                                        <td className="px-4 py-2 border border-gray-200">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-200">
                                            {performance.employee_name}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-200">
                                            {performance.total_score}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-200">
                                            {performance.created_at}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 flex">
                                            <div
                                                className="w-[40px] h-[40px] ml-[10px] inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                onClick={() =>
                                                    handleViewClick(performance)
                                                }
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </div>
                                            <div
                                                className="w-[40px] h-[40px] ml-[15px] mr-[10px] inline-flex items-center px-3 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                                onClick={() =>
                                                    handleEditClick(performance)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />
                                            </div>
                                            <div
                                                className="w-[40px] h-[40px] inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        performance.id
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {/* view now show */}
                </div>
                {selectedPerformance && (
                    <div className="modal fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="">
                            <div className="modal-content w-[600px] h-[350px] bg-white p-6 rounded-lg">
                                <div className="flex justify-end items-center">
                                    <button
                                        type="button"
                                        className=" bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                        onClick={handlePrint}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPrint}
                                            className="w-5 h-5"
                                        />
                                        Print
                                    </button>
                                    <button
                                        className=" ml-[10px] bg-green-500 hover:bg-green-600 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-400"
                                        onClick={closeModal}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className="w-5 h-5"
                                        />
                                    </button>
                                </div>
                                <div id="print-area">
                                    <h2 className="text-xl mb-4">
                                        Performance Details
                                    </h2>
                                    <p>
                                        <strong>Employee Name:</strong>{" "}
                                        {selectedPerformance.employee_name}
                                    </p>
                                    <p>
                                        <strong>Total Score:</strong>{" "}
                                        {selectedPerformance.total_score}
                                    </p>
                                    <p>
                                        <strong>Created At:</strong>{" "}
                                        {selectedPerformance.created_at}
                                    </p>
                                </div>
                                {/* আপনি এখানে আরও বিস্তারিত তথ্য দেখতে পারেন */}
                            </div>
                        </div>
                    </div>
                )}
                {selectedPerformanceEdit && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white w-[600px] p-6 rounded-lg">
                            <h2 className="text-xl mb-4">Edit Performance</h2>

                            {/* Employee Name (Read Only) */}
                            <label className="block">Employee Name:</label>
                            <input
                                type="text"
                                value={updatedData.employee_name}
                                readOnly
                                className="w-full px-3 py-2 border rounded-md bg-gray-100"
                            />

                            {/* Score Update */}
                            <label className="block mt-3">Total Score:</label>
                            <input
                                type="number"
                                value={updatedData.total_score}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        total_score: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                            />

                            {/* Save & Close Buttons */}
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={handleUpdate}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    onClick={() =>
                                        setSelectedPerformanceEdit(null)
                                    }
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeParformanceTwo;
