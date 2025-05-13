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
import { useEffect, useRef, useState } from "react";
const AttendancePointsOne = () => {
    const [addPoints, setPoints] = useState(false);
    // Emplooy now
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("Employee name");
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);

    // EmploName start
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/AllEmployeName")
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
    // EmploName Ends
    // start one
    const [inTime, setInTime] = useState("");
    const [points, setPoint] = useState("");
    const [date, setDate] = useState("");
    const [attendanceList, setAttendanceList] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            employee: selectedEmployee,
            in_time: inTime,
            points,
            date,
        };
        console.log(payload);
        try {
            const res = await fetch(
                "http://127.0.0.1:8000/api/attendance-post",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (res.ok) {
                const newData = await res.json();
                setAttendanceList([...attendanceList, newData]); // নতুন row table-এ যুক্ত করবো
                // Reset form
                setSelectedEmployee("");
                setInTime("");
                setPoint("");
                setDate("");
                setPoints(false);
            }
        } catch (error) {
            console.error("Submit failed", error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://127.0.0.1:8000/api/attendance-get");
            const data = await res.json();
            setAttendanceList(data);
        };
        fetchData();
    }, []);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredAttendance = attendanceList.filter((item) =>
        item.employee.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    return (
        <div>
            <div className="relative">
                <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                    {/* one start */}
                    <div class="flex items-center justify-between w-[auto] ">
                        <div>
                            <h6 class="text-lg font-semibold mb-0">
                                Attendance points
                            </h6>
                        </div>
                        <div className="">
                            <button
                                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                                onClick={() => setPoints(true)}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <div className="ml-[5px]">
                                    Attendance points
                                </div>
                            </button>
                        </div>
                    </div>
                    {/* one Ends */}
                    {/* 2nd start  */}
                    <div class="mt-[20px]">
                        <hr />
                        <div class="flex justify-between items-center ">
                            {/* select data page */}
                            <div className="mt-[20px]  ">
                                <label className="text-sm font-medium text-[20px]">
                                    Show
                                    <select
                                        className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none h-[40px] ml-[10px] mr-[10px]"
                                        value={entriesPerPage}
                                        onChange={(e) =>
                                            setEntriesPerPage(
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
                        {/* 2nd  Ends */}
                        {/* 3rd now */}

                        <div className="mt-[20px] overflow-x-auto max-w-[12000px] mx-auto border rounded">
                            <table className="min-w-full table-auto border-collapse">
                                <thead className="text-left">
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            SL
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Employee
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            In time
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Points
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAttendance.length > 0 ? (
                                        filteredAttendance
                                            .slice(0, entriesPerPage) // এইখানে যতগুলো দেখাবেন নির্ধারণ করা হবে
                                            .map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="border border-gray-300 px-2 py-1 text-sm">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border border-gray-300 px-2 py-1 text-sm">
                                                        {item.employee}
                                                    </td>
                                                    <td className="border border-gray-300 px-2 py-1 text-sm">
                                                        {item.in_time}
                                                    </td>
                                                    <td className="border border-gray-300 px-2 py-1 text-sm">
                                                        {item.points}
                                                    </td>
                                                    <td className="border border-gray-300 px-2 py-1 text-sm">
                                                        {item.date}
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center text-gray-500 py-4 text-sm border border-gray-300"
                                            >
                                                No results found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* 3rd  Ends */}
                        {addPoints && (
                            <div>
                                <div className="fixed inset-0 z-50 flex items-center justify-center">
                                    <div className="fixed inset-0 bg-black opacity-50"></div>
                                    <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mt-2">
                                                <h5 className="text-lg font-semibold text-gray-800">
                                                    New Attendancepoints
                                                </h5>
                                                <div className="border-b border-gray-200 my-3"></div>
                                            </div>
                                            {/* Employee name */}
                                            <div className="flex mt-5 justify-between">
                                                <div>
                                                    <h4> Employee</h4>
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

                                            {/* Employee */}
                                            <div className="flex mt-5 justify-between mt-[20px] w-full">
                                                <div>
                                                    <label className="font-medium ">
                                                        In Time
                                                    </label>
                                                </div>
                                                <input
                                                    type="time"
                                                    placeholder="Reason"
                                                    value={inTime}
                                                    onChange={(e) =>
                                                        setInTime(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px] "
                                                />
                                            </div>

                                            {/* In Time */}
                                            <div className="flex mt-5 justify-between mt-[20px] w-full">
                                                <div>
                                                    <label className="font-medium ">
                                                        Points
                                                    </label>
                                                </div>
                                                <input
                                                    type="number"
                                                    placeholder="Reason"
                                                    value={points}
                                                    onChange={(e) =>
                                                        setPoint(e.target.value)
                                                    }
                                                    className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px] "
                                                />
                                            </div>

                                            {/* Points */}
                                            <div className="flex mt-5 justify-between mt-[20px] w-full">
                                                <div>
                                                    <label className="font-medium ">
                                                        Date
                                                    </label>
                                                </div>
                                                <input
                                                    type="date"
                                                    value={date}
                                                    onChange={(e) =>
                                                        setDate(e.target.value)
                                                    }
                                                    placeholder="Reason"
                                                    className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px] "
                                                />
                                            </div>
                                            {/* Date */}

                                            <div className="sticky">
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
                                                            setPoints(false)
                                                        }
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
                </div>
            </div>
        </div>
    );
};

export default AttendancePointsOne;
