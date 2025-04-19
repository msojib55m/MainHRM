import React, { useEffect, useRef, useState, useMemo } from "react";
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
// অনেক দেশের নাম থাকবে
import Select from "react-select";
import countryList from "react-select-country-list";
import "../../index.css";
// অনেক দেশের নাম থাকবে
import axios from "axios";
import * as XLSX from "xlsx";
import Papa from "papaparse";
const Vendor = () => {
    const [loading, setLoading] = useState(false);
    const [openVendor, setVenddor] = useState(false);
    // অনেক দেশের নাম থাকবে সিলেক্ট
    const [value, setValue] = useState("");

    const options = countryList().getData();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setFormData({ ...formData, country: selectedOption.label }); // অথবা value
    };
    const countryOptions = useMemo(() => countryList().getData(), []);

    // অনেক দেশের নাম থাকবে সিলেক্ট
    // এখন ডাটা আনা হচ্ছে ল্যারাবেল থেকে
    const [vendors, setVendors] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true);
    const [selectedVendor, setSelectedVendor] = useState(null);
    // এখন ডাটা পাঠানো হচ্ছে ল্যারাবেলে
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
        country: "",
        city: "",
        zip: "",
        balance: "",
    });
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/vendors")
            .then((res) => {
                setVendors(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoadingTable(false));
    }, []);
    const openAddModal = () => {
        clearForm();
        setVenddor(true);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/vendors",
                formData
            );

            const newVendor = response.data.vendor;

            // ⬇️ টেবিলে নতুন vendor যোগ
            setVendors((prevVendors) => [...prevVendors, newVendor]);

            clearForm();
            setSelectedCountry(null);
            setValue("");

            // ⬇️ মডেল বন্ধ
            setVenddor(false);
        } catch (error) {
            console.error(
                "Error saving vendor:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    // এখন ডাটা পাঠানো হচ্ছে ল্যারাবেলে
    const [editModal, setEditModal] = useState(false);

    const handleEdit = (vendor) => {
        setSelectedVendor(vendor);
        setFormData({
            name: vendor.name,
            mobile: vendor.mobile,
            email: vendor.email,
            address: vendor.address,
            country: vendor.country,
            city: vendor.city,
            zip: vendor.zip,
            balance: vendor.balance,
        });
        setSelectedCountry({ label: vendor.country, value: vendor.country });
        setEditModal(true);
    };
    // 🔁 Update vendor
    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/vendors/${selectedVendor.id}`,
                formData
            );
            setVendors((prev) =>
                prev.map((v) =>
                    v.id === selectedVendor.id ? response.data.vendor : v
                )
            );
            clearForm();
            setEditModal(false);
        } catch (error) {
            console.error(
                "Error updating vendor:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    // 🔄 Clear form
    const clearForm = () => {
        setFormData({
            name: "",
            mobile: "",
            email: "",
            address: "",
            country: "",
            city: "",
            zip: "",
            balance: "",
        });
        setSelectedCountry(null);
        setSelectedVendor(null);
    };
    const [deleting, setDeleting] = useState(false);
    const handleDelete = async (id) => {
        setDeleting(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/vendors/${id}`);
            setVendors((prev) => prev.filter((v) => v.id !== id));
        } catch (error) {
            console.error(
                "Error deleting vendor:",
                error.response?.data || error.message
            );
            alert("Failed to delete vendor.");
        } finally {
            setDeleting(false);
        }
    };
    // সাচ
    const [searchTerm, setSearchTerm] = useState("");
    const [searching, setSearching] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSearching(true);
        setTimeout(() => setSearching(false), 500);
    };

    const filteredVendors = useMemo(() => {
        if (!searchTerm) return vendors;
        return vendors.filter((vendor) =>
            Object.values(vendor).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, vendors]);
    // excel download now
    const [downloading, setDownloading] = useState(false);

    const handleExportToExcel = () => {
        setDownloading(true); // ⏳ লোডিং শুরু

        setTimeout(() => {
            const exportData = filteredVendors.map((vendor, index) => ({
                SL: index + 1,
                "Vendor Name": vendor.name,
                "Mobile Number": vendor.mobile,
                "Email Address": vendor.email,
                City: vendor.city,
                "Zip Code": vendor.zip,
                Country: vendor.country,
                "Previous Balance": vendor.balance,
            }));

            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");

            XLSX.writeFile(workbook, "vendors_list.xlsx");
            setDownloading(false); // ✅ লোডিং শেষ
        }, 500); // হালকা delay
    };
    // csv download
    const [downloadingCSV, setDownloadingCSV] = useState(false);
    const handleExportToCSV = () => {
        setDownloadingCSV(true);

        setTimeout(() => {
            // Mapping the vendors data to a format suitable for CSV
            const exportData = filteredVendors.map((vendor, index) => ({
                SL: index + 1,
                "Vendor Name": vendor.name,
                Mobile: vendor.mobile,
                Email: vendor.email,
                City: vendor.city,
                "Zip Code": vendor.zip,
                Country: vendor.country,
                "Previous Balance": vendor.balance,
            }));

            // Convert JSON to CSV using PapaParse
            const csv = Papa.unparse(exportData);

            // Create a Blob from the CSV and download it
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "vendors_list.csv";
            link.click();
            setDownloadingCSV(false);
        }, 500);
    };
    // কয়টা ডাটা হবে
    const [entriesPerPage, setEntriesPerPage] = useState(10); // Default 10 entries per page
    const handleEntriesChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
    };
    const displayedVendors = useMemo(() => {
        return filteredVendors.slice(0, entriesPerPage); // Show only the number of vendors selected
    }, [filteredVendors, entriesPerPage]);

    return (
        <div>
            <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                {/* number Header: 1 */}
                <div class="flex items-center justify-between w-[auto] ">
                    <div>
                        <h6 class="text-lg font-semibold mb-0">Vendor list</h6>
                    </div>
                    <div className="">
                        <button
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                            onClick={openAddModal}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <div className="ml-[5px]">Add vendor</div>
                        </button>
                    </div>
                </div>
                {/* number Header: 1 */}
                {/* number : 2 */}
                <div class="mt-[20px]">
                    <div class="flex justify-between items-center ">
                        {/* select data page */}
                        <div className="mt-[20px]  ">
                            <label className="text-sm font-medium text-[20px]">
                                Show
                                <select
                                    name="entries"
                                    className=" p-2 border border-gray-300 rounded-md 
                                                                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                                                                        appearance-none h-[40px] ml-[10px] mr-[10px]"
                                    value={entriesPerPage}
                                    onChange={handleEntriesChange}
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
                        {/* csv Download and Excel  */}
                        <div className="bg-blue-500 text-white py-2 px-4 rounded-sm flex">
                            <button
                                className="flex w-[70px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleExportToCSV}
                                disabled={downloadingCSV} // Disable the button when downloading
                            >
                                {downloadingCSV ? (
                                    <>
                                        <svg
                                            className="animate-spin h-4 w-4 text-white"
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
                                        <span className="text-sm">Loading</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faFileCsv} />
                                        <span className="text-sm">CSV</span>
                                    </>
                                )}
                            </button>

                            <button
                                className="flex items-center justify-center gap-2 w-[90px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-60"
                                onClick={handleExportToExcel}
                                disabled={downloading}
                            >
                                {downloading ? (
                                    <>
                                        <svg
                                            className="animate-spin h-4 w-4 text-white"
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
                                        <span className="text-sm">Loading</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-sm">Excel</span>
                                        <FontAwesomeIcon icon={faFileExcel} />
                                    </>
                                )}
                            </button>
                        </div>
                        {/* csv Download and Excel  */}
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
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* search filed  */}
                    </div>
                </div>
                {/* number : 2 */}
                {/* number : 3  */}
                {/* hearder row */}
                <div className="mt-[20px]">
                    <hr />
                </div>
                {/* hearder row */}
                {/* number : 3  */}
                {/* number : 4 */}

                <div className="mt-[20px] overflow-x-auto max-w-[12000px] mx-auto border rounded">
                    {deleting && (
                        <div className="flex items-center justify-center text-green-600 mb-4">
                            <svg
                                className="animate-spin h-5 w-5 text-green-600 mr-2"
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
                            Deleting vendor...
                        </div>
                    )}
                    {searching && (
                        <div className="flex items-center justify-center text-blue-600 mb-4">
                            <svg
                                className="animate-spin h-5 w-5 text-blue-600 mr-2"
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
                            Searching...
                        </div>
                    )}
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="text-left">
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-2 py-1 text-sm">
                                    SL
                                </th>
                                <th className="border border-gray-300 px-2 py-1 text-sm">
                                    Vendor name
                                </th>

                                <th className="border border-gray-300 px-2 py-1 text-sm">
                                    Mobile number
                                </th>

                                <th className="border border-gray-300 px-2 py-1 text-sm">
                                    Email address
                                </th>

                                <th className="border border-gray-300 px-2 py-1 text-sm">
                                    City
                                </th>
                                <th className="border border-gray-300 px-2 py-1 text-sm">
                                    Zip Code
                                </th>

                                <th className="border border-gray-300 px-2 py-1 text-sm">
                                    Country
                                </th>
                                <th className="border border-gray-300 px-2 py-1 text-sm">
                                    Previous Balance
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
                                        colSpan="9"
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
                            ) : displayedVendors.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="text-center py-4"
                                    >
                                        No vendors found.
                                    </td>
                                </tr>
                            ) : (
                                displayedVendors.map((vendor, index) => (
                                    <tr key={vendor.id}>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {vendor.name}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {vendor.mobile}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {vendor.email}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {vendor.city}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {vendor.zip}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {vendor.country}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">
                                            {vendor.balance}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                onClick={() =>
                                                    handleEdit(vendor)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />
                                            </button>
                                            <button
                                                className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1"
                                                onClick={() =>
                                                    handleDelete(vendor.id)
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
                {/* number : 4  */}
            </div>
            {/* main number: 5 */}
            {openVendor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="w-[900px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                        <h5 className="text-lg font-semibold">Add vendor</h5>

                        <form onSubmit={handleSubmit}>
                            <div className="sticky">
                                {/* name */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Vendor name *</h4>
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[53px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Vendor name "
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* number */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Mobile number *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[40px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Mobile number "
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Email address  */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Email address *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            className="w-[650px] ml-[50px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Email address  "
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Address * */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Address *</h4>
                                    </div>
                                    <div>
                                        <textarea
                                            className="w-[650px] ml-[87px] h-[80px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                {/* country now */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Country *</h4>
                                    </div>
                                    <div className="">
                                        <Select
                                            options={countryOptions}
                                            value={selectedCountry}
                                            onChange={handleCountryChange}
                                            className="w-[660px] ml-[83px]  p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </div>
                                {/* City name */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>City *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[118px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="City  "
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Zip code * */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Zip code *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[82px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Zip code "
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Previous balance * */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Previous balance *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[26px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Previous balance "
                                            name="balance"
                                            value={formData.balance}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="w-[790px] flex items-center justify-end mt-[20px] ml-[50px]">
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
                                        onClick={() => setVenddor(false)}
                                        disabled={loading} // ক্লোজ বাটনও ডিসেবল হবে যখন লোডিং চলবে
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
                <div className="fixed inset-0 z-50 flex items-center justify-center mt-[60px] ">
                    {/* Background Overlay */}
                    <div className="fixed inset-0 bg-black opacity-50"></div>

                    {/* Position Form */}
                    <div className="w-[900px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                        <h5 className="text-lg font-semibold">Update vendor</h5>
                        <hr className="border-t-1 border-gray-300 mt-2" />

                        {/* Input Fields */}
                        <form action="" onSubmit={handleUpdate}>
                            <div className="sticky">
                                {/* name */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Vendor name *</h4>
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[53px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Vendor name "
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* number */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Mobile number *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[40px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Mobile number "
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Email address  */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Email address *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            className="w-[650px] ml-[50px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Email address  "
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Address * */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Address *</h4>
                                    </div>
                                    <div>
                                        <textarea
                                            className="w-[650px] ml-[87px] h-[80px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                {/* country now */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Country *</h4>
                                    </div>
                                    <div className="">
                                        <Select
                                            className="w-[660px] ml-[83px]  p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={selectedCountry}
                                            onChange={handleCountryChange}
                                        />
                                    </div>
                                </div>
                                {/* City name */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>City *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[118px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="City  "
                                        />
                                    </div>
                                </div>
                                {/* Zip code * */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Zip code *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[82px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Zip code "
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Previous balance * */}
                                <div className="flex mt-[20px] ml-[30px]">
                                    <div>
                                        <h4>Previous balance *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[26px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Previous balance "
                                            name="balance"
                                            value={formData.balance}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="w-[790px] flex items-center justify-end mt-[20px] ml-[50px]">
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
                                        onClick={() => setEditModal(false)}
                                        disabled={loading} // ক্লোজ বাটনও ডিসেবল হবে যখন লোডিং চলবে
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* main number: 5 */}
            {/* Foter now */}
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

export default Vendor;
