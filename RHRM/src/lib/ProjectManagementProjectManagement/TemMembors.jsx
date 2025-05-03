import React from "react";

const TemMembors = () => {
    return (
        <div>
            <div className="relative">
                <div class="p-4  bg-white rounded-lg h-[auto] w-[auto] mt-[20px] ">
                    <div class="p-4  bg-white rounded-lg h-[auto] w-[auto]  ">
                        <div class="flex items-center justify-between w-[auto] ">
                            <div>
                                <h6 class="text-lg font-semibold mb-0">
                                    Team member report
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="mt-[20px]">
                        <hr />
                        <div className="flex items-center justify-between w-[450px]">
                            <div className="mt-5 ml-4 w-64 relative">
                                <div className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"></div>
                            </div>
                            <div className="mt-5 ml-4 w-64 relative">
                                <div className="block w-full h-10 px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"></div>
                            </div>
                            <div className="mt-5 ml-4 w-64 relative">
                                <button className="bg-green-500 w-[70px] h-[40px] rounded text-white">
                                    Find
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemMembors;
