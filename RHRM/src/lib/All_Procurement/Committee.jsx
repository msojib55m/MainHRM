import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// fontawesome Icon start
// custome Image
import {
    faCirclePlus,
    faEdit,
    faTrash,
    faPlusSquare,
    faFileCsv,
    faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { unparse } from "papaparse";
import * as XLSX from "xlsx";
const Committee = () => {
    const [openCommit, setCommit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [signature, setSignature] = useState(null);
    const [loadingTable, setLoadingTable] = useState(false);
    // data send to now
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("signature", signature);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/committee",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Success:", response.data);

            setName("");
            setSignature(null);
            setCommit(false);
            fetchCommittees();
        } catch (error) {
            console.error("Upload Error:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };
    // data send to Ends
    const [committees, setCommittees] = useState([]);
    const fetchCommittees = async () => {
        setLoadingTable(true);
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/committees"
            );
            setCommittees(response.data);
        } catch (error) {
            console.error("Error fetching committees:", error);
        } finally {
            setLoadingTable(false); // End loading
        }
    };

    useEffect(() => {
        fetchCommittees();
    }, []);
    // সাচ করব
    const [searchTerm, setSearchTerm] = useState("");
    const filteredCommittees = committees.filter((committee) =>
        committee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Edit now start
    const [openEdit, setEdit] = useState(false); // Modal open state
    const [editingCommittee, setEditingCommittee] = useState(null); // For storing the committee being edited
    const [nameEdit, setNameEdit] = useState("");
    const [signatureEdit, setSignatureEdit] = useState(null); // For storing new signature

    const [loadingEdit, setLoadingEdit] = useState(false);

    // Handle editing a committee (Open Modal and Set data)
    const handleEdit = (committee) => {
        setEditingCommittee(committee); // Set the committee to be edited
        setNameEdit(committee.name); // Pre-fill the name
        setSignatureEdit(null); // Reset signature for file input
        setEdit(true); // Open modal
    };

    // Handle file input change for signature
    const handleSignatureChange = (e) => {
        setSignatureEdit(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoadingEdit(true);

        const formData = new FormData();
        formData.append("name", nameEdit);
        if (signatureEdit) {
            formData.append("signature", signatureEdit);
        }
        formData.append("_method", "PUT"); // Laravel এর জন্য spoofing

        try {
            await axios.post(
                `http://127.0.0.1:8000/api/committee/${editingCommittee.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Refresh table
            fetchCommittees();
            setEdit(false);
            setEditingCommittee(null);
        } catch (error) {
            console.error("Update Error:", error);
            alert("Update failed!");
        } finally {
            setLoadingEdit(false);
        }
    };
    // Edit now start
    // delete now
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/committee/${id}`);

            fetchCommittees(); // টেবিল রিফ্রেশ করো
        } catch (error) {
            console.error("Delete Error:", error);
            alert("ডিলিট করতে সমস্যা হয়েছে!");
        }
    };
    //  download now Excel now
    const handleDownloadExcel = () => {
        // Prepare data for export
        const data = filteredCommittees.map((committee, index) => ({
            No: index + 1,
            Name: committee.name,
            Signature: committee.signature,
        }));

        // Create a new workbook and add the data to it
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Committees");

        // Generate and download the Excel file
        XLSX.writeFile(wb, "committees.xlsx");
    };
    //  download now Excel now
    // download now CSV
    const handleDownloadCSV = () => {
        const data = filteredCommittees.map((committee, index) => ({
            No: index + 1,
            Name: committee.name,
            Signature: committee.signature,
        }));

        const csv = Papa.unparse(data);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "committees.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // selected now
    const [entriesToShow, setEntriesToShow] = useState(10); // ডিফল্ট 10

    return (
        <div>
            <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                {/* header  */}
                <div class="flex items-center justify-between w-[auto] ">
                    <div>
                        <h6 class="text-lg font-semibold mb-0">
                            Committee list{" "}
                        </h6>
                    </div>
                    <div className="">
                        <button
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                            onClick={() => setCommit(true)}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <div className="ml-[5px]">Add committee</div>
                        </button>
                    </div>
                </div>
                {/* header */}
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
                                    value={entriesToShow}
                                    onChange={(e) =>
                                        setEntriesToShow(
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
                        {/* csv Download and Excel  */}
                        <div className="bg-blue-500 text-white py-2 px-4 rounded-sm flex">
                            <button
                                className="flex w-[70px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleDownloadCSV}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faFileCsv} />
                                </div>
                                CSV
                            </button>
                            <button
                                className="flex w-[70px]  bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleDownloadExcel}
                            >
                                Excel
                                <div>
                                    <FontAwesomeIcon icon={faFileExcel} />
                                </div>
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
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        {/* search filed  */}
                    </div>
                </div>
                {/* hearder row */}
                <div className="mt-[20px]">
                    <hr />
                </div>
                {/* hearder row */}
                <div class="mt-[20px]">
                    <table class="min-w-full table-auto border-collapse">
                        <thead class="text-left">
                            <tr class="bg-gray-100">
                                <th class="border border-gray-300 px-4 py-2">
                                    SL
                                </th>
                                <th class="border border-gray-300 px-4 py-2">
                                    committee
                                </th>
                                <th class="border border-gray-300 px-4 py-2">
                                    Signature
                                </th>

                                <th class="border border-gray-300 px-4 py-2">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingTable ? (
                                // Show loading spinner while data is being fetched
                                <tr>
                                    <td
                                        colSpan="4"
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
                            ) : filteredCommittees.length === 0 ? (
                                // If no data available, show a "No committees found" message
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-4"
                                    >
                                        No committees found.
                                    </td>
                                </tr>
                            ) : (
                                // Display the data (committees) once fetched
                                filteredCommittees
                                    .slice(0, entriesToShow)
                                    .map((committee, index) => (
                                        <tr
                                            key={committee.id}
                                            className="border-b"
                                        >
                                            <td className="border border-gray-300 px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {committee.name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <img
                                                    src={`${
                                                        committee.signature
                                                    }?t=${new Date().getTime()}`}
                                                    alt="Signature"
                                                    className="h-12"
                                                />
                                            </td>

                                            <td className="border border-gray-300 px-4 py-2">
                                                <button
                                                    className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                    onClick={() => {
                                                        handleEdit(committee);
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />
                                                </button>
                                                <button
                                                    className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1"
                                                    onClick={() =>
                                                        handleDelete(
                                                            committee.id
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
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* open Commit add click */}
            {openCommit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="w-[800px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                        <h5 className="text-lg font-semibold">Add committee</h5>
                        <hr className="border-t-1 border-gray-300 mt-2" />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="flex mt-[20px] ml-[10px]">
                                    <div>
                                        <h4>Name *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[20px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex mt-[20px] items-center">
                                        <div>
                                            <h4>Signature*</h4>
                                        </div>
                                        <div class="flex w-full my-4 ml-[10px]">
                                            <label class="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border border-gray-300 cursor-pointer hover:bg-green-500 hover:text-white transition duration-300 w-[650px]">
                                                <svg
                                                    class="w-[20px]"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M16.88 9.94a1.5 1.5 0 00-1.06-2.56H13V5a3 3 0 10-6 0v2.38H4.19a1.5 1.5 0 00-1.06 2.56l5.3 5.3a1.5 1.5 0 002.12 0l5.3-5.3z" />
                                                </svg>
                                                <span class="mt-2 text-base leading-normal">
                                                    Choose a file
                                                </span>
                                                <input
                                                    type="file"
                                                    onChange={(e) =>
                                                        setSignature(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    class="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[730px] flex items-center justify-end mt-[20px]">
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
                                        onClick={() => setCommit(false)}
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
            {openEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="w-[800px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                        <h5 className="text-lg font-semibold">
                            Update committee
                        </h5>
                        <hr className="border-t-1 border-gray-300 mt-2" />
                        <form onSubmit={handleUpdate}>
                            <div>
                                <div className="flex mt-[20px] ml-[10px]">
                                    <div>
                                        <h4>Name *</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[20px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Name"
                                            value={nameEdit} // Use the state value here
                                            onChange={(e) =>
                                                setNameEdit(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex mt-[20px] items-center">
                                        <div>
                                            <h4>Signature*</h4>
                                        </div>
                                        <div class="flex w-full my-4 ml-[10px]">
                                            <label class="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border border-gray-300 cursor-pointer hover:bg-green-500 hover:text-white transition duration-300 w-[650px]">
                                                <svg
                                                    class="w-[20px]"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M16.88 9.94a1.5 1.5 0 00-1.06-2.56H13V5a3 3 0 10-6 0v2.38H4.19a1.5 1.5 0 00-1.06 2.56l5.3 5.3a1.5 1.5 0 002.12 0l5.3-5.3z" />
                                                </svg>
                                                <span class="mt-2 text-base leading-normal">
                                                    Choose a file
                                                </span>
                                                <input
                                                    type="file"
                                                    class="hidden"
                                                    onChange={
                                                        handleSignatureChange
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[730px] flex items-center justify-end mt-[20px]">
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
                                        onClick={() => setEdit(false)}
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

export default Committee;
