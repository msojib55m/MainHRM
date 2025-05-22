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
const CurrencyOne = () => {
    const [addCurrency, setCurrency] = useState(false);
    const [title, setTitle] = useState("");
    const [symbol, setSymbol] = useState("");
    const [country, setCountry] = useState("");
    const [status, setStatus] = useState("active");
    const [currencies, setCurrencies] = useState([]);
    // loading login now
    const [loading, setLoading] = useState(false);
    // setTable loading
    const [loadingTable, setLoadingTable] = useState(true);
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const fetchData = async () => {
        setLoadingTable(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/currencies");
            const data = await res.json();

            setCurrencies(data);
        } catch (error) {
            console.error("Error loading currencies:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // লোডিং শুরু

        const data = { title, symbol, country, status };

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/currencies",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                const newCurrency = await response.json();
                setCurrencies((prev) => [...prev, newCurrency]);

                // Clear form and close modal
                setTitle("");
                setSymbol("");
                setCountry("");
                setStatus("active");
                setCurrency(false);
            } else {
                console.error(
                    "Failed to save currency:",
                    await response.text()
                );
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        } finally {
            setLoading(false); // লোডিং শেষ
        }
    };
    const [editId, setEditId] = useState(null);

    const [editadd, setEdit] = useState(false);
    const handleEditClick = (currency) => {
        setEditId(currency.id);
        setTitle(currency.title);
        setSymbol(currency.symbol);
        setCountry(currency.country);
        setStatus(currency.status);
        setEdit(true); // modal open
    };
    const handleEdit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/currencies/${editId}`,
                { title, symbol, country, status }
            );

            if (response.status === 200) {
                await fetchData(); // ডাটা রিফ্রেশ
                console.log("Currencies after fetch in edit:", currencies);
                setEdit(false);
                setEditId(null);
                setTitle("");
                setSymbol("");
                setCountry("");
                setStatus("active");
            } else {
                toast.error("Update failed.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating currency.");
        } finally {
            setLoading(false);
        }
    };
    const [loadingDeleteId, setLoadingDeleteId] = useState(null); // এটাকে উপরে state এ যুক্ত করুন

    const handleDelete = async (id) => {
        setLoadingDeleteId(id);

        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/currencies/${id}`
            );
            if (response.status === 200) {
                fetchData(); // ডাটা রিফ্রেশ
            } else {
                toast.error("Failed to delete currency.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Error deleting currency.");
        } finally {
            setLoadingDeleteId(null); // লোডিং অফ
        }
    };
    const filteredCurrencies = currencies.filter(
        (currency) =>
            currency.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            currency.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            currency.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
        if (searchTerm.trim() !== "") {
            setSearching(true);
            const timeout = setTimeout(() => {
                setSearching(false);
            }, 300);
            return () => clearTimeout(timeout);
        } else {
            setSearching(false);
        }
    }, [searchTerm]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <div>
                <div className="relative">
                    <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                        {/* one */}
                        <div class="flex items-center justify-between w-[auto] ">
                            <div>
                                <h6 class="text-lg font-semibold mb-0">
                                    Currency list
                                </h6>
                            </div>
                            <div className="">
                                <button
                                    class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                                    onClick={() => setCurrency(true)}
                                >
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                    <div className="ml-[5px]">Add currency</div>
                                </button>
                            </div>
                        </div>
                        {/* one */}
                        <div class="mt-[20px]">
                            <hr />
                            <div class="flex justify-between items-center ">
                                {/* select data page */}
                                <div className="mt-[20px]  ">
                                    <label className="text-sm font-medium text-[20px]">
                                        Show
                                        <select
                                            className="    p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none h-[40px] ml-[10px] mr-[10px]"
                                            value={itemsPerPage}
                                            onChange={(e) =>
                                                setItemsPerPage(
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
                                                    setSearchTerm(
                                                        e.target.value
                                                    )
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
                                                Title
                                            </th>
                                            <th className="border border-gray-300 px-2 py-1 text-sm">
                                                Symbol
                                            </th>
                                            <th className="border border-gray-300 px-2 py-1 text-sm">
                                                Country
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
                                                        <span>
                                                            {searching
                                                                ? "Searching..."
                                                                : "Loading..."}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : filteredCurrencies.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="11"
                                                    className="text-center py-4 text-gray-500"
                                                >
                                                    No data found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredCurrencies
                                                .slice(0, itemsPerPage)
                                                .map((currency, index) => (
                                                    <tr key={currency.id}>
                                                        <td className="border px-2 py-1 text-sm">
                                                            {index + 1}
                                                        </td>
                                                        <td className="border px-2 py-1 text-sm">
                                                            {currency.title}
                                                        </td>
                                                        <td className="border px-2 py-1 text-sm">
                                                            {currency.symbol}
                                                        </td>
                                                        <td className="border px-2 py-1 text-sm">
                                                            {currency.country}
                                                        </td>
                                                        <td className="border px-2 py-1 text-sm">
                                                            {currency.status}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2 text-left">
                                                            <button
                                                                className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                                onClick={() =>
                                                                    handleEditClick(
                                                                        currency
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
                                                                className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1 "
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        currency.id
                                                                    )
                                                                }
                                                                disabled={
                                                                    loadingDeleteId ===
                                                                    currency.id
                                                                }
                                                            >
                                                                {loadingDeleteId ===
                                                                currency.id ? (
                                                                    <>
                                                                        <svg
                                                                            className="animate-spin h-4 w-4 mr-1 text-red-600"
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
                                                                    </>
                                                                ) : (
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faTrash
                                                                        }
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
                        </div>
                    </div>
                </div>
                {addCurrency && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="w-[950px] bg-white p-6 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto mt-[80px] mb-[30px]">
                            <h5 className="text-lg font-semibold">
                                New notice
                            </h5>
                            <hr className="border-t-1 border-gray-300 mt-2" />
                            <form className="mt-[20px]" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Title */}
                                    <div>
                                        <label className="block mb-1 font-semibold">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-400 rounded-md px-2  focus:border-green-500 focus:outline-none"
                                            placeholder="Enter title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Symbol */}
                                    <div>
                                        <label className="block mb-1 font-semibold">
                                            Symbol *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-400 rounded-md px-2  focus:border-green-500 focus:outline-none"
                                            placeholder="Enter symbol"
                                            value={symbol}
                                            onChange={(e) =>
                                                setSymbol(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block mb-1 font-semibold">
                                            Country *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-400 rounded-md px-2  focus:border-green-500 focus:outline-none"
                                            placeholder="Enter country"
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block mb-1 font-semibold">
                                            Status
                                        </label>
                                        <select
                                            className="w-full p-2 border border-gray-400 rounded-md px-2  focus:border-green-500 focus:outline-none"
                                            value={status}
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
                                        >
                                            <option value="active">
                                                Active
                                            </option>
                                            <option value="inactive">
                                                Inactive
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        type="submit"
                                        className="px-4 h-10 bg-green-500 text-white rounded-md hover:bg-green-600"
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
                                            "Submit"
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 h-10 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        onClick={() => setCurrency(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {editadd && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="w-[950px] bg-white p-6 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto mt-[80px] mb-[30px]">
                            <h5 className="text-lg font-semibold">
                                New notice
                            </h5>
                            <hr className="border-t-1 border-gray-300 mt-2" />
                            <form className="mt-[20px]" onSubmit={handleEdit}>
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Title */}
                                    <div>
                                        <label className="block mb-1 font-semibold">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-400 rounded-md px-2  focus:border-green-500 focus:outline-none"
                                            placeholder="Enter title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Symbol */}
                                    <div>
                                        <label className="block mb-1 font-semibold">
                                            Symbol *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-400 rounded-md px-2  focus:border-green-500 focus:outline-none"
                                            placeholder="Enter symbol"
                                            value={symbol}
                                            onChange={(e) =>
                                                setSymbol(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block mb-1 font-semibold">
                                            Country *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-400 rounded-md px-2  focus:border-green-500 focus:outline-none"
                                            placeholder="Enter country"
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block mb-1 font-semibold">
                                            Status
                                        </label>
                                        <select
                                            className="w-full p-2 border border-gray-400 rounded-md px-2  focus:border-green-500 focus:outline-none"
                                            value={status}
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
                                        >
                                            <option value="active">
                                                Active
                                            </option>
                                            <option value="inactive">
                                                Inactive
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        type="submit"
                                        className="px-4 h-10 bg-green-500 text-white rounded-md hover:bg-green-600"
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
                                            "Update"
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 h-10 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        onClick={() => setEdit(false)}
                                    >
                                        Close
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

export default CurrencyOne;
