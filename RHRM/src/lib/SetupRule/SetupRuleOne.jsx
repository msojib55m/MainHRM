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
import { useEffect, useState } from "react";
const SetupRuleOne = () => {
    const [addSetupRule, setupRule] = useState(false);
    const [selectedType, setSelectedType] = useState("");

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };
    const [isPercent, setIsPercent] = useState("0"); // default value is "No"

    const handleRadioChange = (e) => {
        setIsPercent(e.target.value);
    };
    const [effectOn, setEffectOn] = useState("on_basic"); // default checked
    const handleEffectChange = (e) => {
        setEffectOn(e.target.value);
    };
    const [isActive, setIsActive] = useState("1"); // Default: Active

    const handleIsActiveChange = (e) => {
        setIsActive(e.target.value);
    };
    // Time
    const [startTime, setStartTime] = useState("");

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };
    // End
    const [endTime, setEndTime] = useState("");

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };
    // ডাটা পাঠানো  হচ্ছে
    const [ruleName, setRuleName] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedType) {
            alert("Please select a type.");
            return;
        }

        if (!ruleName.trim()) {
            alert("Name is required.");
            return;
        }

        if (selectedType !== "time") {
            if (amount === "" || isNaN(amount)) {
                alert("Valid amount is required for this type.");
                return;
            }
        } else {
            if (!startTime) {
                alert("Start time is required.");
                return;
            }
            if (!endTime) {
                alert("End time is required.");
                return;
            }
        }

        // টাইপ অনুযায়ী payload বানানো হচ্ছে
        const payload = {
            type: selectedType,
            name: ruleName,
            amount: parseFloat(amount), // ✅ সব টাইপে যাবে
            ...(selectedType !== "time" && {
                is_percent: isPercent,
                effect_on: effectOn,
            }),
            ...(selectedType === "time" && {
                start_time: startTime,
                end_time: endTime,
            }),
            is_active: isActive,
        };

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/setup-rules",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Saved:", response.data);
            resetForm();
            fetchRules(); // ডেটা রিফ্রেশ
            setupRule(false); // মডাল বন্ধ
            // ফর্ম রিসেট চাইলে এখানে করুন
        } catch (error) {
            if (error.response) {
                console.error("Response error:", error.response.data);
                alert(
                    "Server Error: " +
                        (error.response.data.message || "Something went wrong.")
                );
            } else if (error.request) {
                console.error("No response received:", error.request);
                alert("No response from server. Please check your connection.");
            } else {
                console.error("Error", error.message);
                alert("Error: " + error.message);
            }
        }
    };

    const [rules, setRules] = useState([]);
    const fetchRules = async () => {
        const res = await fetch("http://127.0.0.1:8000/api/setup-rules");
        const data = await res.json();
        setRules(data);
    };

    useEffect(() => {
        fetchRules();
    }, []);
    const resetForm = () => {
        setRuleName("");
        setAmount("");
        setIsPercent("0");
        setEffectOn("on_basic");
        setIsActive("1");
        setStartTime("");
        setEndTime("");
        setSelectedType(""); // সবার শেষে
    };
    const [addEdit, setEdit] = useState(false);
    const [ruleId, setRuleId] = useState(null);

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            type: selectedType,
            name: ruleName,
            amount: amount,
            is_percent: isPercent,
            effect_on: effectOn,
            is_active: isActive,
            start_time: selectedType === "time" ? startTime : null,
            end_time: selectedType === "time" ? endTime : null,
        };

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/setupRuleUpdate/${ruleId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update rule");
            }

            const data = await response.json();

            // Update the table or list
            fetchRules();

            // Optional: reset or close edit mode
            setEdit(false);
        } catch (error) {
            console.error("Error updating rule:", error);
        }
    };
    const [searchTerm, setSearchTerm] = useState("");
    const filteredRules = rules.filter(
        (rule) =>
            (rule.name || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (rule.type || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (rule.amount !== null && rule.amount !== undefined
                ? rule.amount.toString().includes(searchTerm)
                : false) ||
            (rule.start_time || "").includes(searchTerm) ||
            (rule.end_time || "").includes(searchTerm)
    );
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    return (
        <div>
            <div className="relative">
                {/* header */}
                <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                    <div class="flex items-center justify-between w-[auto] ">
                        <div>
                            <h6 class="text-lg font-semibold mb-0">
                                Setup rules
                            </h6>
                        </div>
                        <div className="">
                            <button
                                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                                onClick={() => {
                                    resetForm(); // ফর্ম রিসেট করুন
                                    setupRule(true); // ফর্ম ওপেন করুন
                                }}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <div className="ml-[5px]">Add setup rule</div>
                            </button>
                        </div>
                    </div>
                    <div class="mt-[20px]">
                        <hr />
                        <div class="flex justify-between items-center ">
                            {/* select data page */}
                            <div className="mt-[20px]  ">
                                <label className="text-sm font-medium text-[20px]">
                                    Show
                                    <select
                                        className="p-2  border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none h-[40px] ml-[10px] mr-[10px]"
                                        value={entriesPerPage}
                                        onChange={(e) =>
                                            setEntriesPerPage(
                                                parseInt(e.target.value)
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
                                            Name
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Type
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Amount
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Start time
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            End time
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            On gross
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            On basic
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
                                    {filteredRules.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="10"
                                                className="text-center text-red-500 py-4"
                                            >
                                                No rules found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredRules
                                            .slice(0, entriesPerPage)
                                            .map((rule, index) => (
                                                <tr key={rule.id}>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {rule.name}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {rule.type}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {rule.is_percent
                                                            ? `${rule.amount}%`
                                                            : rule.amount}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {rule.start_time || "-"}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {rule.end_time || "-"}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {rule.effect_on ===
                                                        "on_gross"
                                                            ? "Yes"
                                                            : "No"}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {rule.effect_on ===
                                                        "on_basic"
                                                            ? "Yes"
                                                            : "No"}
                                                    </td>
                                                    <td className="border px-2 py-1 text-sm">
                                                        {rule.is_active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </td>
                                                    <td className="border px-2 py-1">
                                                        <button
                                                            className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                            onClick={() => {
                                                                setRuleId(
                                                                    rule.id
                                                                );
                                                                setSelectedType(
                                                                    rule.type
                                                                );
                                                                setRuleName(
                                                                    rule.name
                                                                );
                                                                setAmount(
                                                                    rule.amount
                                                                );
                                                                setStartTime(
                                                                    rule.start_time ||
                                                                        ""
                                                                );
                                                                setEndTime(
                                                                    rule.end_time ||
                                                                        ""
                                                                );
                                                                setIsPercent(
                                                                    rule.is_percent?.toString()
                                                                );
                                                                setEffectOn(
                                                                    rule.effect_on
                                                                );
                                                                setIsActive(
                                                                    rule.is_active?.toString()
                                                                );
                                                                setEdit(true);
                                                            }}
                                                        >
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
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* 3rd  Ends */}
                    </div>
                </div>

                {/* Header */}
            </div>
            {addSetupRule && (
                <div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                            <form onSubmit={handleSubmit}>
                                <div className="mt-2">
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        New rule
                                    </h5>
                                    <div className="border-b border-gray-200 my-3"></div>
                                </div>
                                {/* one */}
                                <div className="flex mt-5 justify-between mt-[20px] w-full]">
                                    <div className="">
                                        <label
                                            htmlFor="rule_type"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Type
                                        </label>
                                    </div>
                                    <select
                                        name="type"
                                        id="rule_type"
                                        required
                                        value={selectedType}
                                        onChange={handleTypeChange}
                                        className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px]"
                                    >
                                        <option value="">Select type</option>
                                        <option value="time">Time</option>
                                        <option value="basic">Basic</option>
                                        <option value="allowance">
                                            Allowance
                                        </option>
                                        <option value="deduction">
                                            Deduction
                                        </option>
                                        <option value="tax">Tax</option>
                                    </select>
                                </div>
                                {/* one */}
                                {/* two */}
                                <div className="flex mt-5 justify-between mt-[20px] w-full">
                                    <div>
                                        <label className="font-medium ">
                                            Name*
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={ruleName}
                                        onChange={(e) =>
                                            setRuleName(e.target.value)
                                        }
                                        className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px] "
                                    />
                                </div>
                                <div className="flex mt-5 justify-between mt-[20px] w-full">
                                    <div>
                                        <label className="font-medium ">
                                            Amount*
                                        </label>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder=""
                                        name="amount"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px] "
                                    />
                                </div>
                                {/* two */}

                                {/* Eight */}
                                {selectedType === "time" && (
                                    <>
                                        <div className="flex mt-5 justify-between mt-[20px] w-full">
                                            <label
                                                htmlFor="start_time"
                                                className="block text-sm font-medium mb-2"
                                            >
                                                Start time
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="time"
                                                id="start_time"
                                                name="start_time"
                                                value={startTime}
                                                onChange={handleStartTimeChange}
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px]"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="flex mt-5 justify-between mt-[20px] w-full">
                                            <label
                                                htmlFor="end_time"
                                                className="block text-sm font-medium mb-2"
                                            >
                                                End time{" "}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="time"
                                                id="end_time"
                                                name="end_time"
                                                value={endTime}
                                                onChange={handleEndTimeChange}
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px]"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </>
                                )}
                                {/* Eight */}
                                {/* Three */}
                                {selectedType !== "time" && (
                                    <div>
                                        <div className="flex mt-5 justify-between mt-[20px] w-full">
                                            <label className="block text-sm font-semibold mb-2">
                                                Is percent
                                            </label>
                                            <div className="">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="is_percent"
                                                        value="1"
                                                        checked={
                                                            isPercent === "1"
                                                        }
                                                        onChange={
                                                            handleRadioChange
                                                        }
                                                        className="form-radio text-green-600"
                                                    />
                                                    <span className="ml-2 ml-[10px]">
                                                        Yes
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="is_percent"
                                                        value="0"
                                                        checked={
                                                            isPercent === "0"
                                                        }
                                                        onChange={
                                                            handleRadioChange
                                                        }
                                                        className="form-radio text-red-600 ml-[10px]"
                                                    />
                                                    <span className="ml-2 ml-[10px]">
                                                        No
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex mt-5 justify-between mt-[20px] w-full">
                                            <label className="block text-sm font-semibold mb-2">
                                                Effect on
                                            </label>
                                            <div className="flex space-x-6">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="effect_on"
                                                        value="on_basic"
                                                        checked={
                                                            effectOn ===
                                                            "on_basic"
                                                        }
                                                        onChange={
                                                            handleEffectChange
                                                        }
                                                        className="form-radio text-blue-600"
                                                    />
                                                    <span className="ml-2">
                                                        On basic
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="effect_on"
                                                        value="on_gross"
                                                        checked={
                                                            effectOn ===
                                                            "on_gross"
                                                        }
                                                        onChange={
                                                            handleEffectChange
                                                        }
                                                        className="form-radio text-blue-600"
                                                    />
                                                    <span className="ml-2">
                                                        On gross
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex mt-5 justify-between mt-[20px] w-full">
                                    <label
                                        className="block text-sm font-semibold mb-2"
                                        htmlFor="is_active"
                                    >
                                        Is active
                                    </label>
                                    <div className="flex space-x-6">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="is_active"
                                                id="active"
                                                value="1"
                                                checked={isActive === "1"}
                                                onChange={handleIsActiveChange}
                                                className="form-radio text-green-600"
                                            />
                                            <span className="ml-2">Active</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="is_active"
                                                id="inactive"
                                                value="0"
                                                checked={isActive === "0"}
                                                onChange={handleIsActiveChange}
                                                className="form-radio text-red-600"
                                            />
                                            <span className="ml-2">
                                                Inactive
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                {/* five */}
                                {/* six */}
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
                                            onClick={() => setupRule(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                                {/* six */}
                            </form>
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
                                <div className="mt-2">
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        New rule
                                    </h5>
                                    <div className="border-b border-gray-200 my-3"></div>
                                </div>
                                {/* one */}
                                <div className="flex mt-5 justify-between mt-[20px] w-full]">
                                    <div className="">
                                        <label
                                            htmlFor="rule_type"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Type
                                        </label>
                                    </div>
                                    <select
                                        name="type"
                                        id="rule_type"
                                        required
                                        value={selectedType}
                                        onChange={handleTypeChange}
                                        className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px]"
                                    >
                                        <option value="">Select type</option>
                                        <option value="time">Time</option>
                                        <option value="basic">Basic</option>
                                        <option value="allowance">
                                            Allowance
                                        </option>
                                        <option value="deduction">
                                            Deduction
                                        </option>
                                        <option value="tax">Tax</option>
                                    </select>
                                </div>
                                {/* one */}
                                {/* two */}
                                <div className="flex mt-5 justify-between mt-[20px] w-full">
                                    <div>
                                        <label className="font-medium ">
                                            Name*
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={ruleName}
                                        onChange={(e) =>
                                            setRuleName(e.target.value)
                                        }
                                        className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px] "
                                    />
                                </div>
                                <div className="flex mt-5 justify-between mt-[20px] w-full">
                                    <div>
                                        <label className="font-medium ">
                                            Amount*
                                        </label>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder=""
                                        name="amount"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px] "
                                    />
                                </div>
                                {/* two */}

                                {/* Eight */}
                                {selectedType === "time" && (
                                    <>
                                        <div className="flex mt-5 justify-between mt-[20px] w-full">
                                            <label
                                                htmlFor="start_time"
                                                className="block text-sm font-medium mb-2"
                                            >
                                                Start time
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="time"
                                                id="start_time"
                                                name="start_time"
                                                value={startTime}
                                                onChange={handleStartTimeChange}
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px]"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="flex mt-5 justify-between mt-[20px] w-full">
                                            <label
                                                htmlFor="end_time"
                                                className="block text-sm font-medium mb-2"
                                            >
                                                End time{" "}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="time"
                                                id="end_time"
                                                name="end_time"
                                                value={endTime}
                                                onChange={handleEndTimeChange}
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  w-[705px]"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </>
                                )}
                                {/* Eight */}
                                {/* Three */}
                                {selectedType !== "time" && (
                                    <div>
                                        <div className="flex mt-5 justify-between mt-[20px] w-full">
                                            <label className="block text-sm font-semibold mb-2">
                                                Is percent
                                            </label>
                                            <div className="">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="is_percent"
                                                        value="1"
                                                        checked={
                                                            isPercent === "1"
                                                        }
                                                        onChange={
                                                            handleRadioChange
                                                        }
                                                        className="form-radio text-green-600"
                                                    />
                                                    <span className="ml-2 ml-[10px]">
                                                        Yes
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="is_percent"
                                                        value="0"
                                                        checked={
                                                            isPercent === "0"
                                                        }
                                                        onChange={
                                                            handleRadioChange
                                                        }
                                                        className="form-radio text-red-600 ml-[10px]"
                                                    />
                                                    <span className="ml-2 ml-[10px]">
                                                        No
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex mt-5 justify-between mt-[20px] w-full">
                                            <label className="block text-sm font-semibold mb-2">
                                                Effect on
                                            </label>
                                            <div className="flex space-x-6">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="effect_on"
                                                        value="on_basic"
                                                        checked={
                                                            effectOn ===
                                                            "on_basic"
                                                        }
                                                        onChange={
                                                            handleEffectChange
                                                        }
                                                        className="form-radio text-blue-600"
                                                    />
                                                    <span className="ml-2">
                                                        On basic
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="effect_on"
                                                        value="on_gross"
                                                        checked={
                                                            effectOn ===
                                                            "on_gross"
                                                        }
                                                        onChange={
                                                            handleEffectChange
                                                        }
                                                        className="form-radio text-blue-600"
                                                    />
                                                    <span className="ml-2">
                                                        On gross
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex mt-5 justify-between mt-[20px] w-full">
                                    <label
                                        className="block text-sm font-semibold mb-2"
                                        htmlFor="is_active"
                                    >
                                        Is active
                                    </label>
                                    <div className="flex space-x-6">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="is_active"
                                                id="active"
                                                value="1"
                                                checked={isActive === "1"}
                                                onChange={handleIsActiveChange}
                                                className="form-radio text-green-600"
                                            />
                                            <span className="ml-2">Active</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="is_active"
                                                id="inactive"
                                                value="0"
                                                checked={isActive === "0"}
                                                onChange={handleIsActiveChange}
                                                className="form-radio text-red-600"
                                            />
                                            <span className="ml-2">
                                                Inactive
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                {/* five */}
                                {/* six */}
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
                                            onClick={() => setEdit(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                                {/* six */}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SetupRuleOne;
