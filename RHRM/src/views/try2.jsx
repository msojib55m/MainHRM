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

const SalaryAdvanceOne = () => {
    // ডাটা আনার জন্য ব্যবহার করা হয়েছে
    const [selectedEmployee, setSelectedEmployee] = useState("Select Employee");
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    const [noticeDescription, setNoticeDescription] = useState("");
    const [salaryMonth, setSalaryMonth] = useState("");
    const [isActive, setIsActive] = useState("active");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [AddSalaryAdvance, setAddSalaryAdvance] = useState(false);
    // empoly input
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
    // ডাটা  এখানে শেয় করা হয়েছে
    // data to send mysql now
    const [salaryAdvances, setSalaryAdvances] = useState([]);
    const [loadingNow, setLoadingNow] = useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // লোডিং শুরু
        const formData = {
            employee: selectedEmployee,
            notice_description: noticeDescription,
            salary_month: salaryMonth,
            is_active: isActive,
        };
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/salary-advance",
                formData
            );
            // 🔥 নতুন ডাটা টেবিলে যুক্ত করা হচ্ছে
            setSelectedEmployee("Select Employee");
            setNoticeDescription("");
            setSalaryMonth("");
            setIsActive("active");
            setAddSalaryAdvance(false); // Close modal after submission
            setSalaryAdvances((prev) => [...prev, response.data]);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false); // লোডিং শেষ
        }
    };

    // data to send mysql Ends
    // data get now
    // API থেকে ডাটা আনা

    useEffect(() => {
        const fetchData = async () => {
            setLoadingNow(true);
            try {
                console.log("Fetching data from API..."); // Debugging
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/salary-advanceNow"
                );
                console.log("API Response:", response.data); // Debugging
                setSalaryAdvances(response.data);
            } catch (error) {
                console.error("Error fetching salary advances:", error);
            } finally {
                setLoadingNow(false);
            }
        };

        fetchData();
    }, []);

    // data get ends
    return (
        <div>
            <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] shadow-[0px_9px_26px_0px_#00000024]">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-lg font-semibold mb-0">
                            Salary advanced list
                        </h6>
                    </div>
                    <div className="">
                        <button
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                            onClick={() => setAddSalaryAdvance(true)}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <div className="ml-[5px]">Add Salary advanced</div>
                        </button>
                    </div>
                </div>
                {/* 1st start */}
                <div class="p-4  ">
                    <div className="mt-[20px]">
                        <hr />
                    </div>
                    <div class="flex justify-between items-center ">
                        <div className="mt-[20px]  ">
                            <label className="text-sm font-medium text-[20px]">
                                Show
                                <select
                                    name="example_length"
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
                    <div className="mt-[20px]">
                        <hr />
                    </div>
                    <div className="mt-[20px]">
                        {loadingNow ? (
                            <p>Loading...</p>
                        ) : (
                            <table className="min-w-full table-auto border-collapse">
                                <thead className="text-left">
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2">
                                            SL
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Employee name
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Amount
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Release amount
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Salary month
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Status
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salaryAdvances.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="border border-gray-300"
                                        >
                                            <td className="border border-gray-300 px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.notice_description}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                0
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {item.salary_month}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <span
                                                    className={`px-2 py-1 rounded ${
                                                        item.is_active ===
                                                        "active"
                                                            ? "bg-green-500 text-white"
                                                            : "bg-red-500 text-white"
                                                    }`}
                                                >
                                                    {item.is_active}
                                                </span>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-left">
                                                <button className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1">
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
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            {AddSalaryAdvance && (
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
                                    <h4>Employee*</h4>
                                    <div className="flex items-center justify-between w-[498px]">
                                        <div
                                            className="mt-5  w-64 relative"
                                            ref={dropdownRef}
                                        >
                                            {/* Select Box */}
                                            <div
                                                className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                                                onClick={() =>
                                                    setIsOpen(!isOpen)
                                                }
                                            >
                                                {selectedEmployee}
                                            </div>

                                            {/* Dropdown */}
                                            {isOpen && (
                                                <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer"
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
                                                                        key={
                                                                            index
                                                                        }
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
                                                                        {
                                                                            employee
                                                                        }
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
                                </div>
                                {/* Notice Description */}
                                <div className="flex w-[700px] items-center justify-between mt-4">
                                    <div>
                                        <h4>Notice descriptiion*</h4>
                                    </div>
                                    <div className="flex items-center justify-between w-[498px]">
                                        <input
                                            type="text"
                                            className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                            placeholder="Amount"
                                            value={noticeDescription}
                                            onChange={(e) =>
                                                setNoticeDescription(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                {/* Salary Month */}
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
                                            value={salaryMonth}
                                            onChange={(e) =>
                                                setSalaryMonth(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                {/* active selected start */}

                                <div className="flex w-[700px] items-center justify-between mt-4">
                                    <h4>Is active *</h4>
                                    <div className="flex flex-col w-[498px]">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="is_active"
                                                value="active"
                                                checked={isActive === "active"}
                                                onChange={() =>
                                                    setIsActive("active")
                                                }
                                            />
                                            <span>Active</span>
                                        </label>
                                        <label className="flex items-center space-x-2 mt-2">
                                            <input
                                                type="radio"
                                                name="is_active"
                                                value="inactive"
                                                checked={
                                                    isActive === "inactive"
                                                }
                                                onChange={() =>
                                                    setIsActive("inactive")
                                                }
                                            />
                                            <span>Inactive</span>
                                        </label>
                                    </div>
                                </div>

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

export default SalaryAdvanceOne;
