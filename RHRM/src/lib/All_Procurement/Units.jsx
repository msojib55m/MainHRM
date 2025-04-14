import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// fontawesome Icon start
// custome Image
import {
    faEdit,
    faTrash,
    faPlusSquare,
    faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Units = () => {
    const [unitList, setUnitList] = useState([]);
    const [unitName, setUnitName] = useState("");
    const [loading, setLoading] = useState(false);
    const [openUnits, setUnits] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loadingTable, setLoadingTable] = useState(false);

    const fetchUnits = async () => {
        setLoadingTable(true);
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/units");

            // 👉 চেক করে দেখো, ডেটা আসছে কি না
            console.log("Units API Response:", response.data);

            // যদি data এর ভেতরে data থাকে
            setUnitList(response.data.data ?? []); // ✅ fallback হিসেবে খালি অ্যারে
        } catch (error) {
            console.error("Error fetching units:", error);
            setUnitList([]); // fallback fallback
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchUnits();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://127.0.0.1:8000/api/units", {
                unit_name: unitName,
            });
            fetchUnits();
            setUnitName("");
            setUnits(false);
        } catch (err) {
            console.error("Submit failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://127.0.0.1:8000/api/units/${editId}`, {
                unit_name: unitName,
            });
            fetchUnits();
            setEditId(null);
            setUnitName("");
            setUnits(false);
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (unit) => {
        setEditId(unit.id);
        setUnitName(unit.unit_name);
        setUnits(true);
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this unit?")) {
            return;
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/api/units/${id}`);
            fetchUnits(); // টেবিল রিফ্রেশ
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUnitList, setFilteredUnitList] = useState(unitList);
    useEffect(() => {
        const filtered = unitList.filter((unit) =>
            unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUnitList(filtered);
    }, [searchTerm, unitList]);
    const [entries, setEntries] = useState(10); // ডিফল্ট 10টি এন্ট্রি দেখানো হবে
    const displayedUnits = filteredUnitList.slice(0, entries); // পেজ ট্র্যাক করার জন্য
    return (
        <div>
            {/* header now */}
            <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                <div class="flex items-center justify-between w-[auto] ">
                    <div>
                        <h6 class="text-lg font-semibold mb-0">Unit list</h6>
                    </div>
                    <div className="">
                        <button
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                            onClick={() => {
                                setUnitName("");
                                setEditId(null);
                                setUnits(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <div className="ml-[5px]">Add unit</div>
                        </button>
                    </div>
                </div>
                {/* hearder now */}
                {/* show page */}
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
                                    value={entries}
                                    onChange={(e) =>
                                        setEntries(Number(e.target.value))
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
                        {/* search filed */}
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
                        {/* searchFiled */}
                    </div>
                </div>
                {/* show page */}
                {/* table now */}
                <div className="mt-[20px]">
                    <hr />
                </div>
                <div className="mt-[20px]">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="text-left">
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">
                                    SL
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Units
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingTable ? (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-6"
                                    >
                                        <div className="flex items-center justify-center space-x-3 text-gray-500 text-lg">
                                            <svg
                                                className="animate-spin h-6 w-6 text-green-500"
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
                                            <span className="animate-pulse">
                                                Loading data...
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : displayedUnits.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-4"
                                    >
                                        No units found.
                                    </td>
                                </tr>
                            ) : (
                                displayedUnits.map((unit, index) => (
                                    <tr
                                        key={unit.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="border px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {unit.unit_name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                onClick={() => handleEdit(unit)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />
                                            </button>
                                            <button
                                                className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1"
                                                onClick={() =>
                                                    handleDelete(unit.id)
                                                }
                                            >
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
            </div>
            {openUnits && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="w-[700px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                        <h5 className="text-lg font-semibold">Add new unit</h5>
                        <hr className="border-t-1 border-gray-300 mt-2" />
                        <form onSubmit={editId ? handleUpdate : handleSubmit}>
                            <div className="flex justify-between items-center mt-[20px]">
                                <div>
                                    <h4>
                                        {" "}
                                        {editId ? "Update Unit" : "Add Unit"}
                                    </h4>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="unit"
                                        className="w-[600px] h-[50px] px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                        value={unitName}
                                        onChange={(e) =>
                                            setUnitName(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-[670px] flex items-center justify-end mt-[20px]">
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
                                    ) : loading ? (
                                        "Saving..."
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                                    onClick={() => setUnits(false)}
                                    disabled={loading} // ক্লোজ বাটনও ডিসেবল হবে যখন লোডিং চলবে
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Units;
