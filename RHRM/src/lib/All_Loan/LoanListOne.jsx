import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faFilter,
    faFileCsv,
    faFileExcel,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion"; // Import animation
import axios from "axios";
import "../../index.css";
import * as XLSX from "xlsx"; // Import xlsx
import Papa from "papaparse"; // Import papaparse
import axiosClient from "../../axiosClient";

const LoanListOne = () => {
    // open Filter
    const [openFilter, setFilter] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("Select Employee");
    const dropdownRef = useRef(null);
    // open Filter one
    const [openLoanList, setOpenLoanList] = useState(false);
    const dropdownRef1 = useRef(null);
    const [openList, setList] = useState(false);
    const [employeesAdd, setEmployeesAdd] = useState([]);
    const [searchAdd, setSearchAdd] = useState("");
    const [selectedEmployeeAdd, setSelectedEmployeeAdd] =
        useState("Select Employee");
    // open filter one
    //  open filter two
    const [openLoanListTwo, setOpenLoanListTwo] = useState(false);
    const dropdownRef2 = useRef(null);
    const [openListTwo, setListTwo] = useState(false);
    const [employeesAddTwo, setEmployeesAddTwo] = useState([]);
    const [searchAddTwo, setSearchAddTwo] = useState("");
    const [selectedEmployeeAddTwo, setSelectedEmployeeAddTwo] =
        useState("Select supervisor");
    const [isLoading, setIsLoading] = useState(true);
    // number one
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

    // open Loan List one
    useEffect(() => {
        axiosClient
            .get("/AllEmployName")
            .then((response) => {
                console.log("Fetched employees:", response.data);
                setEmployeesAdd(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef1.current &&
                !dropdownRef1.current.contains(event.target)
            ) {
                setOpenLoanList(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const filteredEmployeesAdd = employeesAdd.filter(
        (employee) =>
            typeof employee === "string" &&
            employee.toLowerCase().includes(searchAdd.toLowerCase())
    );
    // one list two
    // const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true); // loading start
        fetch("http://127.0.0.1:8000/api/employeesAddTwo")
            .then((res) => res.json())
            .then((data) => {
                setEmployeesAddTwo(
                    Array.isArray(data) ? data : Object.values(data)
                );
                setIsLoading(false); //  loading End
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
                setIsLoading(false); // Loading error
            });
    }, []);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef2.current &&
                !dropdownRef2.current.contains(event.target)
            ) {
                setOpenLoanListTwo(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const filteredEmployeesAddTwo = employeesAddTwo.filter(
        (employee) =>
            typeof employee === "string" &&
            employee.toLowerCase().includes(searchAddTwo.toLowerCase())
    );
    // date now toggle

    // Active and inactive
    const [emploes] = useState(["Active", "Inactive"]);

    const [isInputActive, setIsInputActive] = useState(false);

    // new State now ডাটা পাঠানোর জন্য ব্যবহার করা হয়েছে
    const [loanDetails, setLoanDetails] = useState("");
    const [amount, setAmount] = useState("");
    const [approvedDate, setApprovedDate] = useState("");
    const [repaymentFrom, setRepaymentFrom] = useState("");
    const [interestPercentage, setInterestPercentage] = useState("");
    const [installmentPeriod, setInstallmentPeriod] = useState("");
    const [repaymentAmount, setRepaymentAmount] = useState("");
    const [installment, setInstallment] = useState("");
    const [status, setStatus] = useState("");
    const handleClick = (status) => {
        setStatus(status);
        setIsInputActive(false); // Close dropdown after selecting status
    };

    const [loading, setLoading] = useState(false);
    // error now show in input
    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Send both form data and employee data to Laravel API
            const response = await axiosClient.post("/submit-loan", {
                employee_one: selectedEmployeeAdd, // sending employee one data
                employee_two: selectedEmployeeAddTwo, // sending employee two data
                loan_details: loanDetails,
                amount: amount,
                approved_date: approvedDate,
                repayment_from: repaymentFrom,
                interest_percentage: interestPercentage,
                installment_period: installmentPeriod,
                repayment_amount: repaymentAmount,
                installment: installment,
                status: status,
            });

            fetchLoans();
            resetForm();
            setFilter(false);
            setList(false);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };
    const resetForm = () => {
        setSelectedEmployeeAdd(null);
        setSelectedEmployeeAddTwo(null);
        setLoanDetails("");
        setAmount("");
        setApprovedDate("");
        setRepaymentFrom("");
        setInterestPercentage("");
        setInstallmentPeriod("");
        setRepaymentAmount("");
        setInstallment("");
        setStatus("");
        setErrors({});
    };

    // new State now ডাটা পাঠানোর জন্য ব্যবহার করা শেষ
    // mysql এখন ডাটা আনা হচ্ছে
    const [loans, setLoans] = useState([]);
    // Fetch loan data from Laravel API
    const fetchLoans = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/loans"); // Adjust API endpoint as needed

            setLoans(response.data);
        } catch (error) {
            console.error("Error fetching loans", error);
        }
    };

    useEffect(() => {
        fetchLoans(); // Fetch loans when the component mounts
    }, []);
    // input search now
    const [searchQuery, setSearchQuery] = useState("");
    // Filter loans based on search query
    const filteredLoans = loans.filter((loan) => {
        // Adjust filter criteria based on what you're searching for, e.g., employee names or loan details
        return (
            loan.employee_one
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            loan.employee_two
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            loan.loan_details.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
    // Handle search input
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    // xlsx download now
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredLoans); // Convert filteredLoans array to worksheet
        const workbook = XLSX.utils.book_new(); // Create a new workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Loans"); // Add worksheet to workbook
        XLSX.writeFile(workbook, "loans_data.xlsx"); // Trigger file download with the name 'loans_data.xlsx'
    };
    // csv download
    // Function to handle exporting table data to CSV
    const exportToCSV = () => {
        const csvData = filteredLoans.map((loan) => ({
            Sl: loan.id,
            EmployeeName: loan.employee_one,
            PermittedBy: loan.employee_two,
            LoanDetails: loan.loan_details,
            Amount: loan.amount,
            ApprovedDate: loan.approved_date,
            RepaymentFrom: loan.repayment_from,
            InterestPercentage: loan.interest_percentage,
            InstallmentPeriod: loan.installment_period,
            RepaymentAmount: loan.repayment_amount,
            Installment: loan.installment,
            Status: loan.status,
        }));

        // Using PapaParse to convert to CSV format
        const csv = Papa.unparse(csvData);

        // Create a Blob and download as CSV
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "loans_data.csv"; // Specify the file name
        link.click();
    };
    // পেজ নিধারন করব
    const [entriesPerPage, setEntriesPerPage] = useState(10); // Default: 10
    const [currentPage, setCurrentPage] = useState(1); // পেজ নাম্বার

    // Dropdown পরিবর্তন হ্যান্ডেল করা
    const handleEntriesChange = (event) => {
        setEntriesPerPage(parseInt(event.target.value)); // সংখ্যা হিসাবে সেট করা
        setCurrentPage(1); // প্রথম পেজে ফিরে যাওয়া
    };

    // নির্দিষ্ট সংখ্যক loans ফিল্টার করা
    const paginatedLoans = filteredLoans.slice(0, entriesPerPage);
    // edit button work
    const [editingLoan, setEditingLoan] = useState(null);
    const [updatedLoan, setUpdatedLoan] = useState({
        employee_one: "",
        employee_two: "",
        loan_details: "",
        amount: "",
        approved_date: "",
        repayment_from: "",
        interest_percentage: "",
        installment_period: "",
        repayment_amount: "",
        installment: "",
        status: "",
    });
    // button click now
    const handleEdit = (loan) => {
        setEditingLoan(loan);
        setUpdatedLoan(loan); // ফর্মে পুরাতন ডাটা সেট করা
    };
    // 📌 ইনপুট ফিল্ড আপডেট হ্যান্ডলার
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedLoan({ ...updatedLoan, [name]: value });
    };
    // 📌 Update ফর্ম সাবমিট করা
    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/loans/${editingLoan.id}`,
                updatedLoan
            );
            alert("Loan updated successfully!");
            setEditingLoan(null); // Modal বন্ধ করা
            fetchLoans(); // নতুন ডাটা রিফ্রেশ করা
        } catch (error) {
            console.error("Error updating loan:", error);
        }
    };
    // 📌 Delete হ্যান্ডলার
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this loan?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/loans/${id}`);
            alert("Loan deleted successfully!");
            fetchLoans(); // নতুন ডাটা রিফ্রেশ করা
        } catch (error) {
            console.error("Error deleting loan:", error);
        }
    };
    return (
        <div>
            <div className="p-4 bg-white rounded-lg h-auto w-auto mt-5 shadow-md">
                <div>
                    <div className="flex items-center justify-between">
                        <h6 className="text-lg font-semibold mb-0">
                            Loan list
                        </h6>
                        <div className="flex w-[220px] justify-between items-center">
                            <button
                                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 flex items-center"
                                onClick={() => setFilter(!openFilter)}
                            >
                                <FontAwesomeIcon icon={faFilter} />
                                <span className="ml-2">Filter</span>
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                                onClick={() => setList(true)}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <span className="ml-2">Add Loan</span>
                            </button>
                        </div>
                    </div>
                    {/* Ensure bng is visible */}
                    <div className="mt-[20px]">
                        <hr />
                    </div>
                    {/* AnimatePresence দিয়ে ধীরে ধীরে আসার জন্য */}
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
                                    <div
                                        className="mt-5 ml-4 w-64 relative"
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
                    {openList && (
                        <form onSubmit={handleSubmit}>
                            <div className="fixed inset-0 bg-gray-200 bg-opacity-50 z-50 flex justify-center items-center  ">
                                <div className="bg-white rounded-md shadow-lg w-[800px] max-h-[100vh] overflow-y-auto p-6 no-scrollbar scrollable-containe">
                                    <div className="w-[700px] mt-6 p-6 sticky ">
                                        <h1 className="ml-4 text-lg font-semibold">
                                            Add New Loan
                                        </h1>
                                        <div className="border-b border-gray-200 my-3"></div>

                                        <div className="space-y-4 ml-4">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="mt-5 ml-4 w-64 relative"
                                                    ref={dropdownRef1}
                                                >
                                                    {/* Select Box */}
                                                    <div className="flex items-center justify-between w-[620px]">
                                                        <div className="w-[180px] ml-[-18px]">
                                                            Employee name*
                                                        </div>
                                                        <div
                                                            className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
                                                            onClick={() =>
                                                                setOpenLoanList(
                                                                    !openLoanList
                                                                )
                                                            }
                                                        >
                                                            {
                                                                selectedEmployeeAdd
                                                            }
                                                        </div>
                                                    </div>
                                                    {/* error show */}
                                                    {errors.employee_one && (
                                                        <p className="text-red-500 text-sm mt-1 ml-[162px]">
                                                            {
                                                                errors
                                                                    .employee_one[0]
                                                            }
                                                        </p>
                                                    )}
                                                    {/* error show */}
                                                    {/* Dropdown */}
                                                    {openLoanList && (
                                                        <div className="absolute mt-2 w-[500px] bg-white border rounded-lg shadow-lg z-10 left-[125px]">
                                                            <input
                                                                type="text"
                                                                placeholder="Search..."
                                                                className={`w-[500px] h-10 px-2 py-1 text-gray-700 border-b border-gray-300 ml-[0px] 
                                                                    border ${
                                                                        openLoanList
                                                                            ? "border-green-100 ring-1 ring-green-200"
                                                                            : "border-gray-300"
                                                                    } 
                                                                    focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                                value={
                                                                    searchAdd
                                                                }
                                                                onChange={(e) =>
                                                                    setSearchAdd(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            <ul className="w-[500px] ml-[15px] h-40 overflow-y-auto">
                                                                {filteredEmployeesAdd.length >
                                                                0 ? (
                                                                    filteredEmployeesAdd.map(
                                                                        (
                                                                            employee,
                                                                            index
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="p x-4 py-2 
                                                                                w-[500px] hover:bg-gray-200 cursor-pointer"
                                                                                onClick={() => {
                                                                                    setSelectedEmployeeAdd(
                                                                                        employee
                                                                                    );
                                                                                    setOpenLoanList(
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
                                                                        No
                                                                        results
                                                                        found
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* two */}

                                            <div className="flex items-center gap-4">
                                                <div
                                                    className=" ml-4 w-64 relative"
                                                    ref={dropdownRef2}
                                                >
                                                    <div className="flex items-center justify-between w-[620px]">
                                                        <div className="w-[180px] ml-[-18px]">
                                                            Permitted by*
                                                        </div>
                                                        <div
                                                            className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
                                                            onClick={() =>
                                                                setOpenLoanListTwo(
                                                                    !openLoanListTwo
                                                                )
                                                            }
                                                        >
                                                            {
                                                                selectedEmployeeAddTwo
                                                            }
                                                        </div>
                                                    </div>
                                                    {errors.employee_two && (
                                                        <p className="text-red-500 text-sm mt-1 ml-[162px]">
                                                            {
                                                                errors
                                                                    .employee_two[0]
                                                            }
                                                        </p>
                                                    )}
                                                    {/* dorown two */}
                                                    {openLoanListTwo && (
                                                        <div className="absolute mt-2 w-[500px] bg-white border rounded-lg shadow-lg z-10 left-[125px]">
                                                            <input
                                                                type="text"
                                                                placeholder="Search..."
                                                                className={`w-[500px] h-10 px-2 py-1 text-gray-700 border-b border-gray-300 ml-[0px] 
                                                               border ${
                                                                   openLoanListTwo
                                                                       ? "border-green-100 ring-1 ring-green-200"
                                                                       : "border-gray-300"
                                                               } 
                                                               focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                                value={
                                                                    searchAddTwo
                                                                }
                                                                onChange={(e) =>
                                                                    setSearchAddTwo(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />

                                                            <ul className="w-[500px] h-40 overflow-y-auto">
                                                                {/* ✅ লোডিং হলে "Loading..." দেখাবে */}
                                                                {isLoading ? (
                                                                    <li className="px-4 py-2 text-gray-500 flex items-center">
                                                                        <svg
                                                                            className="animate-spin h-5 w-5 mr-2 text-gray-500"
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
                                                                        Loading...
                                                                    </li>
                                                                ) : filteredEmployeesAddTwo.length >
                                                                  0 ? (
                                                                    filteredEmployeesAddTwo.map(
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
                                                                                    setSelectedEmployeeAddTwo(
                                                                                        employee
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
                                                                        No
                                                                        results
                                                                        found
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* three */}
                                            <div className="flex items-start gap-4">
                                                <label className="w-40 font-medium">
                                                    Loan details
                                                </label>
                                                <textarea
                                                    className="w-full h-20 border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-green-500 outline-none "
                                                    placeholder="Loan details..."
                                                    required
                                                    value={loanDetails}
                                                    onChange={(e) =>
                                                        setLoanDetails(
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>
                                                {errors.loan_details && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.loan_details[0]}
                                                    </p>
                                                )}
                                            </div>
                                            {/* four */}
                                            <div className="flex items-center gap-4">
                                                <label className="w-40 font-medium">
                                                    Amount*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-green-500 outline-none"
                                                    placeholder="Amount"
                                                    required
                                                    value={amount}
                                                    onChange={(e) =>
                                                        setAmount(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.amount && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.amount[0]}
                                                    </p>
                                                )}
                                            </div>
                                            {/* five */}
                                            <div className="flex items-center gap-4">
                                                <label className="w-40 font-medium">
                                                    Approved date*
                                                </label>
                                                <input
                                                    type="date"
                                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-green-500 outline-none"
                                                    required
                                                    value={approvedDate}
                                                    onChange={(e) =>
                                                        setApprovedDate(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.approved_date && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors
                                                                .approved_date[0]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {/* six */}
                                            <div className="flex items-center gap-4">
                                                <label className="w-40 font-medium">
                                                    Repayment from*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-green-500 outline-none"
                                                    placeholder="Repayment from"
                                                    required
                                                    value={repaymentFrom}
                                                    onChange={(e) =>
                                                        setRepaymentFrom(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.repayment_from && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors
                                                                .repayment_from[0]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {/* 7th */}
                                            <div className="flex items-center gap-4">
                                                <label className="w-40 font-medium">
                                                    Interest percentage(%)*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-green-500 outline-none"
                                                    placeholder="Interest percentage"
                                                    required
                                                    value={interestPercentage}
                                                    onChange={(e) =>
                                                        setInterestPercentage(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.interest_percentage && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors
                                                                .interest_percentage[0]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {/* 8th */}
                                            <div className="flex items-center gap-4">
                                                <label className="w-40 font-medium">
                                                    Installment period*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-green-500 outline-none"
                                                    placeholder="Installment period"
                                                    required
                                                    value={installmentPeriod}
                                                    onChange={(e) =>
                                                        setInstallmentPeriod(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.installment_period && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors
                                                                .installment_period[0]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {/* 9th */}
                                            <div className="flex items-center gap-4">
                                                <label className="w-40 font-medium">
                                                    Repayment amount*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-green-500 outline-none"
                                                    placeholder="Repayment amount"
                                                    required
                                                    value={repaymentAmount}
                                                    onChange={(e) =>
                                                        setRepaymentAmount(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.repayment_amount && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            errors
                                                                .repayment_amount[0]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {/* 10th */}
                                            <div className="flex items-center gap-4">
                                                <label className="w-40 font-medium">
                                                    Installment*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full h-10 border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-green-500 outline-none"
                                                    placeholder="Installment"
                                                    required
                                                    value={installment}
                                                    onChange={(e) =>
                                                        setInstallment(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.installment && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.installment[0]}
                                                    </p>
                                                )}
                                            </div>
                                            {/* last */}
                                            <div className=" ">
                                                <div className="">
                                                    <div className="flex items-center gap-4 justify-between">
                                                        <div>
                                                            <h1 className="font-semibold text-lg ">
                                                                Status
                                                            </h1>
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={status}
                                                                placeholder="Select Status"
                                                                className="w-[500px] h-10 border border-gray-300 rounded-md p-2 mt-4 ml-[50px] focus:border-green-500 focus:ring-green-500 outline-none"
                                                                onClick={() =>
                                                                    setIsInputActive(
                                                                        !isInputActive
                                                                    )
                                                                } // Toggle input dropdown on click
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Input field for displaying and selecting status */}

                                                    {/* Dropdown list to select Active/Inactive, shown when input is clicked */}
                                                    {isInputActive && (
                                                        <ul
                                                            className={`mt-2 w-[500px] p-2 border border-gray-300 rounded-md shadow-lg ml-[135px] transition-all duration-300 ${
                                                                isInputActive
                                                                    ? "opacity-100 max-h-[200px] overflow-y-auto"
                                                                    : "opacity-0 max-h-0"
                                                            }`}
                                                        >
                                                            {emploes.map(
                                                                (
                                                                    status,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="cursor-pointer hover:bg-gray-200 p-2"
                                                                        onClick={() =>
                                                                            handleClick(
                                                                                status
                                                                            )
                                                                        } // Set selected status
                                                                    >
                                                                        {status}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-4 justify-end mt-4">
                                            <button
                                                type="button"
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                onClick={() => setList(false)} // Close the modal
                                            >
                                                Close
                                            </button>

                                            {/* Reset Button - Blue */}
                                            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                                Reset
                                            </button>
                                            {/* Save Button - Green */}
                                            <button
                                                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
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
                                    onChange={handleEntriesChange}
                                    value={entriesPerPage}
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
                                onClick={exportToCSV}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faFileCsv} />
                                </div>
                                CSV
                            </button>
                            <button
                                className="flex w-[70px]  bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={exportToExcel}
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
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[1300px] mx-auto mt-[20px]">
                    <table className="w-full bg-white border border-gray-300 rounded-md shadow-md">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="px-4 py-2 text-left w-[5%] h-[50px]">
                                    Sl
                                </th>
                                <th className="px-4 py-2 text-left w-[15%] h-[50px]">
                                    Employee Name
                                </th>
                                <th className="px-4 py-2 text-left w-[15%] h-[50px]">
                                    Permitted by
                                </th>
                                <th className="px-4 py-2 text-left w-[15%] h-[50px]">
                                    Loan Details
                                </th>
                                <th className="px-4 py-2 text-left w-[10%] h-[50px]">
                                    Amount
                                </th>
                                <th className="px-4 py-2 text-left w-[10%] h-[50px]">
                                    Approved Date
                                </th>
                                <th className="px-4 py-2 text-left w-[10%] h-[50px]">
                                    Repayment From
                                </th>
                                <th className="px-4 py-2 text-left w-[10%] h-[50px]">
                                    Interest (%)
                                </th>
                                <th className="px-4 py-2 text-left w-[10%] h-[50px]">
                                    Installment Period
                                </th>
                                <th className="px-4 py-2 text-left w-[10%] h-[50px]">
                                    Repayment Amount
                                </th>
                                <th className="px-4 py-2 text-left w-[10%] h-[50px]">
                                    Installment
                                </th>
                                <th className="px-4 py-2 text-left w-[10%] h-[50px]">
                                    Status
                                </th>
                                <th className="px-4 py-2 text-left w-[10%] h-[50px]">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLoans.length > 0 ? (
                                paginatedLoans.map((loan, index) => (
                                    <tr
                                        key={loan.id}
                                        className="border-b h-[60px]"
                                    >
                                        <td className="px-4 py-2 text-gray-700">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {loan.employee_one}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {loan.employee_two}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {loan.loan_details}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            ${loan.amount}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {loan.approved_date}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {loan.repayment_from}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {loan.interest_percentage}%
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {loan.installment_period} months
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            ${loan.repayment_amount}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            ${loan.installment}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {loan.status}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700 flex flex-col items-center justify-center">
                                            <button
                                                className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm my-1"
                                                onClick={() => handleEdit(loan)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />
                                            </button>
                                            <button
                                                className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm my-1"
                                                onClick={() =>
                                                    handleDelete(loan.id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="12"
                                        className="px-4 py-2 text-center text-gray-500"
                                    >
                                        No loans found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {editingLoan && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-md w-[400px]">
                                <h2 className="text-xl font-bold mb-4">
                                    Edit Loan
                                </h2>
                                <label className="block mb-2">
                                    Employee Name
                                </label>
                                <input
                                    type="text"
                                    name="employee_one"
                                    value={updatedLoan.employee_one}
                                    onChange={handleInputChange}
                                    className="w-full border px-3 py-2 rounded mb-2"
                                />
                                <label className="block mb-2">
                                    Loan Amount
                                </label>
                                <input
                                    type="text"
                                    name="amount"
                                    value={updatedLoan.amount}
                                    onChange={handleInputChange}
                                    className="w-full border px-3 py-2 rounded mb-2"
                                />
                                <label className="block mb-2">Status</label>
                                <select
                                    name="status"
                                    value={updatedLoan.status}
                                    onChange={handleInputChange}
                                    className="w-full border px-3 py-2 rounded mb-2"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>

                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => setEditingLoan(null)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="relative">
                <div>
                    <footer className="bg-[#fff] mt-[20px] h-[60px]  rounded-lg ml-[10px]">
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

export default LoanListOne;
