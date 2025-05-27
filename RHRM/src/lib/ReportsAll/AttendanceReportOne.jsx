import React from "react";
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
const AttendanceReportOne = () => {
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
                            <div className="flex bg-green-600 h-[40px] items-center p-3 cursor-pointer">
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
                            <div className="mt-[20px]  ">
                                <label className="text-sm font-medium text-[20px]">
                                    Show
                                    <select className="    p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none h-[40px] ml-[10px] mr-[10px]">
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

                            {/* card Two */}
                            {/* card Three */}
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
                                        />
                                    </div>
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
                                        Employee
                                    </th>
                                    <th
                                        title="Award description"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Date
                                    </th>
                                    <th
                                        title="Gift item"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        In Time
                                    </th>
                                    <th
                                        title="Date"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Out Time
                                    </th>
                                    <th
                                        title="Employee name"
                                        className="px-3 py-2 border-b border-gray-300"
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-left"></tbody>
                        </table>
                    </div>
                    {/* table end */}
                </div>
            </div>
        </div>
    );
};

export default AttendanceReportOne;
