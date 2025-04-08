<div className="flex flex-col items-center mt-[30px] max-w-[1200px] ">
    <div className="flex flex-row gap-6">
        {/* Employee Dropdown */}
        <div className="flex items-center justify-between w-[550px]">
            <div className="w-[150px]">
                <h4 className="mb-2">Requesting person *</h4>
            </div>

            <div className="w-[350px]" ref={dropdownRef}>
                <div
                    className="h-10 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedEmployee}
                </div>

                {isOpen && (
                    <div className="absolute mt-2 w-[350px] bg-white border rounded-lg shadow-lg z-10">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-[350px] h-10 px-3 py-1 text-gray-700 border border-gray-300 rounded-t-lg focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ul className="w-full h-40 overflow-y-auto">
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSelectedEmployee(employee);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {employee}
                                    </li>
                                ))
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

        {/* scound now */}
        <div className="flex items-center justify-between w-[550px]">
            <div className="w-[200px]">
                <h4 className="mb-2">Requesting department *</h4>
            </div>

            <div className="w-[350px]" ref={dropdownRefOne}>
                <div
                    className="h-10 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                    onClick={() => setIsOpenOne(!isOpenOne)}
                >
                    {selectedPosition}
                </div>

                {isOpenOne && (
                    <div className="absolute mt-2 w-[350px] bg-white border rounded-lg shadow-lg z-10">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-[350px] h-10 px-3 py-1 text-gray-700 border border-gray-300 rounded-t-lg focus:outline-none"
                            value={searchOne}
                            onChange={(e) => setSearchOne(e.target.value)}
                        />
                        <ul className="w-full h-40 overflow-y-auto">
                            {filteredPositions.length > 0 ? (
                                filteredPositions.map((position, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSelectedPosition(position);
                                            setIsOpenOne(false);
                                        }}
                                    >
                                        {position}
                                    </li>
                                ))
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
    <div className="flex flex-row gap-6 ">
        <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-[500px] mt-[10px]">
                <div>
                    <h1>ban</h1>
                </div>
                <div>
                    <input
                        type="text"
                        className="w-[350px] h-10 px-3 py-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none"
                    />
                </div>
            </div>
            <div className="flex items-center justify-between w-[500px] mt-[10px]">
                <div>
                    <h1>ban</h1>
                </div>
                <div>
                    <input
                        type="text"
                        className="w-[350px] h-10 px-3 py-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none"
                    />
                </div>
            </div>
        </div>
    </div>
</div>;
