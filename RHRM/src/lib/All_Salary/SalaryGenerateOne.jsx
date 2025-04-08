import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// fontawesome Icon start
// custome Image
import {
    faCirclePlus,
    faCheck,
    faList,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const SalaryGenerateOne = () => {
    const [AddSalaryGenerate, setAddSalaryGenerate] = useState(false);
    const [loading, setLoading] = useState(true); // To show loading state
    const [formData, setFormData] = useState({
        salary_name: "",
        generate_date: "",
        salary_month: "",
        approved_date: "",
        gross_salary: "",
        net_salary: "",
        loans: "",
    });
    const [salaries, setSalaries] = useState([]); // To store fetched salaries

    // Fetch salaries from backend
    useEffect(() => {
        fetchSalaries();
    }, []);

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/salaries"
            );
            setSalaries(response.data);
        } catch (error) {
            console.error("Error fetching salaries:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // Handle form input changes

    // Handle form submission

    // ডাটা আনা হচ্ছে
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://127.0.0.1:8000/api/salaries", formData);
            alert("Salary data saved successfully!");
            // অপশনালি form reset করো
            setFormData({
                salary_name: "",
                generate_date: "",
                salary_month: "",
                approved_date: "",
                gross_salary: "",
                net_salary: "",
                loans: "",
            });
            fetchSalaries();
            setAddSalaryGenerate(false);
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };
    // যেন টেবিল যেন না থাকে
    const [showTable, setShowTable] = useState(true);
    const [showSheet, setShowSheet] = useState(false);
    const handleCheckClick = () => {
        setShowTable(!showTable); // Toggle the table visibility
        setShowSheet(!showSheet);
    };
    return (
        <div>
            <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] shadow-[0px_9px_26px_0px_#00000024]">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-lg font-semibold mb-0">Salary list</h6>
                    </div>
                    <div className="">
                        <button
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                            onClick={() => setAddSalaryGenerate(true)}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <div className="ml-[5px]">Select salary month</div>
                        </button>
                    </div>
                </div>
                <div className="mt-[20px]">
                    <hr />
                </div>
                {showTable && (
                    <div className="mt-[20px]">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="text-left">
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">
                                        SL
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Salary name
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Generate date
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Generate by
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Status
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Approved date
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Approved by
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="8"
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
                                ) : salaries.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="text-center py-4"
                                        >
                                            No data found
                                        </td>
                                    </tr>
                                ) : (
                                    salaries.map((salary, index) => (
                                        <tr key={salary.id}>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {salary.salary_name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {salary.generate_date}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                Admin
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                                    Approved
                                                </button>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {salary.approved_date}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                admin
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-left">
                                                <button
                                                    className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                    onClick={handleCheckClick}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                </button>
                                                <button className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1">
                                                    <FontAwesomeIcon
                                                        icon={faList}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                {/* secound type */}
                {showSheet && (
                    <div>
                        <div className="text-center mt-[10px]">
                            <h6 className="text-[20px] text-[#000] ">
                                Payroll posting sheet for March, 2030
                            </h6>
                            <h6 className="text-[35px] text-green-500">
                                ( Approved )
                            </h6>
                        </div>
                        <div className="mt-[10px]">
                            <hr />
                        </div>
                        <div>
                            <table className="table-auto border-collapse border border-gray-300 w-full">
                                <thead>
                                    <tr className="bg-gray-600 text-center font-semibold text-white">
                                        <td colSpan="1" className="px-4 py-2">
                                            Description
                                        </td>
                                        <td colSpan="2" className="px-4 py-2">
                                            Amounts
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2"></td>
                                        <td className="font-semibold px-4 py-2">
                                            Debit
                                        </td>
                                        <td className="font-semibold px-4 py-2">
                                            Credit
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <th className="px-4 py-2">
                                            Gross salary
                                        </th>
                                        <td className="px-4 py-2">
                                            ৳ 9,038.00
                                        </td>
                                        <td className="px-4 py-2"></td>
                                    </tr>
                                    <tr className="text-center">
                                        <th className="px-4 py-2">
                                            Net salary
                                        </th>
                                        <td className="px-4 py-2"></td>
                                        <td className="px-4 py-2">
                                            ৳ -19,554.00
                                        </td>
                                    </tr>
                                    <tr className="text-center">
                                        <th className="px-4 py-2">Loans</th>
                                        <td className="px-4 py-2"></td>
                                        <td className="px-4 py-2">
                                            ৳ 28,592.00
                                        </td>
                                    </tr>
                                    <tr className="text-center">
                                        <th className="px-4 py-2">
                                            Salary advance
                                        </th>
                                        <td className="px-4 py-2"></td>
                                        <td className="px-4 py-2">৳ 0.00</td>
                                    </tr>
                                    <tr className="text-center">
                                        <th className="px-4 py-2">
                                            State income tax
                                        </th>
                                        <td className="px-4 py-2"></td>
                                        <td className="px-4 py-2">৳ 0.00</td>
                                    </tr>
                                    <tr className="text-center">
                                        <th className="px-4 py-2">
                                            Employee npf contribution
                                        </th>
                                        <td className="px-4 py-2"></td>
                                        <td className="px-4 py-2">৳ 0.00</td>
                                    </tr>
                                    <tr className="text-center">
                                        <th className="px-4 py-2">
                                            Employer npf contribution
                                        </th>
                                        <td className="px-4 py-2"></td>
                                        <td className="px-4 py-2">৳ 0.00</td>
                                    </tr>
                                    <tr className="text-center">
                                        <th className="px-4 py-2">
                                            Iicf contribution
                                        </th>
                                        <td className="px-4 py-2"></td>
                                        <td className="px-4 py-2">৳ 0.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {/* secound type */}
            </div>

            {/* table number one */}
            {AddSalaryGenerate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Background Overlay */}
                    <div className="fixed inset-0 bg-black opacity-50"></div>

                    {/* Position Form */}
                    <div className="w-[800px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                        <h5 className="text-lg font-semibold">
                            Add salary advance
                        </h5>
                        <hr className="border-t-1 border-gray-300 mt-2" />

                        {/* Input Fields */}
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4">
                                <div className="flex w-[700px] items-center justify-between">
                                    <h4>Salary name *</h4>
                                    <div className="flex items-center justify-between w-[498px]">
                                        <input
                                            type="date"
                                            className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                            placeholder="----"
                                            onFocus={(e) =>
                                                e.target.showPicker()
                                            }
                                            name="salary_name"
                                            value={formData.salary_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Notice Description */}
                                <div className="flex w-[700px] items-center justify-between mt-4">
                                    <div>
                                        <h4>Generate date *</h4>
                                    </div>
                                    <div className="flex items-center justify-between w-[498px]">
                                        <input
                                            type="date"
                                            className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                            placeholder="Amount"
                                            name="generate_date"
                                            value={formData.generate_date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Salary Month */}
                                {/* active selected start */}

                                {/* active selected end */}
                                <div className="flex w-[700px] items-center justify-between mt-4">
                                    <div>
                                        <h4>Salary month *</h4>
                                    </div>
                                    <div className="flex items-center justify-between w-[498px]">
                                        <input
                                            type="date"
                                            className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                            placeholder="----"
                                            onFocus={(e) =>
                                                e.target.showPicker()
                                            }
                                            name="salary_month"
                                            value={formData.salary_month}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* active selected end */}
                                <div className="flex w-[700px] items-center justify-between mt-4">
                                    <div>
                                        <h4>Approved date *</h4>
                                    </div>
                                    <div className="flex items-center justify-between w-[498px]">
                                        <input
                                            type="date"
                                            className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                            placeholder="----"
                                            onFocus={(e) =>
                                                e.target.showPicker()
                                            }
                                            name="approved_date"
                                            value={formData.approved_date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-[700px] items-center justify-between mt-4">
                                    <div>
                                        <h4>Gross salary *</h4>
                                    </div>
                                    <div className="flex items-center justify-between w-[498px]">
                                        <input
                                            type="text"
                                            className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                            placeholder="Gross salary"
                                            name="gross_salary"
                                            value={formData.gross_salary}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-[700px] items-center justify-between mt-4">
                                    <div>
                                        <h4>Net salary *</h4>
                                    </div>
                                    <div className="flex items-center justify-between w-[498px]">
                                        <input
                                            type="text"
                                            className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                            placeholder="Net salary"
                                            name="net_salary"
                                            value={formData.net_salary}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-[700px] items-center justify-between mt-4">
                                    <div>
                                        <h4>Loans *</h4>
                                    </div>
                                    <div className="flex items-center justify-between w-[498px]">
                                        <input
                                            type="text"
                                            className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                            placeholder="Loans"
                                            name="loans"
                                            value={formData.loans}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
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
                                            setAddSalaryGenerate(false)
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
            {/* table number one */}
        </div>
    );
};

export default SalaryGenerateOne;
