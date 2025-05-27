import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faList,
    faPlusSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import EmployeeParformanceTwo from "./EmployeeParformanceTwo";
import axiosClient from "../axiosClient";

const EmployeeParformanceOne = () => {
    const [showAddNew, setShowAddNew] = useState(false);
    // List Employ now
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [reviewPeriod, setReviewPeriod] = useState("");
    const dropdownRef = useRef(null);

    const selectEmployee = (name) => {
        setSelectedEmployee(name);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // table danaymaic now work
    // danaymaic row number
    const categories = [
        "Demonstrated Knowledge of Duties & Quality of Work",
        "Timeliness of Delivery",
        "Impact of Achievement",
        "Overall Achievement of Goals/Objectives",
    ];
    //
    const radioValues = [0, 3, 6, 9, 12];
    const [scores, setScores] = useState(Array(categories.length).fill(0));
    const [bonus, setBonus] = useState(0);
    const handleRadioChange = (index, value) => {
        const newScores = [...scores];
        newScores[index] = value;
        setScores(newScores);
    };
    const totalScore = scores.reduce((acc, val) => acc + val, 0) + bonus;
    // table danaymaic now work
    // 2 table now scroe now
    const criteria = [
        {
            name: "Interpersonal skills & ability to work in a team environment",
            values: [2, 4, 6, 9, 10],
        },
        { name: "Attendance and Punctuality", values: [2, 4, 6, 9, 10] },
        { name: "Communication Skills", values: [2, 4, 6, 9, 10] },
        { name: "Contributing to company mission", values: [2, 4, 6, 9, 10] },
    ];

    const [scoress, setScoress] = useState(Array(criteria.length).fill(0));
    const [comments, setComments] = useState(Array(criteria.length).fill(""));

    const handleScoreChange = (index, value) => {
        const updatedScores = [...scoress];
        updatedScores[index] = value;
        setScoress(updatedScores);
    };

    const handleCommentChange = (index, text) => {
        const updatedComments = [...comments];
        updatedComments[index] = text;
        setComments(updatedComments);
    };
    const totalScores = scoress.reduce((acc, score) => acc + score, 0);
    // 2 table now scroe now
    // 2 table add and scroe
    // টোটাল স্কোর হিসাব
    const totalScoreTable1 = scores.reduce((sum, score) => sum + score, 0);
    const totalScoreTable2 = scoress.reduce((sum, score) => sum + score, 0);
    // const finalTotalScore = totalScoreTable1 + totalScoreTable2 + bonus;
    // 2 table add and scroe
    // const [selectedEmployee, setSelectedEmployee] = useState("");

    // Fetch employee list from API
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/employees")
            .then((res) => res.json())
            .then((data) => {
                setEmployees(data);
            })
            .catch((error) =>
                console.error("Error fetching employees:", error)
            );
    }, []);

    const [finalTotalScore, setFinalTotalScore] = useState(0);
    // Recalculate the final total score whenever the table scores or bonus change
    useEffect(() => {
        setFinalTotalScore(totalScoreTable1 + totalScoreTable2 + bonus);
    }, [totalScoreTable1, totalScoreTable2, bonus]);

    // Handle form submission

    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
    // spging add to submit

    const [loading, setLoading] = useState(false);
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     // যদি employee না থাকে বা নাম না থাকে, তাহলে সাবমিট ব্লক করুন
    //     if (!selectedEmployee || !selectedEmployee.name) {
    //         alert("Please select a valid employee.");
    //         setLoading(false);
    //         return;
    //     }

    //     const selectedData = {
    //         employee_id: parseInt(selectedEmployeeId),
    //         employee_name: selectedEmployee?.name || "",
    //         total_score: finalTotalScore,
    //     };

    //     console.log("Selected Data:", selectedData);

    //     try {
    //         const response = await axios.post(
    //             "http://127.0.0.1:8000/api/EmployeePerformanceOne",
    //             selectedData,
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         setShowAddNew(false); // modal hide
    //         alert("Employee Performance submitted successfully!");
    //     } catch (error) {
    //         if (error.response) {
    //             // Laravel validation বা অন্য সার্ভার error
    //             console.error(
    //                 "Server responded with error:",
    //                 error.response.data
    //             );
    //             const errorMsg =
    //                 error.response.data.message || "Validation error.";
    //             alert("Error: " + errorMsg);
    //         } else {
    //             console.error("Request failed:", error.message);
    //             alert("Request failed");
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const [search, setSearch] = useState("");
    const ref = useRef();

    // Filtered employees by search text (case insensitive)
    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase())
    );

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // When user types, open dropdown
    const handleInputChange = (e) => {
        setSearch(e.target.value);
        setIsOpen(true);
    };

    // When user selects an employee
    const handleSelect = (employee) => {
        setSearch(employee.name);
        setIsOpen(false);
        onSelect(employee); // pass selected employee object to parent
    };
    // নতুন করে কাজ করব
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     if (!selectedEmployeeId || isNaN(parseInt(selectedEmployeeId))) {
    //         alert("Please enter a valid Employee ID.");
    //         setLoading(false);
    //         return;
    //     }

    //     if (!selectedEmployee) {
    //         alert("Please enter employee name.");
    //         setLoading(false);
    //         return;
    //     }

    //     const selectedData = {
    //         employee_id: parseInt(selectedEmployeeId),
    //         employee_name: selectedEmployee,
    //         total_score: finalTotalScore, // এটা আপনি যেভাবে ক্যালকুলেট করছেন ধরে নিচ্ছি
    //     };

    //     console.log("Selected Data:", selectedData);

    //     try {
    //         const response = await axios.post(
    //             "http://127.0.0.1:8000/api/EmployeePerformanceOne",
    //             selectedData,
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         setShowAddNew(false);
    //         alert("Employee Performance submitted successfully!");
    //     } catch (error) {
    //         if (error.response) {
    //             console.error("Server error:", error.response.data);
    //             const errorMsg =
    //                 error.response.data.message || "Validation error.";
    //             alert("Error: " + errorMsg);
    //         } else {
    //             console.error("Request failed:", error.message);
    //             alert("Request failed");
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!selectedEmployeeId || isNaN(parseInt(selectedEmployeeId))) {
            alert("Please enter a valid Employee ID.");
            setLoading(false);
            return;
        }

        if (!selectedEmployee) {
            alert("Please enter employee name.");
            setLoading(false);
            return;
        }

        const selectedData = {
            employee_id: parseInt(selectedEmployeeId),
            employee_name: selectedEmployee,
            total_score: finalTotalScore, // এটা আপনি যেভাবে ক্যালকুলেট করছেন ধরে নিচ্ছি
        };

        console.log("Selected Data:", selectedData);

        try {
            const response = await axiosClient.post(
                "/EmployeePerformanceOne",
                selectedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setShowAddNew(false);
            alert("Employee Performance submitted successfully!");
        } catch (error) {
            if (error.response) {
                console.error("Server error:", error.response.data);
                const errorMsg =
                    error.response.data.message || "Validation error.";
                alert("Error: " + errorMsg);
            } else {
                console.error("Request failed:", error.message);
                alert("Request failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="sticky mt-[20px] h-[auto] p-2 z-10 flex items-start justify-between bg-[white] rounded-[12px]">
                <div className="w-full">
                    {" "}
                    <div className="p-4">
                        {/* Conditional Rendering: Show either the list header or the add new action */}
                        {!showAddNew ? (
                            <div>
                                <div className="flex items-center justify-between w-full pr-[10px] pl-[10px] relative">
                                    <div>
                                        <h6 className="text-lg font-semibold mb-0">
                                            Employee Performance List
                                        </h6>
                                    </div>
                                    <div>
                                        {/* Add New Employee Button */}
                                        <div
                                            className="flex bg-green-600 h-[40px] items-center p-3 cursor-pointer rounded-md hover:bg-green-700"
                                            onClick={() => setShowAddNew(true)}
                                        >
                                            <FontAwesomeIcon
                                                className="text-white mr-2"
                                                icon={faCirclePlus}
                                            />
                                            <span className="text-white">
                                                Add new employee performance
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <EmployeeParformanceTwo />
                                </div>
                            </div>
                        ) : (
                            <form action="" onSubmit={handleSubmit}>
                                <div className="">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h6 className="text-lg font-semibold mb-0">
                                                Add New Action
                                            </h6>
                                        </div>
                                        <div>
                                            {/* Back to Employee Performance List Button */}

                                            <div
                                                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 flex items-center gap-2 cursor-pointer"
                                                onClick={() =>
                                                    setShowAddNew(false)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faList}
                                                />
                                                <span>
                                                    Employee Performance List
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <hr className="border border-gray-200 my-4" />
                                    </div>
                                    <div class="w-full text-center">
                                        <h3 class="text-2xl font-bold">
                                            2025 PERFORMANCE APPRAISAL INTERVIEW
                                            FORM
                                        </h3>
                                    </div>

                                    <div class="w-full text-center">
                                        <p class="text-lg mt-3 italic text-red-600">
                                            All fields are required except
                                            comments
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-8">
                                        <div className="flex items-center ml-4">
                                            <label className="block text-gray-700 font-medium mb-2">
                                                Employee ID:
                                            </label>
                                            <input
                                                type="number"
                                                className="border border-gray-300 focus:border-green-500 focus:outline-none p-2 rounded-md w-[300px] ml-4"
                                                placeholder="Enter Employee ID"
                                                value={selectedEmployeeId}
                                                onChange={(e) =>
                                                    setSelectedEmployeeId(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center ml-4">
                                            <label className="block text-gray-700 font-medium mb-2">
                                                Name of Employee:
                                            </label>
                                            <input
                                                type="text"
                                                className="border border-gray-300 focus:border-green-500 focus:outline-none p-2 rounded-md w-[300px] ml-4"
                                                placeholder="Enter Employee Name"
                                                value={selectedEmployee}
                                                onChange={(e) =>
                                                    setSelectedEmployee(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center ml-4">
                                            <label className="font-medium text-gray-700">
                                                Review Period:
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Review Period in Months"
                                                className="border border-gray-300 focus:border-green-500 focus:outline-none p-2 rounded-md w-[300px] ml-4"
                                                value={reviewPeriod}
                                                onChange={(e) =>
                                                    setReviewPeriod(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div class="flex mt-[30px] items-center ">
                                        <div>
                                            <label>
                                                Name and position of supervisor
                                                head of department :
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Name and Position of supervisor/Head of Department"
                                                className="border border-gray-300 focus:border-green-500 focus:outline-none p-2 rounded-md w-[500px] ml-[20px]"
                                            />
                                        </div>
                                    </div>
                                    <div class="flex flex-col space-y-4">
                                        <div class="w-full">
                                            <p class="text-lg mt-3 italic">
                                                Please provide a critical
                                                assessment of the performance of
                                                the employee within the review
                                                period using the following
                                                rating scale. Provide examples
                                                where applicable. Please use a
                                                separate sheet if required.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="overflow-x-auto mt-[20px]">
                                        <table class="min-w-full table-auto border-collapse">
                                            <thead>
                                                <tr class="bg-gray-100 text-left">
                                                    <th class="px-4 py-2 border border-gray-200">
                                                        P
                                                    </th>

                                                    <th class="px-4 py-2 border border-gray-200">
                                                        NI
                                                    </th>
                                                    <th class="px-4 py-2 border border-gray-200">
                                                        G
                                                    </th>
                                                    <th class="px-4 py-2 border border-gray-200">
                                                        VG
                                                    </th>
                                                    <th class="px-4 py-2 border border-gray-200">
                                                        E
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="hover:bg-gray-50 text-left">
                                                    <td class="px-4 py-2 border border-gray-200">
                                                        Poor
                                                    </td>
                                                    <td class="px-4 py-2 border border-gray-200">
                                                        Need Improvement
                                                    </td>
                                                    <td class="px-4 py-2 border border-gray-200">
                                                        Good
                                                    </td>
                                                    <td class="px-4 py-2 border border-gray-200">
                                                        Very Good
                                                    </td>
                                                    <td class="px-4 py-2 border border-gray-200">
                                                        Excellent
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="">
                                        <h3 class="mt-3 text-xl font-semibold">
                                            A ASSESSMENT OF GOALS OBJECTIVES SET
                                            DURING THE REVIEW PERIOD
                                        </h3>
                                        <table class="min-w-full table-auto border-collapse">
                                            <div className="p-4">
                                                <table className="border-collapse w-full border border-gray-300">
                                                    <thead>
                                                        <tr className="bg-gray-100">
                                                            <th className="p-2 border">
                                                                Criteria
                                                            </th>
                                                            {radioValues.map(
                                                                (value) => (
                                                                    <th
                                                                        key={
                                                                            value
                                                                        }
                                                                        className="p-2 border"
                                                                    >
                                                                        {value}
                                                                    </th>
                                                                )
                                                            )}
                                                            <th className="p-2 border">
                                                                Score
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {categories.map(
                                                            (
                                                                category,
                                                                rowIndex
                                                            ) => (
                                                                <tr
                                                                    key={
                                                                        rowIndex
                                                                    }
                                                                    className="hover:bg-gray-50"
                                                                >
                                                                    <td className="p-2 border">
                                                                        {
                                                                            category
                                                                        }
                                                                    </td>
                                                                    {radioValues.map(
                                                                        (
                                                                            value,
                                                                            colIndex
                                                                        ) => (
                                                                            <td
                                                                                key={
                                                                                    colIndex
                                                                                }
                                                                                className="p-2 border text-center"
                                                                            >
                                                                                <input
                                                                                    type="radio"
                                                                                    name={`category-${rowIndex}`}
                                                                                    value={
                                                                                        value
                                                                                    }
                                                                                    onChange={() =>
                                                                                        handleRadioChange(
                                                                                            rowIndex,
                                                                                            value
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </td>
                                                                        )
                                                                    )}
                                                                    <td className="p-2 border text-center">
                                                                        {
                                                                            scores[
                                                                                rowIndex
                                                                            ]
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                        <tr className="hover:bg-gray-50">
                                                            <td className="p-2 border">
                                                                Going beyond the
                                                                call of Duty
                                                            </td>
                                                            <td
                                                                colSpan="5"
                                                                className="p-2 border text-center"
                                                            >
                                                                Extra (6, 9, or
                                                                12) bonus points
                                                            </td>
                                                            <td className="p-2 border text-center">
                                                                <input
                                                                    type="number"
                                                                    className="border p-1 w-full"
                                                                    value={
                                                                        bonus
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setBonus(
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ) ||
                                                                                0
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr className="bg-gray-100 font-bold">
                                                            <td className="p-2 border">
                                                                Total Score (Max
                                                                60)
                                                            </td>
                                                            <td
                                                                colSpan="5"
                                                                className="p-2 border"
                                                            ></td>
                                                            <td className="p-2 border text-center">
                                                                {totalScore}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </table>
                                    </div>
                                    <div class="mt-[20px]">
                                        <h3 class="mt-3 text-xl font-semibold ">
                                            B ASSESSMENT OF OTHER PERFORMANCE
                                            STANDARDS AND INDICATORS
                                        </h3>
                                        <table className="min-w-full table-auto border-collapse mt-5">
                                            <thead>
                                                <tr className="bg-gray-100 text-left">
                                                    <th className="px-4 py-2 border border-gray-200 w-[250px]">
                                                        Criteria
                                                    </th>
                                                    {[
                                                        "P (2)",
                                                        "NI (4)",
                                                        "G (6)",
                                                        "VG (9)",
                                                        "E (10)",
                                                    ].map((label, idx) => (
                                                        <th
                                                            key={idx}
                                                            className="px-2 py-2 border border-gray-200 w-[50px]"
                                                        >
                                                            {label}
                                                        </th>
                                                    ))}
                                                    <th className="px-4 py-2 border border-gray-200 w-[160px]">
                                                        Score
                                                    </th>
                                                    <th className="px-4 py-2 border border-gray-200 w-[200px]">
                                                        Comments
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {criteria.map(
                                                    (criterion, index) => (
                                                        <tr
                                                            key={index}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-4 py-2 border border-gray-200">
                                                                {criterion.name}
                                                            </td>
                                                            {criterion.values.map(
                                                                (value, i) => (
                                                                    <td
                                                                        key={i}
                                                                        className="px-2 py-2 border border-gray-200 text-center"
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            name={`criteria-${index}`}
                                                                            onChange={() =>
                                                                                handleScoreChange(
                                                                                    index,
                                                                                    value
                                                                                )
                                                                            }
                                                                        />
                                                                    </td>
                                                                )
                                                            )}
                                                            <td className="px-4 py-2 border border-gray-200">
                                                                <input
                                                                    type="number"
                                                                    value={
                                                                        scoress[
                                                                            index
                                                                        ]
                                                                    }
                                                                    readOnly
                                                                    className="p-2 rounded border border-gray-400 w-full bg-gray-100"
                                                                />
                                                            </td>
                                                            <td className="px-4 py-2 border border-gray-200">
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        comments[
                                                                            index
                                                                        ]
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleCommentChange(
                                                                            index,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="p-2 rounded border border-gray-400 w-full"
                                                                />
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                                <tr className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 border border-gray-200"></td>
                                                    <td
                                                        colSpan="5"
                                                        className="px-4 py-2 border border-gray-200"
                                                    >
                                                        Total score (max = 40)
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-200">
                                                        <input
                                                            type="number"
                                                            value={totalScores}
                                                            readOnly
                                                            className="p-2 rounded border border-gray-400 w-full bg-gray-300"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-200"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="mt-[20px]">
                                        <div>
                                            <h3 class="mt-3 text-xl font-semibold">
                                                C TOTAL SCORE
                                            </h3>
                                            <div class="overflow-x-auto mt-[20px]">
                                                <table class="min-w-full table-auto border-collapse">
                                                    <thead class="border border-gray-200">
                                                        <tr class="bg-gray-100 text-left">
                                                            <th class="px-4 py-2 border border-gray-200">
                                                                Total score
                                                                (score a + score
                                                                b)
                                                            </th>
                                                            <th class="px-4 py-2 border border-gray-200">
                                                                Overall comments
                                                                recommendations
                                                                by reviewer
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="border border-gray-200">
                                                        <tr class="">
                                                            <td>
                                                                {
                                                                    totalScoreTable1
                                                                }{" "}
                                                                +{" "}
                                                                {
                                                                    totalScoreTable2
                                                                }{" "}
                                                                + {bonus} =
                                                                {
                                                                    finalTotalScore
                                                                }
                                                            </td>

                                                            <td>Name:</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Classification
                                                                of employee:
                                                            </td>
                                                            <td>Signature:</td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                (80-100 X 75-85
                                                                0-70)E
                                                            </td>
                                                            <td>Date:</td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="1"></td>
                                                            <td>
                                                                Next review
                                                                period:
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-[20px]">
                                        <h3>DCOMMENTS BY EMPLOYEE</h3>
                                        <div>
                                            <div class="w-full">
                                                <label
                                                    for="text-area"
                                                    class="block text-lg font-medium text-gray-700 mb-2"
                                                ></label>
                                                <textarea
                                                    id="text-area"
                                                    name="text-area"
                                                    rows="3"
                                                    class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Maximum 500 words"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-[20px]">
                                        <h6>E DEVELOPMENT PLAN</h6>
                                        <div class="overflow-x-hidden mt-[20px]">
                                            <table class="min-w-full table-auto border-collapse">
                                                <thead class="border border border-gray-200">
                                                    <tr class="text-left">
                                                        <th class="px-4 py-2 border  border-gray-200   w-[80px]">
                                                            {" "}
                                                            Responsible
                                                            person(s) to assist
                                                            in the achievement
                                                            of the plan
                                                        </th>
                                                        <th class="px-4 py-2 border  border-gray-200   w-[80px] ">
                                                            <div class="mt-[60px]">
                                                                <h6>
                                                                    Expected
                                                                    outcome(s)
                                                                </h6>
                                                            </div>
                                                        </th>
                                                        <th class="px-4 py-2 border  border-gray-200   w-[20px]">
                                                            Responsible
                                                            person(s) to assist
                                                            in the achievement
                                                            of the plan
                                                        </th>
                                                        <th class="px-4 py-2 border  border-gray-200   w-[80px]">
                                                            <div class="mt-[80px]">
                                                                <h6>
                                                                    Start date
                                                                </h6>
                                                            </div>
                                                        </th>
                                                        <th class="px-4 py-2 border  w-[80px]  border-gray-200   ">
                                                            <div class="mt-[80px]">
                                                                <h6>
                                                                    End date
                                                                </h6>
                                                            </div>
                                                        </th>
                                                        <th class="px-4 py-2 border  border-gray-200   w-[30px] mt-[]">
                                                            <div class="mt-[80px]">
                                                                <h6>Action</h6>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody class="border border-gray-200">
                                                    <tr class="">
                                                        <td class="p-2 border border-gray-200">
                                                            <textarea
                                                                name="text-area"
                                                                rows="2"
                                                                class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            ></textarea>
                                                        </td>
                                                        <td class="p-2 border border-gray-200">
                                                            <textarea
                                                                name="text-area"
                                                                rows="2"
                                                                class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            ></textarea>
                                                        </td>
                                                        <td class="p-2 border border-gray-200">
                                                            <input
                                                                type="text"
                                                                class="w-[200px] border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 h-[40px]"
                                                            />
                                                        </td>
                                                        <td class="p-2 border border-gray-200">
                                                            <input
                                                                type="date"
                                                                class="p-2  w-[150px] border-gray-200 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                        </td>
                                                        <td class="p-2 border border-gray-200">
                                                            <input
                                                                type="date"
                                                                class="p-2  w-[150px] border-gray-200 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                        </td>

                                                        <td class="w-24 text-center">
                                                            <button
                                                                id="add_dev_plan"
                                                                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faPlusSquare
                                                                    }
                                                                />
                                                            </button>

                                                            <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm ml-2">
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTrash
                                                                    }
                                                                />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="mt[20px]">
                                            <div>
                                                <h6>
                                                    F KEY GOALS FOR NEXT REVIEW
                                                    PERIOD
                                                </h6>
                                            </div>
                                            <div class="overflow-x-hidden mt-[20px]">
                                                <table class="min-w-full table-auto border-collapse">
                                                    <thead class="border border border-gray-200">
                                                        <tr class="text-left">
                                                            <th class="px-4 py-2 border  border-gray-200 w-[400px]">
                                                                Goal (s) set and
                                                                agreed on with
                                                                employee
                                                            </th>
                                                            <th class="px-4 py-2 border  border-gray-200 w-[250px]">
                                                                Proposed
                                                                completion
                                                                period
                                                            </th>
                                                            <th class="px-4 py-2 border  border-gray-200 w-[100px]">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="border border-gray-200">
                                                        <tr>
                                                            <td class="p-2 border border-gray-200">
                                                                <textarea
                                                                    name="text-area"
                                                                    rows="1"
                                                                    class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                ></textarea>
                                                            </td>
                                                            <td class="p-2 border border-gray-200">
                                                                <input
                                                                    type="text"
                                                                    class="p-2  w-[200px] border-gray-200 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                />
                                                            </td>
                                                            <td class="w-24 text-center">
                                                                <button
                                                                    id="add_dev_plan"
                                                                    class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faPlusSquare
                                                                        }
                                                                    />
                                                                </button>

                                                                <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm ml-2">
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faTrash
                                                                        }
                                                                    />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="text-right mt-4">
                                            <div class="text-right mt-4">
                                                <button
                                                    type="submit"
                                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-32"
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
                                                        "save"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <div className="relative">
                <div>
                    <footer className="bg-[#fff] mt-[20px] h-[60px]  rounded-lg ">
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

export default EmployeeParformanceOne;
