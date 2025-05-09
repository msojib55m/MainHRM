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
const PointCategoriesOne = () => {
    // ustate
    const [addPoint, setPoint] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    // useEffect
    useEffect(() => {
        fetchCategories();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            category_name: categoryName,
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/pointCategories",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (response.ok) {
                // সফল হলে টেবিল রিফ্রেশ করবো
                setCategoryName(""); // form পরিষ্কার করে দেবো
                fetchCategories();
                setPoint(false);
            } else {
                alert("Failed to save category!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error saving the category.");
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/pointCategories"
            );
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    const [addEdit, setEdit] = useState(false);

    // কম্পোনেন্ট লোডে ডেটা লোড করুন
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            category_name: categoryName,
        };

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/pointCategories/${editId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (response.ok) {
                setCategoryName("");
                setEditId(null);
                setEdit(false); // modal বন্ধ
                fetchCategories(); // ✅ টেবিল রিফ্রেশ
                alert("Category updated successfully!");
            } else {
                alert("Failed to update category.");
            }
        } catch (error) {
            console.error("Error updating:", error);
            alert("An error occurred while updating.");
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/pointCategories/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    alert("Category deleted successfully!");
                    // Refresh the table or state after deletion
                    fetchCategories();
                } else {
                    alert("Failed to delete category!");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("There was an error deleting the category.");
            }
        }
    };
    const [searchQuery, setSearchQuery] = useState("");
    const filteredCategories = categories.filter((category) =>
        category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div>
            <div className="relative">
                <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                    {/* one start */}
                    <div class="flex items-center justify-between w-[auto] ">
                        <div>
                            <h6 class="text-lg font-semibold mb-0">
                                Point categories
                            </h6>
                        </div>
                        <div className="">
                            <button
                                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                                onClick={() => setPoint(true)}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <div className="ml-[5px]">New category</div>
                            </button>
                        </div>
                    </div>
                    {/* one Ends */}
                    {/* 2nd start  */}
                    <div class="mt-[20px]">
                        <hr />
                        <div class="flex justify-between items-center ">
                            {/* select data page */}
                            <div className="mt-[20px]  ">
                                <label className="text-sm font-medium text-[20px]">
                                    Show
                                    <select
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
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* search filed  */}
                        </div>
                        {/* 2nd  Ends */}
                        {/* 3rd now */}

                        <div className="mt-[20px] overflow-x-auto max-w-[12000px] mx-auto border rounded">
                            <table className="min-w-full table-auto border-collapse">
                                <thead className="text-left">
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            SL
                                        </th>
                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            Category name
                                        </th>

                                        <th className="border border-gray-300 px-2 py-1 text-sm">
                                            action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.length > 0 ? (
                                        filteredCategories.map(
                                            (category, index) => (
                                                <tr key={category.id}>
                                                    <td className="border border-gray-300 px-2 py-1 text-sm">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border border-gray-300 px-2 py-1 text-sm">
                                                        {category.category_name}
                                                    </td>
                                                    <td className="border px-2 py-1">
                                                        <button
                                                            className="bg-blue-300 text-blue-600 hover:bg-blue-200 rounded-md p-2 text-sm mx-1"
                                                            onClick={() => {
                                                                setEdit(true);
                                                                setEditId(
                                                                    category.id
                                                                );
                                                                setCategoryName(
                                                                    category.category_name
                                                                );
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
                                                                    category.id
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
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="text-center py-4 text-red-500"
                                            >
                                                Not Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* 3rd  Ends */}
                    </div>
                </div>
            </div>
            {addPoint && (
                <div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                            <form onSubmit={handleSubmit}>
                                <div className="mt-2">
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        New point category
                                    </h5>
                                    <div className="border-b border-gray-200 my-3"></div>
                                </div>
                                {/* category name */}
                                <div className="flex flex-col w-full sm:w-[100%]">
                                    <div>
                                        <label className="font-medium ">
                                            Category name*
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Category name"
                                        className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  mt-[20px]"
                                        value={categoryName}
                                        onChange={(e) =>
                                            setCategoryName(e.target.value)
                                        }
                                    />
                                </div>

                                {/* category name  */}
                                <div className="sticky">
                                    <div className="w-[850px] flex items-center justify-end mt-[20px] ml-[50px]">
                                        <button
                                            type="submit"
                                            className="px-4 h-[40px] py-2 rounded-md flex items-center justify-center bg-green-500 text-white"
                                        >
                                            save
                                        </button>

                                        <button
                                            type="button"
                                            className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                                            onClick={() => setPoint(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {/* secound */}
                        </div>
                    </div>
                </div>
            )}
            {addEdit && (
                <div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="w-[950px] bg-white p-4 rounded-lg shadow-lg z-50 relative max-h-[88vh] overflow-y-auto p-6 no-scrollbar scrollable-containe mt-[80px] mb-[30px]">
                            <form onSubmit={handleEditSubmit}>
                                <div className="mt-2">
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        Update point category
                                    </h5>
                                    <div className="border-b border-gray-200 my-3"></div>
                                </div>
                                {/* category name */}
                                <div className="flex flex-col w-full sm:w-[100%]">
                                    <div>
                                        <label className="font-medium ">
                                            Category name*
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Category name"
                                        className="border rounded px-3 py-2 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300  mt-[20px]"
                                        value={categoryName}
                                        onChange={(e) =>
                                            setCategoryName(e.target.value)
                                        }
                                    />
                                </div>

                                {/* category name  */}
                                <div className="sticky">
                                    <div className="w-[850px] flex items-center justify-end mt-[20px] ml-[50px]">
                                        <button
                                            type="submit"
                                            className="px-4 h-[40px] py-2 rounded-md flex items-center justify-center bg-green-500 text-white"
                                        >
                                            save
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
                            {/* secound */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PointCategoriesOne;
