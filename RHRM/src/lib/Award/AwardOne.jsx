import React, { useEffect, useState } from "react";
import {
    faCirclePlus,
    faTimes,
    faPenToSquare,
    faTrashCan,
    faFileExcel,
    faFileCsv,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../../axiosClient";
import axios from "axios";
const AwardOne = () => {
    // data table show
    const [addAward, setAward] = useState(false);
    // all data state
    const [formData, setFormData] = useState({
        awardName: "",
        description: "",
        giftItem: "",
        date: "",
        employeeName: "",
        awardBy: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // data to get laravel to mysql and table
    const [allData, setAllData] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true);
    const fetchData = async () => {
        setLoadingTable(true);
        try {
            const res = await axiosClient.get("/awardGet");
            setAllData(res.data);
        } catch (err) {
            console.error("Error fetching Aword:", err);
        } finally {
            setLoadingTable(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    // data send to laravel and mysql
    const [loading, setLoading] = useState(false);
    const AwardSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosClient.post("/award", formData);
            resetForm();
            setAward(false);
            fetchData();
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
                console.log(response.data);
            }
        } finally {
            setLoading(false);
        }
    };
    // all data click show
    const resetForm = () => {
        setFormData({
            awardName: "",
            description: "",
            giftItem: "",
            date: "",
            employeeName: "",
            awardBy: "",
        });
        setAward(true);
    };
    // Edit data to laravel and mysql
    const [editId, setEditId] = useState(null);
    const [editadd, setEdit] = useState(false);
    const allEdit = (emp) => {
        setEditId(emp.id);
        setFormData({
            awardName: emp.awardName,
            description: emp.description,
            giftItem: emp.giftItem,
            date: emp.date,
            employeeName: emp.employeeName,
            awardBy: emp.awardBy,
        });
        setEdit(true);
    };
    //
    const AwardEdit = async (e) => {
        e.preventDefault();
        const data = {
            awardName: formData.awardName,
            description: formData.description,
            giftItem: formData.giftItem,
            date: formData.date,
            employeeName: formData.employeeName,
            awardBy: formData.awardBy,
        };
        setLoading(true);
        try {
            await axiosClient.put(`/awardEdit/${editId}`, data);
            setEdit(false);
            fetchData();
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data);
            }
        } finally {
            setLoading(false);
        }
    };
    // delete to react to tabe and mysql now
    const [deletingId, setDeletingId] = useState(null);
    const handleDelete = async (id) => {
        setDeletingId(id);
        console.log(id);
        try {
            await axiosClient.delete(`/awardDelete/${id}`);
            fetchData();
        } catch (err) {
        } finally {
            setDeletingId(null);
        }
    };
    // search form and table change
    const [searchTerm, setSearchTerm] = useState("");
    const filteredData = allData.filter(
        (emp) =>
            emp.awardName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.employeeName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            emp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.giftItem?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // data entershow
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const displayedData =
        itemsPerPage === -1
            ? filteredData
            : filteredData.slice(0, itemsPerPage);

    return (
        <div>
            <div className="sticky mt-[100px] h-[auto] p-2 z-10 flex items-start justify-between bg-[white] rounded-[12px]">
                <div className="w-full">
                    <div className="flex items-center justify-between w-full h-[50px] pr-[10px] pl-[10px] relative">
                        <div>
                            <h5>Award list</h5>
                        </div>
                        <div className="p-4">
                            {/* Add New Award Button */}
                            <div
                                className="flex bg-green-600 h-[40px] items-center p-3 cursor-pointer"
                                onClick={() => resetForm()}
                            >
                                <FontAwesomeIcon
                                    className="text-white mr-2"
                                    icon={faCirclePlus}
                                />
                                <a href="#" className="text-white">
                                    Add new award
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[10px]">
                        <hr />
                    </div>
                    <div className="mt-[20px]">
                        <div className=" flex align-center justify-between">
                            {/* card one */}
                            <div className="flex items-center space-x-2">
                                <label className="text-gray-700 text-sm font-medium">
                                    Show
                                </label>
                                <select
                                    name="award-table_length"
                                    className="block w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={itemsPerPage}
                                    onChange={(e) =>
                                        setItemsPerPage(
                                            parseInt(e.target.value)
                                        )
                                    }
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
                            <div className="bg-blue-500 text-white py-2 px-4 rounded-sm flex">
                                <button className="flex w-[70px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                    <div>
                                        <FontAwesomeIcon icon={faFileCsv} />
                                    </div>
                                    CSV
                                </button>
                                <button className="flex w-[70px]  bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                    Excel
                                    <div>
                                        <FontAwesomeIcon icon={faFileExcel} />
                                    </div>
                                </button>
                            </div>
                            {/* card Two */}
                            {/* card Three */}
                            <div className="flex align-center justify-center">
                                <div className="mt-[5px] mr-[3px]">
                                    <label>Search :</label>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
                                        placeholder="Search awards..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            {/* card three */}
                        </div>
                    </div>
                    {/* table one */}
                    <div className="mt-[30px]">
                        <table
                            className="table-auto w-full border-collapse border border-gray-200 text-sm"
                            id="award-table"
                            role="grid"
                        >
                            <thead className="text-left">
                                <tr role="text-left" className="bg-gray-100">
                                    <th
                                        title="Sl"
                                        width="50"
                                        className="text-center-center px-3 py-2 border-b border-gray-300"
                                    >
                                        Sl
                                    </th>
                                    <th
                                        title="Award name"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Award name
                                    </th>
                                    <th
                                        title="Award description"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Award description
                                    </th>
                                    <th
                                        title="Gift item"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Gift item
                                    </th>
                                    <th
                                        title="Date"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Date
                                    </th>
                                    <th
                                        title="Employee name"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Employee name
                                    </th>
                                    <th
                                        title="Award by"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Award by
                                    </th>
                                    <th
                                        title="Action"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-left">
                                {loadingTable ? (
                                    <tr>
                                        <td
                                            colSpan="11"
                                            className="text-center py-4"
                                        >
                                            <div className="flex items-center justify-center space-x-2 text-gray-500">
                                                <svg
                                                    className="animate-spin h-5 w-5"
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
                                                <span>"Loading..."</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : displayedData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="11"
                                            className="text-center py-4 text-gray-500"
                                        >
                                            No employees found.
                                        </td>
                                    </tr>
                                ) : (
                                    displayedData.map((emp, index) => (
                                        <tr
                                            key={emp.id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="border px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {emp.awardName}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {emp.description}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {emp.giftItem}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {emp.date}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {emp.employeeName}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {emp.awardBy}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                    onClick={() => allEdit(emp)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />
                                                </button>
                                                <button
                                                    className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1"
                                                    onClick={() =>
                                                        handleDelete(emp.id)
                                                    }
                                                    disabled={
                                                        deletingId === emp.id
                                                    } // এক্ষেত্রে বাটন disable করে দেওয়া নিরাপদ
                                                >
                                                    {deletingId === emp.id ? (
                                                        <svg
                                                            className="animate-spin h-4 w-4 text-red-600"
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
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* table end */}
                </div>
                {/* Award Form Modal */}
                {addAward && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">
                                    Add Award
                                </h2>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="cursor-pointer text-gray-500"
                                />
                            </div>

                            <form
                                className="flex flex-col gap-3"
                                onSubmit={AwardSubmit}
                            >
                                <input
                                    type="text"
                                    name="awardName"
                                    value={formData.awardName}
                                    onChange={handleChange}
                                    placeholder="Award name *"
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={handleChange}
                                    name="description"
                                    placeholder="Award description"
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    name="giftItem"
                                    value={formData.giftItem}
                                    onChange={handleChange}
                                    placeholder="Gift item *"
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="employeeName"
                                    value={formData.employeeName}
                                    onChange={handleChange}
                                    placeholder="Employee name *"
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="awardBy"
                                    value={formData.awardBy}
                                    onChange={handleChange}
                                    placeholder="Award by *"
                                    className="border p-2 rounded"
                                    required
                                />

                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => setAward(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded"
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
                                            "Save"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {editadd && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">
                                    Edit Award
                                </h2>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="cursor-pointer text-gray-500"
                                />
                            </div>

                            <form
                                className="flex flex-col gap-3"
                                onSubmit={AwardEdit}
                            >
                                <input
                                    type="text"
                                    name="awardName"
                                    value={formData.awardName}
                                    onChange={handleChange}
                                    placeholder="Award name *"
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={handleChange}
                                    name="description"
                                    placeholder="Award description"
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    name="giftItem"
                                    value={formData.giftItem}
                                    onChange={handleChange}
                                    placeholder="Gift item *"
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="employeeName"
                                    value={formData.employeeName}
                                    onChange={handleChange}
                                    placeholder="Employee name *"
                                    className="border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="awardBy"
                                    value={formData.awardBy}
                                    onChange={handleChange}
                                    placeholder="Award by *"
                                    className="border p-2 rounded"
                                    required
                                />

                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => setEdit(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded"
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
                                            "update"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AwardOne;
