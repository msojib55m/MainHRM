import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileExcel,
    faFileCsv,
    faRotate,
    faEye,
    faEdit,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
const MainEmployList = () => {
    return (
        <div className="mt-[20px] ml-[15px]">
            <div className="flex align-center justify-between">
                {/* Page handler now one */}
                <div className="mt-[20px]">
                    <label className="flex items-center space-x-2 text-gray-700">
                        <span>Show</span>
                        <select className="border border-gray-300 rounded-md py-1 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="-1">All</option>
                        </select>
                        <span>entries</span>
                    </label>
                </div>
                {/* Page handler now one */}
                {/* download now Excel and Csv */}
                <div className="">
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
                </div>
                {/* download now Excel and Csv */}
                <div className="mt-[20px]">
                    <div className="flex align-center justify-center">
                        <div className="mt-[5px] mr-[3px]">
                            <label>Search :</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
                                placeholder="Search awards..."
                            />
                        </div>
                    </div>
                </div>
                {/* download now Excel and Csv */}
            </div>
            <div className="mt-[20px]">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="text-left">
                        <tr className="">
                            <th className="border border-gray-300 px-4 py-2">
                                Sl
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Employee id
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Name of employee
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Email
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Mobile no
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Date of birth
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Designation
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Joining date
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Joining date
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Status
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">
                                1
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                0001
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                John Doe
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                john@example.com
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                123-456-7890
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                123 Main St
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                NY
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                New York
                            </td>

                            <td className="border border-gray-300 px-4 py-2">
                                USA
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {" "}
                                Active
                            </td>
                            <td className="border border-gray-300 px-4 py-2 grid grid-cols-3">
                                <div className="w-[40px] h-[40px] inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                    <FontAwesomeIcon icon={faRotate} />
                                </div>
                                <div className="w-[40px] h-[40px] ml-[10px] inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    <FontAwesomeIcon icon={faEye} />
                                </div>
                                <div className="w-[40px] h-[40px]  ml-[15px] mr-[10px] inline-flex items-center px-3 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                    <FontAwesomeIcon icon={faEdit} />
                                </div>
                                <div className="w-[40px] h-[40px]  mt-[5px] inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainEmployList;
