{
    AddSalaryAdvance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background Overlay */}
            <div className="fixed inset-0 bg-black opacity-50"></div>

            {/* Position Form */}
            <div className="w-[800px] bg-white p-4 rounded-lg shadow-lg z-50 relative">
                <h5 className="text-lg font-semibold">Add salary advance</h5>
                <hr className="border-t-1 border-gray-300 mt-2" />

                {/* Input Fields */}
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <div className="flex w-[700px] items-center justify-between">
                            <h4>Employee*</h4>
                            <div className="flex items-center justify-between w-[498px]">
                                <div
                                    className="mt-5  w-64 relative"
                                    ref={dropdownRef}
                                >
                                    {/* Select Box */}
                                    <div
                                        className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        {selectedEmployee}
                                    </div>

                                    {/* Dropdown */}
                                    {isOpen && (
                                        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                                                value={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                            />
                                            <ul className="w-full h-40 overflow-y-auto">
                                                {filteredEmployees.length >
                                                0 ? (
                                                    filteredEmployees.map(
                                                        (employee, index) => (
                                                            <li
                                                                key={index}
                                                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                onClick={() => {
                                                                    setSelectedEmployee(
                                                                        employee
                                                                    );
                                                                    setIsOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                {employee}
                                                            </li>
                                                        )
                                                    )
                                                ) : (
                                                    <li className="px-4 py-2 text-gray-500">
                                                        No results found
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Notice Description */}
                        <div className="flex w-[700px] items-center justify-between mt-4">
                            <div>
                                <h4>Notice descriptiion*</h4>
                            </div>
                            <div className="flex items-center justify-between w-[498px]">
                                <input
                                    type="text"
                                    className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                    placeholder="Amount"
                                    value={noticeDescription}
                                    onChange={(e) =>
                                        setNoticeDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {/* Salary Month */}
                        <div className="flex w-[700px] items-center justify-between mt-4">
                            <div>
                                <h4>Salary month *</h4>
                            </div>
                            <div className="flex items-center justify-between w-[498px]">
                                <input
                                    type="date"
                                    className="w-[500px] h-10 px-2 py-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                    placeholder="----"
                                    onFocus={(e) => e.target.showPicker()}
                                    value={salaryMonth}
                                    onChange={(e) =>
                                        setSalaryMonth(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {/* active selected start */}

                        <div className="flex w-[700px] items-center justify-between mt-4">
                            <h4>Is active *</h4>
                            <div className="flex flex-col w-[498px]">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="is_active"
                                        value="active"
                                        checked={isActive === "active"}
                                        onChange={() => setIsActive("active")}
                                    />
                                    <span>Active</span>
                                </label>
                                <label className="flex items-center space-x-2 mt-2">
                                    <input
                                        type="radio"
                                        name="is_active"
                                        value="inactive"
                                        checked={isActive === "inactive"}
                                        onChange={() => setIsActive("inactive")}
                                    />
                                    <span>Inactive</span>
                                </label>
                            </div>
                        </div>

                        {/* active selected end */}
                        {/* Buttons */}
                        <div className="w-[700px] flex items-center justify-end mt-4">
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
                                ) : (
                                    "Save"
                                )}
                            </button>
                            <button
                                type="button"
                                className="px-4 h-[40px] py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                                onClick={() => setAddSalaryAdvance(false)}
                                disabled={loading} // ক্লোজ বাটনও ডিসেবল হবে যখন লোডিং চলবে
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
