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
const InterviewOne = () => {
    const [addInterView, setInterview] = useState(false);
    // number : 1 Candidate name
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("Candidate name");
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/CandidateShortlist")
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
    // number : 1 Candidate name
    // number : 2 job postion
    const dropdownRef2 = useRef(null);
    const [isOpen2, setIsOpen2] = useState(false);
    const [selectedEmployee2, setSelectedEmployee2] = useState("Job position");
    const [search2, setSearch2] = useState("");
    const [employees2, setEmployees2] = useState([]);
    // ডাটা পাঠান হচ্ছে এবং এর সাথে স্টেট নিবাচন করা হচ্ছে
    const [interviewDate, setInterviewDate] = useState("");
    const [vivaMarks, setVivaMarks] = useState("");
    const [mcqMarks, setMcqMarks] = useState("");
    const [writtenMarks, setWrittenMarks] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [jobPosition, setJobPosition] = useState("");
    const [interviewer, setInterviewer] = useState("");
    const [details, setDetails] = useState("");
    //
    useEffect(() => {
        const total =
            Number(vivaMarks) + Number(mcqMarks) + Number(writtenMarks);
        setTotalMarks(total);
    }, [vivaMarks, mcqMarks, writtenMarks]);
    // post
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            candidate_name: selectedEmployee,
            interview_date: interviewDate,
            viva_marks: vivaMarks,
            mcq_marks: mcqMarks,
            written_marks: writtenMarks,
            total_marks: totalMarks,
            recommendation,
            job_position: selectedEmployee2,
            interviewer,
            details,
        };

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/interviews",
                payload
            );
            // ফর্ম ভ্যালু ক্লিয়ার করা
            setSelectedEmployee("");
            setInterviewDate("");
            setVivaMarks("");
            setMcqMarks("");
            setWrittenMarks("");
            setTotalMarks("");
            setRecommendation("");
            setSelectedEmployee2("");
            setInterviewer("");
            setDetails("");
            // ফর্ম বন্ধ করা
            setInterview(false); // ফর্ম বন্ধ হবে
            fetchInterviews(); // টেবিল রিফ্রেশের জন্য
        } catch (error) {
            console.error("Error submitting:", error);
        }
    };
    const [interviews, setInterviews] = useState([]);

    const fetchInterviews = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/interviews"
            );
            setInterviews(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchInterviews();
    }, []);
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this interview?"))
            return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/interviews/${id}`);
            alert("Interview deleted successfully");
            fetchInterviews(); // টেবিল রিফ্রেশ
        } catch (error) {
            console.error("Error deleting interview:", error);
            alert("Failed to delete interview.");
        }
    };

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/CandidateShortlistJov")
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
    // number : 2 job postion
    const [searchTerm, setSearchTerm] = useState("");
    const filteredInterviews = interviews.filter((item) =>
        item.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [itemsToShow, setItemsToShow] = useState(10);
    const handleItemsToShowChange = (e) => {
        setItemsToShow(Number(e.target.value));
    };

    // drop down menu bar status

    return (
        <div>
            <div className="relative">
                <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                    <div class="flex items-center justify-between w-[auto] ">
                        <div>
                            <h6 class="text-lg font-semibold mb-0">
                                Interview
                            </h6>
                        </div>
                        <div className="">
                            <button
                                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                                onClick={() => setInterview(true)}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <div className="ml-[5px]">Interview</div>
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
                                        value={itemsToShow}
                                        onChange={handleItemsToShowChange}
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
                                            Name
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Candidate id
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Job position
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Interview date
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Viva marks
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Written total marks
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Mcq total marks
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Total marks
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Selection
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInterviews.length > 0 ? (
                                        filteredInterviews
                                            .slice(0, itemsToShow)
                                            .map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {item.candidate_name}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        CAND-{item.id}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {item.job_position}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {item.interview_date}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {item.viva_marks}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {item.written_marks}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {item.mcq_marks}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {item.total_marks}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {item.recommendation}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        <button
                                                            className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm my-1"
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
                                                colSpan="11"
                                                className="text-center text-red-500 py-3 text-sm"
                                            >
                                                No data found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {addInterView && (
                <div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                            <form action="" onSubmit={handleSubmit}>
                                <div>
                                    <div className="mt-2">
                                        <h5 className="text-lg font-semibold text-gray-800">
                                            Interview form
                                        </h5>
                                        <div className="border-b border-gray-200 my-3"></div>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-[20px]">
                                        {/* First Name */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <div>
                                                <h5 className="text-lg font-semibold text-gray-800">
                                                    Candidate name *
                                                </h5>
                                            </div>
                                            <div
                                                className=" w-[27rem] relative"
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
                                        {/* Interview date */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Interview date *
                                            </label>
                                            <input
                                                type="date"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                value={interviewDate}
                                                onChange={(e) =>
                                                    setInterviewDate(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* Viva marks */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Viva marks *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Interview marks"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                value={vivaMarks}
                                                onChange={(e) =>
                                                    setVivaMarks(e.target.value)
                                                }
                                            />
                                        </div>
                                        {/* MCQ marks */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Mcq total marks *
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="MCQ total marks"
                                                value={mcqMarks}
                                                onChange={(e) =>
                                                    setMcqMarks(e.target.value)
                                                }
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                            />
                                        </div>
                                        {/* Alternative Phone */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Recommandation
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Recommandation"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                value={recommendation}
                                                onChange={(e) =>
                                                    setRecommendation(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        {/*  Job position */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Job position *
                                            </label>
                                            <div
                                                className=" w-[27rem] w-64 relative"
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
                                        {/* Interviewer */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Interviewer *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Interviewer "
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                value={interviewer}
                                                onChange={(e) =>
                                                    setInterviewer(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        {/* Written total marks */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Written total marks *
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Written total marks"
                                                value={writtenMarks}
                                                onChange={(e) =>
                                                    setWrittenMarks(
                                                        e.target.value
                                                    )
                                                }
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                            />
                                        </div>
                                        {/* Country */}
                                        {/* City */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Total marks *
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Total marks"
                                                value={totalMarks}
                                                readOnly
                                                className="border bg-gray-100 rounded px-3 py-2 focus:outline-none"
                                            />
                                        </div>
                                        {/* Zip Code */}
                                        {/* Picture Upload */}
                                    </div>
                                    <div className="flex flex-col w-full sm:w-[98%]">
                                        <label className="font-medium mb-1">
                                            Details
                                        </label>
                                        <textarea
                                            name=""
                                            className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                            id=""
                                            placeholder="Details"
                                            value={details}
                                            onChange={(e) =>
                                                setDetails(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end mt-4 mr-[17px]">
                                        <button className="w-[80px] mr-[4px] h-[40px] bg-green-500 rounded text-white">
                                            Save
                                        </button>
                                        <button
                                            className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2 "
                                            onClick={() => setInterview(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterviewOne;
