import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
const MainEmployeePosition = () => {
    const [positions, setPositions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [newPosition, setNewPosition] = useState({
        position_name: "",
        position_details: "",
        status: "active",
    });
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/positions")
            .then((response) => response.json())
            .then((data) => setPositions(data))
            .catch((error) =>
                console.error("Error fetching positions:", error)
            );
    }, []);

    // filter data search now
    const filteredPositions = positions.filter((position) =>
        position.position_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // ইনপুট পরিবর্তন হ্যান্ডেল করা
    const handleChange = (e) => {
        setNewPosition({ ...newPosition, [e.target.name]: e.target.value });
    };

    // ফর্ম সাবমিট হ্যান্ডলিং
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/positions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newPosition),
                }
            );

            if (response.ok) {
                const savedPosition = await response.json();
                setPositions([...positions, savedPosition]); // নতুন ডাটা সরাসরি টেবিলে যোগ
                setIsOpen(false); // মডাল বন্ধ করা
                setNewPosition({
                    position_name: "",
                    position_details: "",
                    status: "active",
                }); // ফর্ম রিসেট
            } else {
                console.error("Failed to save position");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    // handle update now
    const [editData, setEditData] = useState(null);
    const [editDataOpen, setEditOpen] = useState(false);
    // editButton click show
    const handleEdit = (position) => {
        setEditData(position);
        setEditOpen(true);
    };
    // handle update and mysql change now
    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `http://127.0.0.1:8000/api/positions/${editData.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editData),
            }
        );
        if (response.ok) {
            // লোকালি ডাটা আপডেট করা (পেজ রিলোড ছাড়া)
            setPositions((prev) =>
                prev.map((item) => (item.id === editData.id ? editData : item))
            );
            setEditOpen(false);
        }
    };
    // delete now mysql and page now
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this position?"
        );
        if (confirmed) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/positions/${id}`,
                    {
                        method: "DELETE",
                    }
                );
                if (response.ok) {
                    // Remove the deleted position from the local state
                    setPositions((prevPositions) =>
                        prevPositions.filter((position) => position.id !== id)
                    );
                } else {
                    console.error("Failed to delete position");
                }
            } catch (error) {
                console.error("Error deleting position:", error);
            }
        }
    };
    //
    return (
        <div>
            <div className="bg-[white] relative h-[600px]">
                <div className="sticky mt-[40px] h-[auto]  p-2 z-10 flex items-start justify-between bg-[white] rounded-[12px]">
                    <div className="flex items-center justify-between w-full h-[auto] pr-[10px] pl-[10px] relative">
                        <div>
                            <h5>Position list</h5>
                        </div>
                        <div className="p-4">
                            <div
                                className="flex bg-green-600 h-[40px] items-center p-3 cursor-pointer"
                                onClick={() => setIsOpen(true)}
                            >
                                <FontAwesomeIcon
                                    className="text-white mr-2"
                                    icon={faCirclePlus}
                                />
                                <a href="#" className="text-white">
                                    add position
                                </a>
                            </div>

                            {/* Add Position Button */}

                            {/* Position Form (Shown only if isOpen is true) */}
                            {isOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center">
                                    {/* Background Overlay */}
                                    <div
                                        className="fixed inset-0 bg-black opacity-50"
                                        onClick={() => setIsOpen(false)}
                                    ></div>

                                    {/* Position Form */}
                                    <div className="w-[800px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                                        <h5 className="text-lg font-semibold">
                                            New Position
                                        </h5>
                                        <hr className="border-t-1 border-gray-300 mt-2" />

                                        {/* Input Fields */}
                                        <form onSubmit={handleSubmit}>
                                            <div className="mt-4">
                                                <div className="flex w-[700px] items-center justify-between">
                                                    <h4>Position name *</h4>
                                                    <input
                                                        type="text"
                                                        name="position_name"
                                                        value={
                                                            newPosition.position_name
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Position Name"
                                                        className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                        required
                                                    />
                                                </div>

                                                <div className="flex w-[700px] items-center justify-between mt-4">
                                                    <h4>Position details *</h4>
                                                    <input
                                                        type="text"
                                                        name="position_details"
                                                        value={
                                                            newPosition.position_details
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Position details"
                                                        className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                        required
                                                    />
                                                </div>

                                                {/* Radio Buttons */}
                                                <div className="flex w-[350px] items-center justify-between mt-4">
                                                    <h4>Is active *</h4>
                                                    <div>
                                                        <label className="mr-4">
                                                            <input
                                                                type="radio"
                                                                name="status"
                                                                value="active"
                                                                checked={
                                                                    newPosition.status ===
                                                                    "active"
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                            <span className="ml-1">
                                                                Active
                                                            </span>
                                                        </label>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="status"
                                                                value="inactive"
                                                                checked={
                                                                    newPosition.status ===
                                                                    "inactive"
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                            <span className="ml-1">
                                                                Inactive
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <hr className="border-t-1 border-gray-300 mt-4" />

                                                {/* Buttons */}
                                                <div className="w-[700px] flex items-center justify-end mt-4">
                                                    <button
                                                        type="submit"
                                                        className="px-4 h-[40px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                                                        onClick={() =>
                                                            setIsOpen(false)
                                                        }
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
                    </div>
                </div>
                <div className="mt-[10px]">
                    <hr />
                </div>
                <div className="mt-[20px]  mr-[30px] ml-[20px]">
                    <div className=" flex align-center justify-between">
                        {/* card one */}
                        <div className="flex items-center space-x-2">
                            <label className="text-gray-700 text-sm font-medium">
                                Show
                            </label>
                            <select
                                name="award-table_length"
                                className="block w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="-1">All</option>
                            </select>
                            <label className="text-gray-700 text-sm font-medium">
                                entries
                            </label>
                        </div>
                        {/* card one */}

                        {/* card Three */}
                        <div className="flex align-center justify-center mt-[15px]">
                            <div className="mt-[5px] mr-[3px]">
                                <label>Search :</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
                                    placeholder="Search awards..."
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {/* card three */}
                    </div>
                    <div className="container mx-auto p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
                                <thead className="text-left">
                                    <tr>
                                        <th className="px-6 py-3 border-b text-left text-gray-700">
                                            SL
                                        </th>
                                        <th className="px-6 py-3 border-b text-left text-gray-700">
                                            Position Name
                                        </th>
                                        <th className="px-6 py-3 border-b text-left text-gray-700">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 border-b text-left text-gray-700">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-left">
                                    {filteredPositions.length > 0 ? (
                                        filteredPositions.map(
                                            (position, index) => (
                                                <tr
                                                    key={position.id}
                                                    className="hover:bg-gray-200 bg-gray-100"
                                                >
                                                    <td className="px-6 py-4 border-b">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 border-b">
                                                        {position.position_name}
                                                    </td>
                                                    <td className="px-6 py-4 border-b">
                                                        <span
                                                            className={`px-3 py-1 text-white rounded-full text-sm ${
                                                                position.status ===
                                                                "active"
                                                                    ? "bg-green-500"
                                                                    : "bg-red-500"
                                                            }`}
                                                        >
                                                            {position.status
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                position.status.slice(
                                                                    1
                                                                )}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 border-b">
                                                        <button
                                                            className="px-3 py-1 text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-md text-sm transition duration-200"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    position
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                            />
                                                        </button>
                                                        <button
                                                            className="ml-[10px] px-3 py-1 text-red-600 bg-red-100 hover:bg-red-200 rounded-md text-sm transition duration-200"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    position.id
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                No positions found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {editDataOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                {/* Background Overlay */}
                                <div
                                    className="fixed inset-0 bg-black opacity-50"
                                    onClick={() => setEditOpen(false)}
                                ></div>

                                {/* Edit Form */}
                                <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                                    <h5 className="text-lg font-semibold">
                                        Edit Position
                                    </h5>
                                    <hr className="border-t-1 border-gray-300 mt-2" />

                                    {/* Form */}
                                    <form onSubmit={handleUpdate}>
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium">
                                                Position Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={editData.position_name}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        position_name:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium">
                                                Status *
                                            </label>
                                            <select
                                                value={editData.status}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        status: e.target.value,
                                                    })
                                                }
                                                className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                            >
                                                <option value="active">
                                                    Active
                                                </option>
                                                <option value="inactive">
                                                    Inactive
                                                </option>
                                            </select>
                                        </div>

                                        <hr className="border-t-1 border-gray-300 mt-4" />

                                        <div className="flex items-center justify-end mt-4">
                                            <button
                                                type="submit"
                                                className="px-4 h-[40px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setEditData(false)
                                                }
                                                className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* table  */}
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

export default MainEmployeePosition;
