import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilter,
    faFileCsv,
    faFileExcel,
    faCopy,
    faFilePdf,
    faEye,
    faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const ManageEmployeeSalaryOne = () => {
    const [openFilter, setFilter] = useState(false);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/salariesName")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error:", err));
    }, []);
    // copy now
    const handleCopyTable = () => {
        // হেডার
        let tableText = "SL\tEmployee Name\tSalary Month\tTotal Salary\n";

        // সব ইউজার লুপ করে ডেটা যুক্ত করা
        users.forEach((user, index) => {
            tableText += `${index + 1}\t${user.user_name}\t${
                user.salary_month ?? "N/A"
            }\t${user.gross_salary ?? "N/A"}\n`;
        });

        // কপি করা
        navigator.clipboard
            .writeText(tableText)
            .then(() => alert(" Table copied!"))
            .catch((err) => {
                console.error("❌ কপি সমস্যা:", err);
                alert("❌ টেবিল কপি করতে সমস্যা হয়েছে");
            });
    };
    // CSV Download now
    const handleDownloadCSV = () => {
        const csvData = users.map((user, index) => ({
            SL: index + 1,
            "Employee Name": user.user_name,
            "Salary Month": user.salary_month ?? "N/A",
            "Total Salary": user.gross_salary ?? "N/A",
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "salary_table.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // Excel now
    const handleDownloadExcel = () => {
        const excelData = users.map((user, index) => ({
            SL: index + 1,
            "Employee Name": user.user_name,
            "Salary Month": user.salary_month ?? "N/A",
            "Total Salary": user.gross_salary ?? "N/A",
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Sheet");

        XLSX.writeFile(workbook, "salary_table.xlsx");
    };
    const handlePDFDownload = () => {
        const doc = new jsPDF();

        const tableColumn = [
            "SL",
            "Employee Name",
            "Salary Month",
            "Total Salary",
        ];
        const tableRows = [];

        users.forEach((user, index) => {
            const rowData = [
                index + 1,
                user.user_name,
                user.salary_month ?? "N/A",
                user.gross_salary ?? "N/A",
            ];
            tableRows.push(rowData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            styles: { font: "helvetica", fontSize: 10 },
        });

        doc.save("employee_salary_table.pdf");
    };

    // Downloa now file 1 by one
    const handleDownloadPayslip = (user) => {
        const doc = new jsPDF();

        // Example of adding content to PDF (you can customize it)
        doc.text(`Payslip for ${user.user_name}`, 10, 10);
        doc.text(`Salary Month: ${user.salary_month}`, 10, 20);
        doc.text(`Gross Salary: ${user.gross_salary}`, 10, 30);

        // Save the generated PDF
        doc.save(`payslip_${user.user_name}.pdf`);
    };

    return (
        <div>
            <div className="p-4 bg-white rounded-lg h-auto w-auto mt-5 shadow-md">
                <div className="flex items-center justify-between">
                    <h6 className="text-lg font-semibold mb-0">
                        Employee salary
                    </h6>
                    <button
                        className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 flex items-center"
                        onClick={() => setFilter(!openFilter)}
                    >
                        <FontAwesomeIcon icon={faFilter} />
                        <span className="ml-2">Filter</span>
                    </button>
                </div>
                <AnimatePresence mode="wait">
                    {openFilter && (
                        <motion.div
                            key="filter-box" // Unique key দিতে হবে
                            className="mt-4"
                            initial={{ opacity: 0, y: -20 }} // ওপরে থেকে শুরু হবে
                            animate={{ opacity: 1, y: 0 }} // ধীরে ধীরে নেমে আসবে
                            exit={{ opacity: 0, y: -20 }} // ধীরে ধীরে ওপরে যাবে
                            transition={{ duration: 0.3 }} // Smooth effect 0.3s
                        >
                            <div className="flex items-center justify-between w-[450px]">
                                <div className="mt-5 ml-4 w-64 relative">
                                    {/* Select Box */}
                                    <div className="">
                                        <input
                                            type="date"
                                            className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    {/* Dropdown */}
                                </div>

                                <div class="flex space-x-2 mt-5">
                                    <button
                                        type="button"
                                        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
                                    >
                                        Find
                                    </button>
                                    <button
                                        type="button"
                                        class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                                onClick={handleCopyTable}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faCopy} />
                                </div>
                                Copy
                            </button>
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
                            <button
                                className="flex w-[70px]  bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handlePDFDownload}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faFilePdf} />
                                </div>
                                PDF
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
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    Employee name
                                </th>
                                <th class="border border-gray-300 px-4 py-2">
                                    Salary month
                                </th>

                                <th class="border border-gray-300 px-4 py-2">
                                    Total salary
                                </th>

                                <th class="border border-gray-300 px-4 py-2">
                                    action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={index}
                                    className="border border-gray-300"
                                >
                                    <td className="border border-gray-300 px-4 py-2">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {user.user_name}
                                    </td>

                                    <td className="border border-gray-300 px-4 py-2">
                                        {user.salary_month ?? "N/A"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {user.gross_salary ?? "N/A"}
                                    </td>
                                    <td className="flex justify-between items-center w-[300px] mt-[10px]">
                                        <div className="">
                                            <button
                                                type="button"
                                                className="px-4 h-[40px] py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 ml-2 flex items-center"
                                            >
                                                <h6>Payslip</h6>
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    className="ml-[10px] mt-[8px]"
                                                />
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2 flex"
                                                onClick={() =>
                                                    handleDownloadPayslip(user)
                                                }
                                            >
                                                Download pay slip
                                                <FontAwesomeIcon
                                                    icon={faDownload}
                                                    className="ml-[10px] mt-[6px]"
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageEmployeeSalaryOne;
