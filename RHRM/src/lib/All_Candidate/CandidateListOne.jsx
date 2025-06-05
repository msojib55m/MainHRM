import React, { useEffect, useMemo, useState } from "react";
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
import axiosClient from "../../axiosClient";
const CandidateListOne = () => {
    const [showForm, setShowForm] = useState(false);
    const toggleView = () => {
        setShowForm((prev) => !prev);
        resetFormData();
    };
    // input filed setep now
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 fields
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        alternativePhone: "",
        ssn: "",
        presentAddress: "",
        Permanentaddress: "",
        country: "",
        city: "",
        zipCode: "",
        picture: "",

        // Step 2 fields
        obtainedDegree: "",
        university: "",
        cgpa: "",
        comments: "",

        // Step 3 fields
        companyName: "",
        workingPeriod: "",
        duties: "",
        supervisor: "",
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleNext = () => {
        if (step === 1) {
            const {
                firstName,
                lastName,
                email,
                phone,
                alternativePhone,
                ssn,
                presentAddress,
                Permanentaddress,
                country,
                city,
                zipCode,
                picture,
            } = formData;

            if (
                firstName &&
                lastName &&
                email &&
                phone &&
                alternativePhone &&
                ssn &&
                presentAddress &&
                Permanentaddress &&
                country &&
                city &&
                zipCode &&
                picture
            ) {
                setStep(2);
            } else {
                alert("Please fill all fields in Step 1.");
            }
        } else if (step === 2) {
            const { obtainedDegree, university, cgpa, comments } = formData;

            if (obtainedDegree && university && cgpa && comments) {
                setStep(3);
            } else {
                alert("Please fill all fields in Step 2.");
            }
        }
    };

    // react to laravel and laravel to mysql store now
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    // Step 1
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("alternativePhone", formData.alternativePhone);
    data.append("ssn", formData.ssn);
    data.append("presentAddress", formData.presentAddress);
    data.append("Permanentaddress", formData.Permanentaddress);
    data.append("country", formData.country);
    data.append("city", formData.city);
    data.append("zipCode", formData.zipCode);
    if (formData.picture) {
        data.append("picture", formData.picture);
    }

    // Step 2
    data.append("obtainedDegree", formData.obtainedDegree);
    data.append("university", formData.university);
    data.append("cgpa", formData.cgpa);
    data.append("comments", formData.comments);

    // Step 3 (যদি থাকে)
    data.append("companyName", formData.companyName);
    data.append("workingPeriod", formData.workingPeriod);
    data.append("duties", formData.duties);
    data.append("supervisor", formData.supervisor);

    try {
        const response = await axiosClient.post(
            "/candidatesNameAll",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        fetchProjects();
        resetFormData();
        setSubmitted(true);
        alert("Form submitted successfully!");
    } catch (err) {
        if (err.response) {
            // Laravel validation বা অন্যান্য error
            console.error("Server Error:", err.response.data);
        } else if (err.request) {
            // Request গেছে কিন্তু response আসেনি
            console.error("No response from server:", err.request);
        } else {
            // অন্য কোনো error
            console.error("Request setup error:", err.message);
        }

        // পুরো error দেখুন
        console.log("Full error:", err);
    } finally {
        setLoading(false);
    }
};


    // data
    const [candidates, setCandidates] = useState([]);
    const fetchProjects = async () => {
        setLoadingTable(true); // start loading
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/candidates");
            setCandidates(res.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoadingTable(false); // stop loading
        }
    };
    useEffect(() => {
        fetchProjects();
    }, []);

    // loding add now
    const [loadingTable, setLoadingTable] = useState(true);

    const [edit, setEdit] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleEdit = (item) => {
        setFormData({
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phone: item.phone,
            ssn: item.ssn,
            id: item.id, // নিশ্চিত করুন যে ID সহ সমস্ত তথ্য পাঠাচ্ছেন
        });
        setEdit(true); // Edit ফর্ম চালু
    };

    const resetFormData = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            alternativePhone: "",
            ssn: "",
            presentAddress: "",
            Permanentaddress: "",
            country: "",
            city: "",
            zipCode: "",
            picture: "",

            // Step 2 fields
            obtainedDegree: "",
            university: "",
            cgpa: "",
            comments: "",

            // Step 3 fields
            companyName: "",
            workingPeriod: "",
            duties: "",
            supervisor: "",
        });
    };
    // ফর্ম রিসেট করার ফাংশন

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/candidates/${formData.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (!response.ok) throw new Error("Update failed");

            const updatedCandidate = await response.json();

            // Update list
            setCandidates((prev) =>
                prev.map((c) =>
                    c.id === updatedCandidate.id ? updatedCandidate : c
                )
            );
            fetchProjects();
            resetFormData();
            setEdit(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const [deleting, setDeleting] = useState(false);
    const handleDelete = async (id) => {
        setDeleting(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/CandidateId/${id}`);
            fetchProjects();
        } catch (error) {
            console.error(
                "Error deleting vendor:",
                error.response?.data || error.message
            );
            alert("Failed to delete Candidate.");
        } finally {
            setDeleting(false);
        }
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [searching, setSearching] = useState(false);
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSearching(true);
        setTimeout(() => setSearching(false), 500);
    };
    const filteredProjects = candidates.filter(
        (item) =>
            item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.ssn.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const handlePage = (e) => {
        setEntriesPerPage(Number(e.target.value));
    };
    return (
        <div>
            <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                {/* number Header: 1 */}
                <div class="flex items-center justify-between w-[auto] ">
                    <div>
                        <h6 class="text-lg font-semibold mb-0">
                            {showForm ? "Employee Candidate" : "Candidate List"}
                        </h6>
                    </div>
                    <div className="">
                        <button
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                            onClick={toggleView}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <div className="ml-[5px]">
                                {showForm
                                    ? "Candidate List"
                                    : "Add New Candidate"}
                            </div>
                        </button>
                    </div>
                </div>
                {/* number Header: 1 */}
                {/* number : 2 */}
                {showForm ? (
                    <div class="mt-[20px]">
                        <hr />
                        <form action="" onSubmit={handleSubmit}>
                            {/* step 1 */}
                            {step === 1 && (
                                <div>
                                    <div className="mt-2">
                                        <h5 className="text-lg font-semibold text-gray-800">
                                            Basic information:
                                        </h5>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-[20px]">
                                        {/* First Name */}

                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                First name *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter first name"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Last Name */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter last name"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Enter email address"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Phone *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter phone number"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Alternative Phone */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Alternative phone
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter alternative phone"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="alternativePhone"
                                                value={
                                                    formData.alternativePhone
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* SSN */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                SSN
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter SSN"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="ssn"
                                                value={formData.ssn}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Present Address */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Present address
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter present address"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="presentAddress"
                                                value={formData.presentAddress}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Permanent Address */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Permanent address
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter permanent address"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="Permanentaddress"
                                                value={
                                                    formData.Permanentaddress
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Country */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Country
                                            </label>
                                            <select
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                value={formData.country}
                                                name="country"
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select country
                                                </option>
                                                <option>USA</option>
                                                <option>Bangladesh</option>
                                                <option>UK</option>
                                            </select>
                                        </div>

                                        {/* City */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter city"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Zip Code */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Zip code
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter zip code"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Picture Upload */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Picture
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="picture"
                                                onChange={handleChange} // এখানে আপনি ফাইল ধরবেন
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="w-[80px] mr-[40px] h-[40px] bg-green-500 rounded text-white"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* step 2 */}
                            {step === 2 && (
                                <div>
                                    <div className="mt-2">
                                        <h5 className="text-lg font-semibold text-gray-800">
                                            Educational information:
                                        </h5>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-[20px]">
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Obtained degree
                                            </label>
                                            <input
                                                type="text"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="obtainedDegree"
                                                value={formData.obtainedDegree}
                                                onChange={handleChange}
                                                placeholder="Obtained Degree"
                                            />
                                        </div>
                                        {/* numer 2 */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                University
                                            </label>
                                            <input
                                                type="text"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="university"
                                                value={formData.university}
                                                onChange={handleChange}
                                                placeholder="University"
                                            />
                                        </div>
                                        {/* number 3  */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Cgpa
                                            </label>
                                            <input
                                                type="text"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="cgpa"
                                                value={formData.cgpa}
                                                onChange={handleChange}
                                                placeholder="CGPA"
                                            />
                                        </div>
                                        {/* number 4 */}
                                        {/* number 3  */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            <label className="font-medium mb-1">
                                                Comments
                                            </label>
                                            <textarea
                                                name="comments"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                value={formData.comments}
                                                onChange={handleChange}
                                                placeholder="Comments"
                                            ></textarea>
                                        </div>
                                        {/* number 4 */}
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="w-[80px] mr-[40px] h-[40px] bg-green-500 rounded text-white"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* step 3 */}
                            {step === 3 && (
                                <div>
                                    <div className="mt-2">
                                        <h5 className="text-lg font-semibold text-gray-800">
                                            Past experience:
                                        </h5>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-[20px]">
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            {/* one */}
                                            <label className="font-medium mb-1">
                                                Company name
                                            </label>
                                            <input
                                                type="text"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                placeholder="Company Name"
                                            />
                                        </div>
                                        {/* two */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            {/* one */}
                                            <label className="font-medium mb-1">
                                                Working period
                                            </label>
                                            <input
                                                type="text"
                                                name="workingPeriod"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                value={formData.workingPeriod}
                                                onChange={handleChange}
                                                placeholder="Working Period"
                                            />
                                        </div>
                                        {/* three */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            {/* one */}
                                            <label className="font-medium mb-1">
                                                Duties
                                            </label>
                                            <textarea
                                                name="duties"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                value={formData.duties}
                                                onChange={handleChange}
                                                placeholder="Duties"
                                            ></textarea>
                                        </div>
                                        {/* number 4 */}
                                        <div className="flex flex-col w-full sm:w-[48%]">
                                            {/* one */}
                                            <label className="font-medium mb-1">
                                                Supervisor
                                            </label>
                                            <input
                                                type="text"
                                                className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                                name="supervisor"
                                                value={formData.supervisor}
                                                onChange={handleChange}
                                                placeholder="Supervisor"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="bg-green-500 text-white px-4 py-1"
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
                                </div>
                            )}
                        </form>
                    </div>
                ) : (
                    <div class="mt-[20px]">
                        <hr />
                        <div class="flex justify-between items-center ">
                            {/* select data page */}
                            <div className="mt-[20px]  ">
                                <label className="text-sm font-medium text-[20px]">
                                    Show
                                    <select
                                        name="entries"
                                        className="    p-2 
                                                     border border-gray-300 
                                                     rounded-md 
                                                     focus:outline-none 
                                                     focus:ring-2 focus:ring-green-500 
                                                     focus:border-green-500 
                                                     appearance-none 
                                                     h-[40px] 
                                                     ml-[10px] 
                                                     mr-[10px]"
                                        value={entriesPerPage}
                                        onChange={handlePage}
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
                                            className="w-[300px] ml-[20px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* search filed  */}
                        </div>

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
                                    Deleting Tasks...
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
                                            Name
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Candidate id
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Email address
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Ssn
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Phone
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
                                    ) : filteredProjects.length > 0 ? (
                                        filteredProjects
                                            .slice(0, entriesPerPage)
                                            .map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="border px-2 py-1">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border px-2 py-1">
                                                        {item.firstName}{" "}
                                                        {item.lastName}
                                                    </td>
                                                    <td className="border px-2 py-1">
                                                        {item.id}
                                                    </td>
                                                    <td className="border px-2 py-1">
                                                        {item.email}
                                                    </td>
                                                    <td className="border px-2 py-1">
                                                        {item.ssn}
                                                    </td>
                                                    <td className="border px-2 py-1">
                                                        {item.phone}
                                                    </td>
                                                    <td className="border px-2 py-1">
                                                        <button
                                                            className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                            />
                                                        </button>
                                                        <button
                                                            className="bg-red-300 text-red-600 hover:bg-red-200 rounded-md p-2 text-sm mx-1"
                                                            onClick={() => {
                                                                handleDelete(
                                                                    item.id
                                                                );
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="text-center py-6 text-gray-500"
                                            >
                                                No results found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            {edit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                        <h2 className="text-lg font-bold mb-2 text-yellow-800">
                            Edit Candidate
                        </h2>

                        <form
                            onSubmit={handleUpdate}
                            className="grid grid-cols-2 gap-4"
                        >
                            <input
                                type="text"
                                name="firstName"
                                className="border p-2"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                className="border p-2"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                className="border p-2"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="phone"
                                className="border p-2"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="ssn"
                                className="border p-2"
                                value={formData.ssn}
                                onChange={handleChange}
                            />

                            <div className="col-span-2 flex justify-end gap-4">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500"
                                >
                                    {loading ? "Updating..." : "Update"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEdit(false)} // Cancel action
                                    className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateListOne;
