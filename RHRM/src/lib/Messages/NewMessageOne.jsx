import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// fontawesome Icon start
// custome Image
import {
    faEdit,
    faTrash,
    faPlusSquare,
    faFileCsv,
    faFileExcel,
    faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const NewMessageOne = () => {
    const [addMessage, setMessage] = useState(false);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("Employee name");
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
    const [subject, setSubject] = useState("");
    const [message, setMessag] = useState("");
    const [allData, setAllData] = useState([]);
    const fetchData = () => {
        axios.get("http://127.0.0.1:8000/api/selection-terms").then((res) => {
            setAllData(res.data);
        });
    };
    useEffect(() => {
        fetchData();
    }, []);

    // ✅ Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/selection-terms", {
                candidate_name: selectedEmployee,
                subject,
                message,
            })
            .then(() => {
                fetchData(); // 🔄 Refresh table
                setSelectedEmployee("");
                setSubject("");
                setMessag("");
                setMessage(false);
            });
    };
    const [addEdit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const editHandler = (item) => {
        setSelectedEmployee(item.candidate_name); // Candidate dropdown
        setSubject(item.subject); // Subject input
        setMessag(item.message); // Message textarea
        setEdit(true); // Switch to Edit mode
        setEditId(item.id); // এই ID দরকার update করার সময়
    };
    const handleEditSubmit = (e) => {
        e.preventDefault();

        const payload = {
            candidate_name: selectedEmployee,
            subject: subject,
            message: message,
        };

        axios
            .put(`http://127.0.0.1:8000/api/selection-terms/${editId}`, payload)
            .then(() => {
                fetchData(); // টেবিল রিফ্রেশ হবে
                setSelectedEmployee("");
                setSubject("");
                setMessag("");
                setEdit(false);
                setEditId(null);
            })
            .catch((error) => {
                console.error("Edit error:", error);
            });
    };
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete?")) {
            axios
                .delete(`http://127.0.0.1:8000/api/selection-terms/${id}`)
                .then(() => {
                    fetchData(); // ✅ রিফ্রেশ করে নতুন ডাটা আনো
                })
                .catch((error) => {
                    console.error("Delete error:", error);
                });
        }
    };

    return (
        <div>
            <div className="relative">
                <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                    {/* one */}
                    <div class="flex items-center justify-between w-[auto] ">
                        <div>
                            <h6 class="text-lg font-semibold mb-0">Messages</h6>
                        </div>
                        <div className="">
                            <button
                                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                                onClick={() => setMessage(true)}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <div className="ml-[5px]">New message</div>
                            </button>
                        </div>
                    </div>
                    {/* one */}
                    <div class="mt-[20px]">
                        <hr />
                        <div class="flex justify-between items-center ">
                            {/* select data page */}
                            <div className="mt-[20px]  ">
                                <label className="text-sm font-medium text-[20px]">
                                    Show
                                    <select className="    p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none h-[40px] ml-[10px] mr-[10px]">
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
                            {/* select data page */}

                            {/* search filed  */}
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
                            {/* search filed  */}
                        </div>

                        <div className="mt-[20px] overflow-x-auto max-w-[12000px] mx-auto border rounded">
                            <table className="min-w-full table-auto border-collapse">
                                <thead className="text-left">
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            SL
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Sender name
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Subject
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Message
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Status
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allData.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="border px-2 py-1">
                                                {index + 1}
                                            </td>
                                            <td className="border px-2 py-1">
                                                {item.candidate_name}
                                            </td>
                                            <td className="border px-2 py-1">
                                                {item.subject}
                                            </td>
                                            <td className="border px-2 py-1">
                                                {item.message}
                                            </td>
                                            <td className="border px-2 py-1">
                                                {item.status}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <button
                                                    className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                    onClick={() =>
                                                        editHandler(item)
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
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {addMessage && (
                <div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                            <form onSubmit={handleSubmit}>
                                <div className="sticky">
                                    {/* name */}
                                    <div className="flex mt-5 justify-between">
                                        <div>
                                            <h4> Candidate name *</h4>
                                        </div>
                                        <div
                                            className=" w-[44rem] relative"
                                            ref={dropdownRef}
                                        >
                                            {/* Select Box */}
                                            <div
                                                className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
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
                                    {/* subject */}
                                    <div className="flex mt-[20px]">
                                        <div className="ml-[5px]">
                                            <h4>Subject</h4>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                className="w-[700px] ml-[139px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="Selection terms"
                                                value={subject}
                                                onChange={(e) =>
                                                    setSubject(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/* Subject */}
                                    {/* Email address  */}
                                    <div className="flex mt-[20px]">
                                        <div className="ml-[5px]">
                                            <h4>Selection terms *</h4>
                                        </div>
                                        <div>
                                            <textarea
                                                name=""
                                                rows="6"
                                                className="w-[700px] ml-[71px]  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="Message"
                                                value={message}
                                                onChange={(e) =>
                                                    setMessag(e.target.value)
                                                }
                                            ></textarea>
                                        </div>
                                    </div>
                                    {/* Address * */}

                                    <div className="w-[850px] flex items-center justify-end mt-[20px] ml-[50px]">
                                        <button
                                            type="submit"
                                            className="px-4 h-[40px] py-2 rounded-md flex items-center justify-center bg-green-500 text-white"
                                        >
                                            save
                                        </button>

                                        <button
                                            type="button"
                                            className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                                            onClick={() => setMessage(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {/* secound */}
                        </div>
                    </div>
                </div>
            )}
            {addEdit && (
                <div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                            <form onSubmit={handleEditSubmit}>
                                <div className="sticky">
                                    {/* name */}
                                    <div className="flex mt-5 justify-between">
                                        <div>
                                            <h4> Candidate name *</h4>
                                        </div>
                                        <div
                                            className=" w-[44rem] relative"
                                            ref={dropdownRef}
                                        >
                                            {/* Select Box */}
                                            <div
                                                className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
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
                                    {/* subject */}
                                    <div className="flex mt-[20px]">
                                        <div className="ml-[5px]">
                                            <h4>Subject</h4>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                className="w-[700px] ml-[139px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="Selection terms"
                                                value={subject}
                                                onChange={(e) =>
                                                    setSubject(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/* Subject */}
                                    {/* Email address  */}
                                    <div className="flex mt-[20px]">
                                        <div className="ml-[5px]">
                                            <h4>Selection terms *</h4>
                                        </div>
                                        <div>
                                            <textarea
                                                name=""
                                                rows="6"
                                                className="w-[700px] ml-[71px]  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="Message"
                                                value={message}
                                                onChange={(e) =>
                                                    setMessag(e.target.value)
                                                }
                                            ></textarea>
                                        </div>
                                    </div>
                                    {/* Address * */}

                                    <div className="w-[850px] flex items-center justify-end mt-[20px] ml-[50px]">
                                        <button
                                            type="submit"
                                            className="px-4 h-[40px] py-2 rounded-md flex items-center justify-center bg-green-500 text-white"
                                        >
                                            save
                                        </button>

                                        <button
                                            type="button"
                                            className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                                            onClick={() => setEdit(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {/* secound */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewMessageOne;
