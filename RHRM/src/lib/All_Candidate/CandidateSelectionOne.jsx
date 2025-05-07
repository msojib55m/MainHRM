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
const CandidateSelectionOne = () => {
    const [addSelection, setSection] = useState(false);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] =
        useState("Select candidate");
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/CandidateSelection")
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
    // number 2
    const dropdownRef2 = useRef(null);
    const [isOpen2, setIsOpen2] = useState(false);
    const [selectedEmployee2, setSelectedEmployee2] =
        useState("Select Position");
    const [search2, setSearch2] = useState("");
    const [employees2, setEmployees2] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/CandidateSelection2")
            .then((res) => res.json())
            .then((data) => {
                setEmployees2(Array.isArray(data) ? data : Object.values(data));
            })
            .catch((error) =>
                console.error("Error fetching employees:", error)
            );
    }, []);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef2.current &&
                !dropdownRef2.current.contains(event.target)
            ) {
                setIsOpen2(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const filteredEmployees2 = employees2.filter(
        (employee) =>
            typeof employee === "string" &&
            employee.toLowerCase().includes(search2.toLowerCase())
    );
    // মেইন কাজ শুরু হল
    const [terms, setTerms] = useState("");
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.get(
            "http://127.0.0.1:8000/api/selection-terms"
        );
        setData(res.data);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://127.0.0.1:8000/api/selection-terms", {
            candidate_name: selectedEmployee,
            position: selectedEmployee2,
            terms: terms,
        });
        setSelectedEmployee("");
        setSelectedEmployee2("");
        setTerms("");
        setSection(false);
        fetchData(); // Refresh table
    };
    // edit
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleEdit = (item) => {
        setEditId(item.id);
        setSelectedEmployee(item.candidate_name);
        setSelectedEmployee2(item.position);
        setTerms(item.terms);
        setEditMode(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/selectionTermsUpdate/${editId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        candidate_name: selectedEmployee,
                        position: selectedEmployee2,
                        terms: terms,
                    }),
                }
            );

            if (response.ok) {
                fetchData(); // Refresh table
                setEditMode(false); // Close modal
                setEditId(null); // Clear edit id
                setSelectedEmployee("Select candidate"); // Reset fields
                setSelectedEmployee2("Select Position");
                setTerms("");
            } else {
                console.error("Update failed");
            }
        } catch (error) {
            console.error("Error during update:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/selectionTermsDelete/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                fetchData(); // Refresh table after deletion
            } else {
                console.error("Delete failed");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };
    // সাচ
    const [searchTerm, setSearchTerm] = useState("");
    const filteredData = data.filter(
        (item) =>
            item.candidate_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.terms.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // পেজ
    const [entriesToShow, setEntriesToShow] = useState(10);

    return (
        <div>
            <div className="relative">
                <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                    <div class="flex items-center justify-between w-[auto] ">
                        <div>
                            <h6 class="text-lg font-semibold mb-0">
                                Candidate selection
                            </h6>
                        </div>
                        <div className="">
                            <button
                                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                                onClick={() => setSection(true)}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <div className="ml-[5px]">Add selection</div>
                            </button>
                        </div>
                    </div>
                    {/* one */}
                    {/* two */}
                    <div class="mt-[20px]">
                        <hr />
                        <div class="flex justify-between items-center ">
                            {/* select data page */}
                            <div className="mt-[20px]  ">
                                <label className="text-sm font-medium text-[20px]">
                                    Show
                                    <select
                                        className="    p-2 
                                                                                     border border-gray-300 
                                                                                     rounded-md 
                                                                                     focus:outline-none 
                                                                                     focus:ring-2 focus:ring-green-500 
                                                                                     focus:border-green-500 
                                                                                     appearance-none 
                                                                                     h-[40px] 
                                                                                     ml-[10px] 
                                                                                     mr-[10px]"
                                        value={entriesToShow}
                                        onChange={(e) =>
                                            setEntriesToShow(
                                                Number(e.target.value)
                                            )
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
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
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
                                            Candidate name *
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Position
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Selection terms
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData
                                            .slice(0, entriesToShow)
                                            .map((item, index) => (
                                                <tr key={index}>
                                                    <td className="border border-gray-300 px-2 py-1">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border border-gray-300 px-2 py-1">
                                                        {item.candidate_name}
                                                    </td>
                                                    <td className="border border-gray-300 px-2 py-1">
                                                        {item.position}
                                                    </td>
                                                    <td className="border border-gray-300 px-2 py-1">
                                                        {item.terms}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <button
                                                            className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                            />
                                                        </button>
                                                        <button
                                                            className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
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
                                                colSpan="5"
                                                className="text-center text-red-500 py-3 border border-gray-300"
                                            >
                                                No data found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {addSelection && (
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
                                                                    No results
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* number */}
                                        <div className="flex mt-5 justify-between">
                                            <div>
                                                <h4> Job Position </h4>
                                            </div>
                                            <div
                                                className=" w-[44rem] relative"
                                                ref={dropdownRef2}
                                            >
                                                {/* Select Box */}
                                                <div
                                                    className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
                                                    onClick={() =>
                                                        setIsOpen2(!isOpen2)
                                                    }
                                                >
                                                    {selectedEmployee2}
                                                </div>

                                                {/* Dropdown */}
                                                {isOpen2 && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            className="w-full h-10 px-2 py-1 text-gray-700 border-b border-gray-300"
                                                            value={search2}
                                                            onChange={(e) =>
                                                                setSearch2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <ul className="w-full h-40 overflow-y-auto">
                                                            {filteredEmployees2.length >
                                                            0 ? (
                                                                filteredEmployees2.map(
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
                                                                                setSelectedEmployee2(
                                                                                    employee
                                                                                );
                                                                                setIsOpen2(
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
                                        {/* Email address  */}
                                        <div className="flex mt-[20px]">
                                            <div className="ml-[5px]">
                                                <h4>Selection terms *</h4>
                                            </div>
                                            <div>
                                                <textarea
                                                    name=""
                                                    className="w-[700px] ml-[71px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    placeholder="Selection terms"
                                                    value={terms}
                                                    onChange={(e) =>
                                                        setTerms(e.target.value)
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
                                                onClick={() =>
                                                    setSection(false)
                                                }
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
                {editMode && (
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
                                                                    No results
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* number */}
                                        <div className="flex mt-5 justify-between">
                                            <div>
                                                <h4> Job Position </h4>
                                            </div>
                                            <div
                                                className=" w-[44rem] relative"
                                                ref={dropdownRef2}
                                            >
                                                {/* Select Box */}
                                                <div
                                                    className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
                                                    onClick={() =>
                                                        setIsOpen2(!isOpen2)
                                                    }
                                                >
                                                    {selectedEmployee2}
                                                </div>

                                                {/* Dropdown */}
                                                {isOpen2 && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            className="w-full h-10 px-2 py-1 text-gray-700 border-b border-gray-300"
                                                            value={search2}
                                                            onChange={(e) =>
                                                                setSearch2(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <ul className="w-full h-40 overflow-y-auto">
                                                            {filteredEmployees2.length >
                                                            0 ? (
                                                                filteredEmployees2.map(
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
                                                                                setSelectedEmployee2(
                                                                                    employee
                                                                                );
                                                                                setIsOpen2(
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
                                        {/* Email address  */}
                                        <div className="flex mt-[20px]">
                                            <div className="ml-[5px]">
                                                <h4>Selection terms *</h4>
                                            </div>
                                            <div>
                                                <textarea
                                                    name=""
                                                    className="w-[700px] ml-[71px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    placeholder="Selection terms"
                                                    value={terms}
                                                    onChange={(e) =>
                                                        setTerms(e.target.value)
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
                                                onClick={() =>
                                                    setEditMode(false)
                                                }
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
        </div>
    );
};

export default CandidateSelectionOne;
