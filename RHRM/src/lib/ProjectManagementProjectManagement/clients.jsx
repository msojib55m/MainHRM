import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import countryList from "react-select-country-list";
import axios from "axios";
const clients = () => {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            padding: "0.375rem 0.5rem", // py-1 px-2
            borderWidth: state.isFocused ? "2px" : "1px",
            borderColor: state.isFocused ? "#22c55e" : "#d1d5db", // green-500 or gray-300
            boxShadow: state.isFocused ? "0 0 0 1px #22c55e" : "none",
            borderRadius: "0.375rem", // rounded-md
            backgroundColor: "#ffffff",
        }),
    };
    const [selectedCountry, setSelectedCountry] = useState(null);
    const options = useMemo(() => countryList().getData(), []);

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
    };
    const [openClicents, setclients] = useState(false);
    //  num : 1
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [clientList, setClientList] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchClients();
    }, []);
    const fetchClients = async () => {
        setLoadingTable(true);
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/clientsGet");
            setClientList(res.data);
        } catch (err) {
            console.error("Error loading clients:", err);
        } finally {
            setLoadingTable(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            client_name: clientName,
            email,
            company_name: companyName,
            address,
            country: selectedCountry?.label,
        };
        setLoading(true);
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/clientsPost",
                data
            );
            console.log(response);
            if (response.status === 200) {
                // নতুন ক্লায়েন্ট লিস্টে যোগ করো
                setClientList((prev) => [...prev, response.data]);
                // ফর্ম ক্লিয়ার
                setClientName("");
                setEmail("");
                setCompanyName("");
                setAddress("");
                setSelectedCountry(null);
                setclients(false);
            }
        } catch (error) {
            console.error("Error saving client:", error);
        } finally {
            setLoading(false);
        }
    };
    //  num : 1
    // num : 2
    const handleEdit = (client) => {
        setEdit(true);
        setSelectedClient(client);
        setClientName(client.client_name);
        setEmail(client.email);
        setCompanyName(client.company_name);
        setAddress(client.address);
        setSelectedCountry({ label: client.country, value: client.country });
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = {
            client_name: clientName,
            email,
            company_name: companyName,
            address,
            country: selectedCountry?.label,
        };
        setLoading(true);
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/clientsUpdate/${selectedClient.id}`,
                data
            );
            if (response.status === 200) {
                // Update the client in the list
                setClientList((prev) =>
                    prev.map((client) =>
                        client.id === selectedClient.id ? response.data : client
                    )
                );
                // Close the edit form
                setEdit(false);
                setClientName("");
                setEmail("");
                setCompanyName("");
                setAddress("");
                setSelectedCountry(null);
            }
        } catch (error) {
            console.error("Error updating client:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this client?"))
            return;

        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/clientsDelete/${id}`
            );
            if (response.status === 200) {
                // ক্লায়েন্ট লিস্ট থেকে রিমুভ করো
                setClientList((prev) =>
                    prev.filter((client) => client.id !== id)
                );
            }
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    };
    const filteredClients = clientList.filter((client) => {
        const term = searchTerm.toLowerCase();
        return (
            client.client_name.toLowerCase().includes(term) ||
            client.company_name.toLowerCase().includes(term) ||
            client.email.toLowerCase().includes(term) ||
            client.country.toLowerCase().includes(term)
        );
    });
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const displayedClients = filteredClients.slice(0, entriesPerPage);
    return (
        <div className="relative">
            <div className="sticky mt-[70px] h-[80px] p-2 z-10  rounded-[12px]">
                <div className=" p-4 bg-white rounded-lg h-auto w-[1400px] mt-5 shadow-md">
                    {/* number : 1 */}
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
                                        onClick={() => setclients(true)}
                                    >
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                        <div className="ml-[5px]">
                                            Add notice
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* number : 1 */}
                    {/* number : 2 */}
                    <div class="p-4  ">
                        <div className="mt-[20px]">
                            <hr />
                        </div>
                        <div class="flex justify-between items-center ">
                            <div className="mt-[20px]  ">
                                <label className="text-sm font-medium text-[20px]">
                                    Show
                                    <select
                                        className=" p-2 border border-gray-300 rounded-md 
                                                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                                                            appearance-none h-[40px] ml-[10px] mr-[10px]"
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
                                            Client name
                                        </th>
                                        <th class="border border-gray-300 px-4 py-2">
                                            Company name
                                        </th>

                                        <th class="border border-gray-300 px-4 py-2">
                                            Email
                                        </th>
                                        <th class="border border-gray-300 px-4 py-2">
                                            Country
                                        </th>

                                        <th class="border border-gray-300 px-4 py-2">
                                            action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingTable ? (
                                        <tr>
                                            <td
                                                colSpan="5"
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
                                    ) : displayedClients.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center py-4"
                                            >
                                                No clients found.
                                            </td>
                                        </tr>
                                    ) : (
                                        displayedClients.map(
                                            (client, index) => (
                                                <tr
                                                    key={client.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="border px-4 py-2">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {client.client_name}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {client.company_name}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {client.email}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {client.country}
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <button
                                                            className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    client
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                            />
                                                        </button>
                                                        <button
                                                            className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    client.id
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
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* number : 2 */}
                    {/* Click show */}
                    {openClicents && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            {/* Background Overlay */}
                            <div className="fixed inset-0 bg-black opacity-50"></div>

                            {/* Position Form */}
                            <div className="w-[800px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                                <h5 className="text-lg font-semibold">
                                    Add client
                                </h5>
                                <hr className="border-t-1 border-gray-300 mt-2" />

                                {/* Input Fields */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mt-4">
                                        <div className="flex w-[700px] items-center justify-between">
                                            <h4>Client name*</h4>
                                            <input
                                                type="text"
                                                placeholder="Client name"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                value={clientName}
                                                onChange={(e) =>
                                                    setClientName(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between">
                                            <div>
                                                <h4>Country*</h4>
                                            </div>
                                            <div className="ml-[129px]">
                                                <div className="">
                                                    <Select
                                                        options={options}
                                                        value={selectedCountry}
                                                        onChange={
                                                            handleCountryChange
                                                        }
                                                        styles={customStyles}
                                                        className="w-[515px]  px-2 py-1 mt-[10px] rounded-md focus:outline-none focus:border-green-500 focus:outline-none"
                                                        placeholder="Country"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-[700px] mt-[10px] items-center justify-between">
                                            <h4>Email *</h4>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-[10px]">
                                            <h4>Company name*</h4>
                                            <input
                                                type="text"
                                                placeholder="Company name"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                value={companyName}
                                                onChange={(e) =>
                                                    setCompanyName(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-[10px]">
                                            <h4>Address*</h4>
                                            <textarea
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                value={address}
                                                onChange={(e) =>
                                                    setAddress(e.target.value)
                                                }
                                            ></textarea>
                                        </div>
                                        {/* Radio Buttons */}
                                        <div className="flex w-[350px] items-center justify-between mt-4"></div>

                                        <hr className="border-t-1 border-gray-300 mt-4" />

                                        {/* Buttons */}
                                        <div className="w-[700px] flex items-center justify-end mt-4">
                                            <button
                                                type="submit"
                                                className="px-4 h-[40px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
                                                disabled={loading} // লোডিং অবস্থায় বাটন ডিসেবল
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

                                            <button
                                                type="button"
                                                className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                                                onClick={() =>
                                                    setclients(false)
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
                    {edit && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            {/* Background Overlay */}
                            <div className="fixed inset-0 bg-black opacity-50"></div>

                            {/* Position Form */}
                            <div className="w-[800px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                                <h5 className="text-lg font-semibold">
                                    Add client
                                </h5>
                                <hr className="border-t-1 border-gray-300 mt-2" />

                                {/* Input Fields */}
                                <form onSubmit={handleUpdate}>
                                    <div className="mt-4">
                                        <div className="flex w-[700px] items-center justify-between">
                                            <h4>Client name*</h4>
                                            <input
                                                type="text"
                                                placeholder="Client name"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                required
                                                value={clientName}
                                                onChange={(e) =>
                                                    setClientName(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between">
                                            <div>
                                                <h4>Country*</h4>
                                            </div>
                                            <div className="ml-[129px]">
                                                <div className="">
                                                    <Select
                                                        options={options}
                                                        value={selectedCountry}
                                                        onChange={
                                                            handleCountryChange
                                                        }
                                                        styles={customStyles}
                                                        className="w-[515px]  px-2 py-1 mt-[10px] rounded-md focus:outline-none focus:border-green-500 focus:outline-none"
                                                        placeholder="Country"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-[700px] mt-[10px] items-center justify-between">
                                            <h4>Email *</h4>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-[10px]">
                                            <h4>Company name*</h4>
                                            <input
                                                type="text"
                                                placeholder="Company name"
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                value={companyName}
                                                onChange={(e) =>
                                                    setCompanyName(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="flex w-[700px] items-center justify-between mt-[10px]">
                                            <h4>Address*</h4>
                                            <textarea
                                                className="w-[500px] border border-gray-400 rounded-md px-2 py-1 focus:border-green-500 focus:outline-none"
                                                value={address}
                                                onChange={(e) =>
                                                    setAddress(e.target.value)
                                                }
                                            ></textarea>
                                        </div>
                                        {/* Radio Buttons */}
                                        <div className="flex w-[350px] items-center justify-between mt-4"></div>

                                        <hr className="border-t-1 border-gray-300 mt-4" />

                                        {/* Buttons */}
                                        <div className="w-[700px] flex items-center justify-end mt-4">
                                            <button
                                                type="submit"
                                                className="px-4 h-[40px] py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
                                                disabled={loading} // লোডিং অবস্থায় বাটন ডিসেবল
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
                                                        Updating...
                                                    </div>
                                                ) : (
                                                    "Update"
                                                )}
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
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default clients;
