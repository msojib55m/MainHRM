<div className="flex items-center">
    <label className="font-medium text-gray-700">Name of Employee:</label>
    <div className="ml-4 relative" ref={dropdownRef}>
        <input
            type="text"
            className="border border-gray-400 focus:border-green-500 focus:outline-none p-2 rounded w-64 cursor-pointer  bg-white"
            placeholder="Select Employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            onClick={() => setIsOpen(!isOpen)}
            readOnly
        />
        {isOpen && (
            <ul className="absolute left-0 w-full bg-white border border-gray-400 rounded mt-1 max-h-48 overflow-y-auto z-10 shadow-lg">
                {employees.map((employee, index) => (
                    <li
                        key={index}
                        className="p-3 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                            setSelectedEmployee(employee);
                            setSelectedEmployeeId(employee.id);
                            // Directly set employee name
                            setIsOpen(false);
                        }}
                    >
                        {employee}
                    </li>
                ))}
            </ul>
        )}
    </div>
</div>;
