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
const Tasks = () => {
    const [tasks, setTaks] = useState(false);
    // state
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        project_name: "",
        client_name: "",
        project_lead: "",
        task_count: "",
        project_duration: "",
    });
    const [loadingTable, setLoadingTable] = useState(true);
    const [loading, setLoading] = useState(false);
    // state

    // handle input change
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            await axios.post("http://127.0.0.1:8000/api/projects", formData);
            fetchProjects(); // রিফ্রেশ টেবিল

            clearForm();
            setTaks(false);
        } catch (error) {
            console.error("Error posting project", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    const fetchProjects = async () => {
        setLoadingTable(true); // start loading
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/projects");
            setProjects(res.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoadingTable(false); // stop loading
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);
    // edit now
    const [edit, setEdit] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState(null);
    const handleEdit = (project) => {
        setSelectedTasks(project);
        setFormData({
            project_name: project.project_name,
            client_name: project.client_name,
            project_lead: project.project_lead,
            task_count: project.task_count,
            project_duration: project.project_duration,
        });
        setEdit(true);
    };
    const openAddModal = () => {
        clearForm();
        setTaks(true);
    };
    // 🔄 Clear form
    const clearForm = () => {
        setFormData({
            project_name: "",
            client_name: "",
            project_lead: "",
            task_count: "",
            project_duration: "",
        });
        setSelectedTasks(null);
    };
    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/updateTaks/${selectedTasks.id}`,
                formData
            );
            fetchProjects();
            clearForm();
            setEdit(false);
        } catch (error) {
            console.error(
                "Error updating vendor:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };
    // loading
    const [deleting, setDeleting] = useState(false);
    const handleDelete = async (id) => {
        setDeleting(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/TasksId/${id}`);
            fetchProjects();
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
    // search Now input filed
    const [searchTerm, setSearchTerm] = useState("");
    const [searching, setSearching] = useState(false);
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSearching(true);
        setTimeout(() => setSearching(false), 500);
    };
    const filteredProjects = projects.filter(
        (project) =>
            project.project_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            project.client_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            project.project_lead
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );
    // page now ad
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    return (
        <div className="relative">
            <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                {/* number Header: 1 */}
                <div class="flex items-center justify-between w-[auto] ">
                    <div>
                        <h6 class="text-lg font-semibold mb-0">Manage tasks</h6>
                    </div>
                    <div className="">
                        <button
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                            onClick={openAddModal}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <div className="ml-[5px]">Add tasks</div>
                        </button>
                    </div>
                </div>
                {/* number Header: 1 */}
                {/* number : 2 */}
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
                                        Project name
                                    </th>

                                    <th className="border border-gray-300 px-2 py-1 text-sm">
                                        Client name
                                    </th>

                                    <th className="border border-gray-300 px-2 py-1 text-sm">
                                        Project lead
                                    </th>

                                    <th className="border border-gray-300 px-2 py-1 text-sm">
                                        Approximate tasks
                                    </th>
                                    <th className="border border-gray-300 px-2 py-1 text-sm">
                                        Project duration
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
                                ) : filteredProjects.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="text-center py-4"
                                        >
                                            No projects found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProjects
                                        .slice(0, entriesPerPage)
                                        .map((project, index) => (
                                            <tr key={project.id}>
                                                <td className="border px-2 py-1">
                                                    {index + 1}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {project.project_name}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {project.client_name}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {project.project_lead}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {project.task_count}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {project.project_duration}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <button
                                                        className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                        onClick={() =>
                                                            handleEdit(project)
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
                                                                project.id
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
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {tasks && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                        <h5 className="text-lg font-semibold">Add Taks</h5>

                        <form onSubmit={handleSubmit}>
                            <div className="sticky">
                                {/* name */}
                                <div className="flex mt-[20px] ">
                                    <div>
                                        <h4> Project name</h4>
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[100px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Project name "
                                            name="project_name"
                                            value={formData.project_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* number */}
                                <div className="flex mt-[20px]">
                                    <div>
                                        <h4> Client name</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[106px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Client name"
                                            name="client_name"
                                            value={formData.client_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Email address  */}
                                <div className="flex mt-[20px]">
                                    <div className="ml-[5px]">
                                        <h4> Project lead</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[100px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Project lead  "
                                            name="project_lead"
                                            value={formData.project_lead}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Address * */}
                                <div className="flex mt-[20px] ">
                                    <div className="ml-[5px]">
                                        <h4> Approximate tasks</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            className="w-[650px] ml-[54px]  h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Approximate tasks"
                                            name="task_count"
                                            value={formData.task_count}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* City name */}
                                <div className="flex mt-[20px] ">
                                    <div>
                                        <h4> Project duration</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[75px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="  Project duration "
                                            name="project_duration"
                                            value={formData.project_duration}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="w-[790px] flex items-center justify-end mt-[20px] ml-[50px]">
                                    <button
                                        type="submit"
                                        className={`px-4 h-[40px] py-2 rounded-md flex items-center justify-center 
                                        ${
                                            loading
                                                ? "bg-blue-300 cursor-not-allowed"
                                                : "bg-blue-500 hover:bg-blue-600"
                                        } 
                                        text-white`}
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
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8z"
                                                    />
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
                                        onClick={() => setTaks(false)}
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
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                        <h5 className="text-lg font-semibold">Add Taks</h5>

                        <form onSubmit={handleUpdate}>
                            <div className="sticky">
                                {/* name */}
                                <div className="flex mt-[20px] ">
                                    <div>
                                        <h4> Project name</h4>
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[100px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Project name "
                                            name="project_name"
                                            value={formData.project_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* number */}
                                <div className="flex mt-[20px]">
                                    <div>
                                        <h4> Client name</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[106px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Client name"
                                            name="client_name"
                                            value={formData.client_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Email address  */}
                                <div className="flex mt-[20px]">
                                    <div className="ml-[5px]">
                                        <h4> Project lead</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[100px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder=" Project lead  "
                                            name="project_lead"
                                            value={formData.project_lead}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Address * */}
                                <div className="flex mt-[20px] ">
                                    <div className="ml-[5px]">
                                        <h4> Approximate tasks</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            className="w-[650px] ml-[54px]  h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Approximate tasks"
                                            name="task_count"
                                            value={formData.task_count}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* City name */}
                                <div className="flex mt-[20px] ">
                                    <div>
                                        <h4> Project duration</h4>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-[650px] ml-[75px] h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="  Project duration "
                                            name="project_duration"
                                            value={formData.project_duration}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="w-[790px] flex items-center justify-end mt-[20px] ml-[50px]">
                                    <button
                                        type="submit"
                                        className={`px-4 h-[40px] py-2 rounded-md flex items-center justify-center 
                                        ${
                                            loading
                                                ? "bg-blue-300 cursor-not-allowed"
                                                : "bg-blue-500 hover:bg-blue-600"
                                        } 
                                        text-white`}
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
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8z"
                                                    />
                                                </svg>
                                                Processing...
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

export default Tasks;
