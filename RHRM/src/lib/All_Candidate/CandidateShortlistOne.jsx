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
const CandidateShortlistOne = () => {
    const [candidate, setCandidate] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedEmployee, setSelectedEmployee] =
        useState("Select candidate");
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [employees, setEmployees] = useState([]);

    // Close Dropdown if Click Outside
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

    // Fetch Employees
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/candidateShort")
            .then((res) => res.json())
            .then((data) => {
                const employeeList = Array.isArray(data)
                    ? data
                    : Object.values(data);
                setEmployees(employeeList);

                // যদি চাই প্রথম জনকে অটো-সিলেক্ট করতে
                if (employeeList.length > 0) {
                    setSelectedEmployee(employeeList[0]);
                }
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });
    }, []);

    const filteredEmployees = employees.filter(
        (employee) =>
            typeof employee === "string" &&
            employee.toLowerCase().includes(search.toLowerCase())
    );
    // number one
    // new Form data send
    const [candidatesList, setCandidatesList] = useState([]);
    const [formData, setFormData] = useState({
        job_position: "",
        shortlist_date: "",
        interview_date: "",
    });
    // load form
    useEffect(() => {
        loadCandidates();
    }, []);
    const loadCandidates = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/CandidateShortListGet"
            );

            setCandidatesList(response.data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: selectedEmployee,
            job_position: formData.job_position,
            shortlist_date: formData.shortlist_date,
            interview_date: formData.interview_date,
        };

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/CandidateShortListPost",
                data
            );
            loadCandidates();
            setCandidate(false);
            setFormData({
                job_position: "",
                shortlist_date: "",
                interview_date: "",
            });
            setSelectedEmployee("Select candidate");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div>
            <div className="relative">
                <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                    {/* number one */}
                    <div class="flex items-center justify-between w-[auto] ">
                        <div>
                            <h6 class="text-lg font-semibold mb-0">
                                Candidate shortlist
                            </h6>
                        </div>
                        <div className="">
                            <button
                                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                                onClick={() => setCandidate(true)}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <div className="ml-[5px]">Add shortlist</div>
                            </button>
                        </div>
                    </div>
                    {/* number: one */}
                    {/* number : two */}
                    <div class="mt-[20px]">
                        <hr />
                        <div class="flex justify-between items-center ">
                            {/* select data page */}
                            <div className="mt-[20px]  ">
                                <label className="text-sm font-medium text-[20px]">
                                    Show
                                    <select
                                        name="entries"
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
                                            Name
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Candidate id
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Job position
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Shortlist date
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Interview date
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidatesList.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="border px-2 py-1 text-sm">
                                                {index + 1}
                                            </td>
                                            <td className="border px-2 py-1 text-sm">
                                                {item.name}
                                            </td>
                                            <td className="border px-2 py-1 text-sm">
                                                {item.id}
                                            </td>
                                            <td className="border px-2 py-1 text-sm">
                                                {item.job_position}
                                            </td>
                                            <td className="border px-2 py-1 text-sm">
                                                {item.shortlist_date}
                                            </td>
                                            <td className="border px-2 py-1 text-sm">
                                                {item.interview_date}
                                            </td>
                                            <td className="border px-2 py-1 text-sm">
                                                Edit | Delete
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* number : two */}
                </div>
            </div>
            {candidate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                        <h5 className="text-lg font-semibold">
                            Shortlist form
                        </h5>

                        <form onSubmit={handleSubmit}>
                            <div className="sticky">
                                {/* name */}
                                <div className="flex mt-5 justify-between">
                                    <div>
                                        <h4> Job position *</h4>
                                    </div>
                                    <div
                                        className="relative w-[700px]"
                                        ref={dropdownRef}
                                    >
                                        {/* Select Box */}
                                        <div
                                            className="block w-full h-10 px-2 py-2 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer w-[500px]"
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
                                                    className="w-full h-10 px-2 py-2 text-gray-700 border-b border-gray-300"
                                                    value={search}
                                                    onChange={(e) =>
                                                        setSearch(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <ul className="w-full max-h-40 overflow-y-auto">
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
                                                                        setSearch(
                                                                            ""
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

                                {/* number */}
                                <div className="flex mt-[20px]">
                                    <div>
                                        <h4> Job position </h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[700px] ml-[106px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Cleaner"
                                            value={formData.job_position}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    job_position:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                {/* Email address  */}
                                <div className="flex mt-[20px]">
                                    <div className="ml-[5px]">
                                        <h4>Shortlist date *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            className="w-[700px] ml-[100px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Shortlist date  "
                                            value={formData.shortlist_date}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    shortlist_date:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                {/* Address * */}
                                <div className="flex mt-[20px] ">
                                    <div className="ml-[5px]">
                                        <h4>Interview date *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            className="w-[700px] ml-[85px]  h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Interview date"
                                            value={formData.interview_date}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    interview_date:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
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
                                        onClick={() => setCandidate(false)}
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

export default CandidateShortlistOne;
