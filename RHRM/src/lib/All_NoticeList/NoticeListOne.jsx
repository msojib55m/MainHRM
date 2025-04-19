import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const NoticeListOne = () => {
    const [notices, setNotices] = useState([]);
    const [AddNotice, setAddNotice] = useState(false);
    const [formData, setFormData] = useState({
        notice_type: "",
        notice_description: "",
        notice_date: "",
        notice_attachment: null,
        notice_by: "",
    });
    const handleChange = (e) => {
        if (e.target.type === "file") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    // data post now
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            notice_type: formData.notice_type,
            notice_description: formData.notice_description,
            notice_date: formData.notice_date,
            notice_by: formData.notice_by,
            notice_attachment: formData.notice_attachment, // If file exists
        };

        try {
            await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/notices",
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("✅ Notice submitted successfully!");
            setAddNotice(false);
        } catch (error) {
            console.error("Error submitting notice:", error);

            if (error.response) {
                alert(
                    `❌ Submission failed: ${
                        error.response.data.message || "Unknown error"
                    }`
                );
            } else {
                alert(
                    "❌ Network error! Please check your internet connection."
                );
            }
        }
    };
    // data get now
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/notices"
                );
                setNotices(response.data);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchNotices();
    }, []);
    //  সাচ করলে পাওয়া যাবে
    const [search, setSearch] = useState("");
    // Handle search input change
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    const filteredNotices = notices.filter((notice) => {
        return (
            notice.notice_type.toLowerCase().includes(search.toLowerCase()) ||
            notice.notice_description
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            notice.notice_by.toLowerCase().includes(search.toLowerCase())
        );
    });
    // পেজ handler
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const displayedNotices = filteredNotices.slice(0, recordsPerPage);
    // edit for now form
    const [editModal, setEditModal] = useState(false); // Edit Modal state
    const [editData, setEditData] = useState(null); // যেই ডাটা এডিট করা হবে

    const handleEditClick = (notice) => {
        setEditData(notice);
        setEditModal(true);
    };
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/notices/${editData.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editData),
                }
            );

            const result = await response.json();

            if (response.ok) {
                alert("Notice updated successfully!");

                // নতুন ডাটা লোড করুন
                setNotices((prevNotices) =>
                    prevNotices.map((notice) =>
                        notice.id === editData.id
                            ? { ...notice, ...editData }
                            : notice
                    )
                );

                setEditModal(false);
            } else {
                alert(result.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error updating notice:", error);
            alert("Failed to update notice");
        }
    };
    // delete now
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this notice?"))
            return;

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/notices/${id}`,
                {
                    method: "DELETE",
                }
            );

            const result = await response.json();

            if (response.ok) {
                alert("Notice deleted successfully!");

                // UI থেকে ডাটা মুছে ফেলা
                setNotices((prevNotices) =>
                    prevNotices.filter((notice) => notice.id !== id)
                );
            } else {
                alert(result.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error deleting notice:", error);
            alert("Failed to delete notice");
        }
    };

    return (
        <>
            <div className="relative">
                <div className="sticky mt-[70px] h-[80px] p-2 z-10  rounded-[12px]">
                    <div className=" p-4 bg-white rounded-lg h-auto w-[1400px] mt-5 shadow-md">
                        <div>
                            <div className="flex items-center justify-between ">
                                <div>
                                    <h6 className="text-lg font-semibold mb-0">
                                        Notice list
                                    </h6>
                                </div>
                                <div>
                                    <div className="">
                                        <button
                                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                                            onClick={() => setAddNotice(true)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCirclePlus}
                                            />
                                            <div className="ml-[5px]">
                                                Add notice
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                            value={recordsPerPage}
                                            onChange={(e) =>
                                                setRecordsPerPage(
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

                                <div class="mr-[10px] mt-[20px] w-[362px]">
                                    <div class="flex items-center justify-between w-[250px]">
                                        <div>
                                            <label class="text-sm font-medium text-[20px]">
                                                Search:
                                            </label>
                                        </div>
                                        <div className="">
                                            <input
                                                value={search}
                                                onChange={handleSearch}
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
                            <div class="mt-[20px]">
                                <table class="min-w-full table-auto border-collapse">
                                    <thead class="text-left">
                                        <tr class="bg-gray-100">
                                            <th class="border border-gray-300 px-4 py-2">
                                                SL
                                            </th>
                                            <th class="border border-gray-300 px-4 py-2">
                                                Notice Type
                                            </th>
                                            <th class="border border-gray-300 px-4 py-2">
                                                Description
                                            </th>

                                            <th class="border border-gray-300 px-4 py-2">
                                                Notice date
                                            </th>
                                            <th class="border border-gray-300 px-4 py-2">
                                                Notice by
                                            </th>

                                            <th class="border border-gray-300 px-4 py-2">
                                                action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-left">
                                        {displayedNotices.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                                                >
                                                    Search not found
                                                </td>
                                            </tr>
                                        ) : (
                                            displayedNotices.map(
                                                (notice, index) => (
                                                    <tr
                                                        key={notice.id}
                                                        className="border border-gray-300"
                                                    >
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {index + 1}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {notice.notice_type}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {
                                                                notice.notice_description
                                                            }
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {notice.notice_date}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {notice.notice_by}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2 text-left">
                                                            <button
                                                                className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                                onClick={() =>
                                                                    handleEditClick(
                                                                        notice
                                                                    )
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faEdit
                                                                    }
                                                                />
                                                            </button>
                                                            <button
                                                                className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        notice.id
                                                                    )
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTrash
                                                                    }
                                                                />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {AddNotice && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            {/* Background Overlay */}
                            <div className="fixed inset-0 bg-black opacity-50"></div>

                            {/* Position Form */}
                            <div className="w-[800px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                                <h5 className="text-lg font-semibold">
                                    New notice
                                </h5>
                                <hr className="border-t-1 border-gray-300 mt-2" />

                                {/* Input Fields */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mt-4">
                                        <div className="flex w-[700px] items-center justify-between">
                                            <h4>Notice type*</h4>
                                            <input
                                                type="text"
                                                placeholder="Position Name"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                value={formData.notice_type}
                                                onChange={handleChange}
                                                name="notice_type"
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-4">
                                            <h4>Notice descriptiion*</h4>
                                            <input
                                                type="text"
                                                placeholder="Notice descriptiion"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                name="notice_description"
                                                value={
                                                    formData.notice_description
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-4">
                                            <h4>Notice date*</h4>
                                            <input
                                                type="date"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                onFocus={(e) =>
                                                    e.target.showPicker()
                                                }
                                                name="notice_date"
                                                value={formData.notice_date}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-4">
                                            <h4>Notice attachment*</h4>

                                            <input
                                                type="file"
                                                className="block w-full max-w-[500px] h-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-6 
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-green-100 file:text-green-700
                                        hover:file:bg-green-200
                                        border border-gray-400 rounded-md px-2 py-1
                                        focus:border-green-500 focus:outline-none
                                        file:h-full"
                                                name="notice_attachment"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-4">
                                            <h4>Notice by*</h4>
                                            <input
                                                type="text"
                                                placeholder="Notice by"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                name="notice_by"
                                                value={formData.notice_by}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {/* Radio Buttons */}
                                        <div className="flex w-[350px] items-center justify-between mt-4"></div>

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
                                                    setAddNotice(false)
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
                    {editModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            {/* Background Overlay */}
                            <div className="fixed inset-0 bg-black opacity-50"></div>

                            {/* Position Form */}
                            <div className="w-[800px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                                <h5 className="text-lg font-semibold">
                                    Edit Notice
                                </h5>
                                <hr className="border-t-1 border-gray-300 mt-2" />

                                {/* Input Fields */}
                                <form onSubmit={handleUpdateSubmit}>
                                    <div className="mt-4">
                                        <div className="flex w-[700px] items-center justify-between">
                                            <h4>Notice type*</h4>
                                            <input
                                                type="text"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                name="notice_type"
                                                value={
                                                    editData?.notice_type || ""
                                                }
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        notice_type:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-4">
                                            <h4>Notice description*</h4>
                                            <input
                                                type="text"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                name="notice_description"
                                                value={
                                                    editData?.notice_description ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        notice_description:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-4">
                                            <h4>Notice date*</h4>
                                            <input
                                                type="date"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                name="notice_date"
                                                value={
                                                    editData?.notice_date || ""
                                                }
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        notice_date:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-4">
                                            <h4>Notice by*</h4>
                                            <input
                                                type="text"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                name="notice_by"
                                                value={
                                                    editData?.notice_by || ""
                                                }
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        notice_by:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <hr className="border-t-1 border-gray-300 mt-4" />

                                        {/* Buttons */}
                                        <div className="w-[700px] flex items-center justify-end mt-4">
                                            <button
                                                type="submit"
                                                className="px-4 h-[40px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            >
                                                Update
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                                                onClick={() =>
                                                    setEditModal(false)
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
            </div>
        </>
    );
};

export default NoticeListOne;
