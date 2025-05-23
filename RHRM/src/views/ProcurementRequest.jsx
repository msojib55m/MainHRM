import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
// fontawesome Icon start
// custome Image
import {
    faBars,
    faUser,
    faChevronLeft,
    faHouse,
    faBath,
    faMicrochip,
    faAward,
    faUniversity,
    faUsers,
    faPlane,
    faCreditCard,
    faBell,
    faIndustry,
    faListCheck,
    faNewspaper,
    faStar,
    faMessage,
    faGear,
    faMagnifyingGlassPlus,
    faChevronDown,
    faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

// fontawesome Icon Ends
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/Contextsprovider";
import axiosClient from "../axiosClient";
import Request from "../lib/All_Procurement/Request";
// try navbar toggle
// try navbar toggle
// show navbar

// hide
const pictures = [
    "https://hrm.bdtask-demoserver.com/storage/application/1716900096sidebar-logo.png",
    "https://hrm.bdtask-demoserver.com/storage/application/1716900212sidebar-collapsed-logo.png",
];

const ProcurementRequest = () => {
    const { user, token, setUser, setToken } = useStateContext();
    if (!token) {
        return <Navigate to="login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get("/logout").then(({}) => {
            setUser(null);
            setToken(null);
        });
    };
    const [open, setOpen] = useState(false);
    const [slidvarOpen, SetSlidvarOpen] = useState(true);
    const [nabVarOpen, setVarOpen] = useState(true);
    const [show, setShow] = useState(false);
    // media query

    // media query
    // hide
    const [pictureIdx, setPictureIdx] = useState(0);
    // try
    // navbar start
    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    // problem

    // problem
    // navbar End
    // close start
    const CloseNow = (e) => {
        e.preventDefault();
        setOpen(!open);
    };
    const toggleDropdown = () => {
        open ? setOpen(false) : toggleDropdown();
    };

    const Menu = () => {
        SetSlidvarOpen(!slidvarOpen);
        setVarOpen(!nabVarOpen);
        setPictureIdx((prevIdx) => {
            return (prevIdx + 1) % pictures.length;
        });
    };

    // search input work
    const [searchInput, SetSearchInput] = useState("");
    const datatableUsers = [
        {
            id: 1,
            icon1: faUser,
            name: "Attendance",
            icon2: faChevronLeft,
            links: [
                { label: "Attendance form", path: "/attendance" },
                { label: "Monthly attendance", path: "/attendance/monthly" },
                { label: "Missing attendance", path: "/attendance/missing" },
            ],
        },
        {
            id: 2,
            icon1: faAward,
            name: "Award",
            icon2: faChevronLeft,
            links: [{ label: "Award List", path: "/award/list" }],
        },
        {
            id: 3,
            icon1: faUniversity,
            name: "Department",
            icon2: faChevronLeft,
            links: [
                { label: "Department", path: "/department/main" },
                { label: "Sub Department", path: "/department/sub" },
            ],
        },
        {
            id: 4,
            icon1: faUsers,
            name: "Employee",
            icon2: faChevronLeft,
            links: [
                { label: "Position", path: "/employee/position" },
                { label: "Sub Employee", path: "/employee/sub" },
                {
                    label: "Employee performance",
                    path: "/employee/performance",
                },
            ],
        },
        {
            id: 5,
            icon1: faPlane,
            name: "Leave",
            icon2: faChevronLeft,
            links: [
                { label: "Weekly holiday", path: "/leave/weekly-holiday" },
                { label: "Holiday", path: "/leave/holiday" },
                { label: "Leave application", path: "/leave/application" },
            ],
        },
        {
            id: 6,
            icon1: faCreditCard,
            name: "Loan",
            icon2: faChevronLeft,
            links: [
                { label: "Loan list", path: "/loan/list" },
                {
                    label: "Loan disburse report",
                    path: "/loans-report-loan_disburse_report",
                },
                {
                    label: "Employee wise loan",
                    path: "/loans-report/employee",
                },
            ],
        },
        {
            id: 7,
            icon1: faBell,
            name: "Notice board",
            icon2: faChevronLeft,
            links: [{ label: "Notic", path: "/notice/notices" }],
        },
        {
            id: 8,
            icon1: faCreditCard,
            name: "Payroll",
            icon2: faChevronLeft,
            links: [
                { label: "Salary advance", path: "/payroll/salary-advance" },
                { label: "Salary generate", path: "/payroll/salary-generate" },
                {
                    label: "Manage employee salary",
                    path: "/payroll/manage-salaries",
                },
            ],
        },
        {
            id: 9,
            icon1: faIndustry,
            name: "Procurement",
            icon2: faChevronLeft,
            links: [
                { label: "Request", path: "/procurement_request" },
                { label: "Quotation", path: "/hr/quotation" },
                { label: "Bid analysis", path: "/hr/bid" },
                { label: "Purchase order", path: "/hr/purchase" },
                { label: "Goods received", path: "/hr/goods" },
                { label: "Vendors", path: "/hr/vendor" },
                { label: "Committess", path: "/hr/committee" },
                { label: "Units", path: "/hr/units" },
            ],
        },
        {
            id: 10,
            icon1: faListCheck,
            name: "Project management",
            icon2: faChevronLeft,
            links: [
                { label: "Clients", path: "/project/clients" },
                { label: "Projects", path: "/project/projects" },
                { label: "Manage tasks", path: "/project/manage_tasks" },
                { label: "Reports", path: "/project/reports" },
                { label: "Team members", path: "/project/team_member_search" },
            ],
        },
        {
            id: 11,
            icon1: faNewspaper,
            name: "Recruitment",
            icon2: faChevronLeft,
            links: [
                { label: "Candidate list", path: "/hr/recruitment" },
                { label: "Candidate shortlist", path: "/hr/shortlist" },
                { label: "Interview", path: "/hr/interview" },
                { label: "Candidate selection", path: "/hr/selection" },
            ],
        },
        {
            id: 12,
            icon1: faIndustry,
            name: "Reports",
            icon2: faChevronLeft,
            links: [
                {
                    label: "Attendance report",
                    path: "/hr/reports/daily-present",
                },
                { label: "Leave report", path: "/hr/reports/leave" },
                { label: "Employee reports", path: "/hr/reports/employee" },
                { label: "Payroll", path: "/hr/reports/payroll" },
                { label: "Adhoc report", path: "/hr/reports/adhoc-advance" },
            ],
        },
        {
            id: 13,
            icon1: faStar,
            name: "Reward points",
            icon2: faChevronLeft,
            links: [
                { label: "Point settings", path: "/reward/point-settings" },
                { label: "Point categories", path: "/reward/point-categories" },
                {
                    label: "Management points",
                    path: "/reward/management-points",
                },
                {
                    label: "Collaborative points",
                    path: "/reward/collaborative-points",
                },
                {
                    label: "Attendance points",
                    path: "/reward/attendance-points",
                },
                { label: "Employee points", path: "/reward/employee-points" },
            ],
        },
        {
            id: 14,
            icon1: faMessage,
            name: "Setup Rules",
            icon2: faChevronLeft,
            links: [{ label: "Rules", path: "/hr/setup-rules" }],
        },
        {
            id: 15,
            icon1: faGear,
            name: "Settings",
            icon2: faChevronLeft,
            links: [
                { label: "Currency", path: "/Currency/Now" },
                { label: "Mail setup", path: "/Mail/setup" },
            ],
        },
        {
            id: 16,
            icon1: faMessage,
            name: "Message",
            icon2: faChevronLeft,
            links: [
                { label: "New", path: "/message/new" },
                { label: "Inbox", path: "/message/new" },
                { label: "Sent", path: "/message/sent" },
            ],
        },
    ];

    const FilteredData = () => {
        return datatableUsers.filter((user) =>
            user.name.toLowerCase().includes(searchInput.toLowerCase())
        );
    };
    //search input work
    // slidebar open active now
    const location = useLocation();
    const [openIndex, setOpenIndex] = useState(null);
    const toggleMenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // open  active navbar
    useEffect(() => {
        FilteredData().forEach((data, index) => {
            data.links.forEach((link) => {
                if (location.pathname === link.path) {
                    setOpenIndex(index);
                }
            });
        });
    }, [location.pathname, searchInput]);
    // slidebar open active now
    // try
    // dashbord

    // dashbord
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);
    // Togle or NavTogle now
    // Togle or NavTogle End
    // attendance now
    // link active now

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Add request</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div
                className=" bg-gray-300"
                id="DashbordNow"
                onClick={toggleDropdown}
            >
                <div className="w-full bg-white flex items-center justify-between fixed top-0  left-0 z-[1000] h-[auto] shadow-[0px_1px_6px_0px_rgba(0,_0,_0,_0.1)]  pr-[10px]">
                    <div className=" flex items-center justify-center text-center text-[24px]">
                        <div
                            className={`${
                                nabVarOpen
                                    ? " bg-slate-100 w-[254px] h-[65px] cursor-pointer"
                                    : ""
                            } duration-300`}
                        >
                            {/* bg-slate-100 w-[254px] h-[65px] cursor-pointer */}
                            <div className="flex justify-center mt-2">
                                <img
                                    id="image1"
                                    src={pictures[pictureIdx]}
                                    alt=""
                                    className={`${
                                        nabVarOpen
                                            ? "w-[156px]  h-[40px] w-[136px] mt-[5px]"
                                            : "w-[30px] h-[40px] mt-[5px]"
                                    }  `}
                                />
                            </div>
                        </div>

                        {/* try */}
                        {/* try */}
                        <div
                            className="w-[62px] h-[65px] leading-[65px] cursor-pointer"
                            // onClick={() => SetSlidvarOpen(!slidvarOpen)}
                            onClick={Menu}
                            id="temp2"
                        >
                            <FontAwesomeIcon
                                className="text-gray-300"
                                icon={faBars}
                            />
                        </div>
                        {/* try */}

                        {/* try */}
                        {show ? (
                            <div className="bg-slate-100 text-green-700 pl-[10px] pr-[10px] pt-[4px] pb-[4px]">
                                <div
                                    className="flex items-center cursor-pointer nav CacheClear"
                                    id="Caheclear"
                                >
                                    <FontAwesomeIcon
                                        className=""
                                        icon={faBath}
                                    />
                                    <h1 className="text-[18px] ml-[10px]">
                                        Cache clear
                                    </h1>
                                </div>
                            </div>
                        ) : null}

                        <div className="flex bg-slate-100 text-green-700 pl-[10px] pr-[10px] pt-[4px] pb-[4px] box">
                            <div
                                className="flex items-center cursor-pointer"
                                id="Caheclear"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="26"
                                    height="26"
                                    viewBox="0 0 26 26"
                                    fill="none"
                                >
                                    <path
                                        d="M0.925 13.0005C0.925 19.6585 6.342 25.075 13.0005 25.075C13.3074 25.075 13.5555 24.8263 13.5555 24.52C13.5555 24.2136 13.3074 23.965 13.0005 23.965C6.95381 23.965 2.03504 19.0462 2.03504 13.0005C2.03504 6.9543 6.95382 2.03504 13.0005 2.03504C19.0467 2.03504 23.965 6.95429 23.965 13.0005C23.965 13.3068 24.2131 13.5555 24.52 13.5555C24.8269 13.5555 25.075 13.3068 25.075 13.0005C25.075 6.342 19.6585 0.925 13.0005 0.925C6.34199 0.925 0.925 6.34199 0.925 13.0005Z"
                                        fill="#188753"
                                        stroke="#188753"
                                        stroke-width="0.15"
                                    />
                                    <path
                                        d="M7.24125 20.2744H18.7607C19.0677 20.2744 19.3158 20.0257 19.3158 19.7194V12.0386C19.3158 11.7323 19.0677 11.4836 18.7607 11.4836H7.24125C6.93433 11.4836 6.68623 11.7323 6.68623 12.0386V19.7194C6.68623 20.0257 6.93433 20.2744 7.24125 20.2744ZM18.2057 12.5936V19.1644H7.79627V12.5936H18.2057Z"
                                        fill="#188753"
                                        stroke="#188753"
                                        stroke-width="0.15"
                                    />
                                    <path
                                        d="M12.4465 19.7194C12.4465 20.0258 12.6946 20.2745 13.0015 20.2745C13.3084 20.2745 13.5565 20.0258 13.5565 19.7194V17.7994C13.5565 17.493 13.3084 17.2443 13.0015 17.2443C12.6946 17.2443 12.4465 17.493 12.4465 17.7994V19.7194Z"
                                        fill="#188753"
                                        stroke="#188753"
                                        stroke-width="0.15"
                                    />
                                    <path
                                        d="M15.3247 19.7193C15.3247 20.0257 15.5728 20.2744 15.8797 20.2744C16.1866 20.2744 16.4347 20.0257 16.4347 19.7193V15.8792C16.4347 15.5728 16.1866 15.3242 15.8797 15.3242C15.5728 15.3242 15.3247 15.5728 15.3247 15.8792V19.7193Z"
                                        fill="#188753"
                                        stroke="#188753"
                                        stroke-width="0.15"
                                    />
                                    <path
                                        d="M9.56672 19.7184C9.56672 20.0248 9.81482 20.2735 10.1217 20.2735C10.4287 20.2735 10.6768 20.0248 10.6768 19.7184V13.9606C10.6768 13.6543 10.4287 13.4056 10.1217 13.4056C9.81482 13.4056 9.56672 13.6543 9.56672 13.9606V19.7184Z"
                                        fill="#188753"
                                        stroke="#188753"
                                        stroke-width="0.15"
                                    />
                                    <path
                                        d="M7.24027 12.5934H18.7607C19.0677 12.5934 19.3158 12.3448 19.3158 12.0384V11.0784C19.3158 10.243 18.6366 9.5638 17.8017 9.5638H14.5146V5.31959C14.5146 4.48465 13.8349 3.80549 12.9995 3.80549C12.1651 3.80549 11.4859 4.48471 11.4859 5.31959V9.5638H8.19935C7.36444 9.5638 6.68525 10.243 6.68525 11.0784V12.0384C6.68525 12.3448 6.93335 12.5934 7.24027 12.5934ZM18.2057 11.0784V11.4834H7.79529V11.0784C7.79529 10.8552 7.97638 10.6738 8.19935 10.6738H12.0409C12.3479 10.6738 12.596 10.4252 12.596 10.1188V5.31959C12.596 5.0969 12.7771 4.91553 12.9995 4.91553C13.2232 4.91553 13.4046 5.0971 13.4046 5.31959V10.1188C13.4046 10.4252 13.6527 10.6738 13.9596 10.6738H17.8017C18.0246 10.6738 18.2057 10.8552 18.2057 11.0784Z"
                                        fill="#188753"
                                        stroke="#188753"
                                        stroke-width="0.15"
                                    />
                                </svg>
                                <h1 className="text-[18px] ml-[10px]">
                                    Cache clear
                                </h1>
                            </div>
                        </div>
                    </div>
                    {/* right side */}
                    <div className="flex  items-center justify-between w-[200px] nabarWidth ">
                        <div className="w-[40px] h-[30px] rounded-full bg-slate-100 p-[20px] flex items-center justify-center cursor-pointer Zoom">
                            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                        </div>
                        <div className="cursor-pointer">
                            <div className="relative">
                                <div
                                    className="flex relative transition-[3s] duration-[ease-in] text-[black] hover:text-[aqua]"
                                    onClick={handleToggle}
                                >
                                    <div className="mr-[5px]">
                                        <img
                                            src="https://hrm.bdtask-demoserver.com/backend/assets/dist/img/avatar.jpg"
                                            alt=""
                                            className="rounded-full w-[40px] bg-green-200"
                                        />
                                    </div>
                                    <div className="Admin">
                                        <div>
                                            <h3 className="text-[16px]  font-bold">
                                                Admin
                                            </h3>
                                        </div>
                                        <div>
                                            <h4 className="text-[12px] font-bold">
                                                Admin
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                {/* tobar in navbar */}
                                {open && (
                                    <div
                                        id="Hide"
                                        className="z-10    absolute  top-[55px] right-[10px] h-[240px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gray-100 p-2 w-[220px] rounded-lg"
                                    >
                                        <div className="flex align-center flex-col justify-items-center">
                                            <div className="m-auto">
                                                <img
                                                    className="w-[60px] h-[60px] rounded-full"
                                                    src="https://hrm.bdtask-demoserver.com/backend/assets/dist/img/avatar.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="text-center text-xs p-[10px]">
                                                <h2 className="text-lg text-black font-bold">
                                                    {user.name}
                                                </h2>
                                                <p>{user.email}</p>
                                            </div>
                                            <div className="text-center text-green-500 transition duration-300 ease-in-out hover:text-black">
                                                <h4>Manage your account</h4>
                                            </div>
                                            <div className="flex justify-between p-[10px] mt-[20px]">
                                                <div>
                                                    <a
                                                        onClick={onLogout}
                                                        type="#"
                                                        class="focus:outline-none text-black transition-colors  bg-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                                    >
                                                        Sign out
                                                    </a>
                                                </div>
                                                <div>
                                                    <a
                                                        onClick={CloseNow}
                                                        type="#"
                                                        class="focus:outline-none text-red-500 transition-colors  bg-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                                    >
                                                        Close
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* tobar in navbar */}
                            </div>
                        </div>
                        {/* work now */}
                        <div
                            className="relative hidden CacheClearMenu"
                            onClick={() => setShow(!show)}
                        >
                            <div className="flex flex-col w-[50px] h-[50px] border-2 border-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center ">
                                <div className="w-[20px] mt-[2px] h-[5px] border-2 border-black rounded-md"></div>
                                <div className="w-[20px] mt-[2px] h-[5px] border-2 border-black rounded-md"></div>
                                <div className="w-[20px] mt-[2px] h-[5px] border-2 border-black rounded-md"></div>
                            </div>
                        </div>
                        {/* work now */}
                    </div>
                    {/* right side */}
                </div>
                {/* navbar start */}
                <nav
                    className={` ${
                        slidvarOpen ? "w-[251px]" : "w-20"
                    } h-auto shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] pr-[10px] pl-[10px]   bg-white duration-300 NabarSlidbar overflow-x-hidden overflow-y-scroll h-full  bg-[#fff] !fixed no-scrollbar`}
                >
                    <div className="pt-[63px]">
                        <input
                            className={` ${
                                slidvarOpen ? "w-[251px]" : "hidden"
                            } w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-teal-500 hover:border-teal-300 shadow-sm focus:shadow mt-4 pl-[20px]`}
                            type="text"
                            placeholder="Menu Search..."
                            value={searchInput}
                            onChange={(e) => SetSearchInput(e.target.value)}
                        />
                    </div>
                    <ul>
                        <Link to="/">
                            <div className="bg-green-100 h-[40px] rounded cursor-pointer">
                                <a
                                    href=""
                                    className="flex justify-between mt-[20px]"
                                >
                                    <div className="flex items-center justify-between pl-[20px] mt-[7px] w-[130px] text-green-700">
                                        <FontAwesomeIcon
                                            className={`${
                                                slidvarOpen ? "" : "mt-[4px]"
                                            }`}
                                            icon={faHouse}
                                        />
                                        <span
                                            className={`${
                                                slidvarOpen ? "" : "hidden"
                                            }`}
                                        >
                                            Dashbord
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </Link>
                        {/* List try */}

                        {FilteredData().map((data, index) => {
                            return (
                                <div key={data.id}>
                                    <li
                                        className={`mt-5 hover:bg-green-100 transition duration-300 hover:text-green-700 ${
                                            openIndex === index
                                                ? "bg-green-200 text-green-800"
                                                : ""
                                        }`}
                                        onClick={() => toggleMenu(index)}
                                    >
                                        <a className="flex justify-between pl-5 mt-2 h-10 rounded items-center">
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={data.icon1}
                                                />
                                                <span
                                                    className={`${
                                                        slidvarOpen
                                                            ? ""
                                                            : "hidden"
                                                    } pl-5`}
                                                >
                                                    {data.name}
                                                </span>
                                            </div>
                                            <div className="mr-3">
                                                <FontAwesomeIcon
                                                    className={`${
                                                        slidvarOpen
                                                            ? ""
                                                            : "hidden"
                                                    }`}
                                                    icon={
                                                        openIndex === index
                                                            ? faChevronLeft
                                                            : faChevronDown
                                                    }
                                                />
                                            </div>
                                        </a>
                                    </li>
                                    {openIndex === index && (
                                        <ul
                                            className={`${
                                                slidvarOpen ? "" : "hidden"
                                            } pl-10`}
                                        >
                                            {data.links.map((link, idx) => (
                                                <li key={idx}>
                                                    <Link
                                                        to={link.path}
                                                        className={`block mt-2 py-2 px-4 rounded ${
                                                            location.pathname ===
                                                            link.path
                                                                ? "bg-green-300 text-green-900 font-bold"
                                                                : "hover:bg-green-100 hover:text-green-700"
                                                        }`}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                        {/* list try */}
                    </ul>
                </nav>
                <Outlet />
                {/* navbar Ends */}
                <div className="">
                    {/* <NoticeListOne /> */}
                    <div
                        class={`${
                            nabVarOpen
                                ? "fixed top-[10%] left-[17%] w-[82vw] h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 relative xs:w-[40vw]  md:w-[60vw] md:[left:35%] md1:w-[64vw] md1:[left:33%] md2:w-[65vw] md2:[left:33%] md3:w-[66vw] md3:[left:30%] md4:w-[66vw] md4:[left:28%] md5:w-[66vw] md5:[left:30%] lg:w-[69vw] lg:[left:27%] lg2:w-[72vw] lg2:[left:25%] lg3:w-[72vw] lg3:[left:23%] xl1:w-[72vw] xl1:[left:20%] xl:w-[72vw] xl:[left:22%] xxll:w-[73vw] xxll:[left:18%]  xxl1:w-[75vw]  xxl1:[left:20%] xxl2:w-[77vw] xxl2:[left:16%]  "
                                : "fixed top-[10%] left-[17%] w-[82vw] h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 relative xs:w-[40vw]  md:w-[83vw] md:[left:12%] md1:w-[83vw] md1:[left:12%] md2:w-[83vw] md2:[left:12%] md3:w-[83vw] md3:[left:12%] md4:w-[83vw] md4:[left:12%] md5:w-[83vw] md5:[left:12%] lg:w-[83vw] lg:[left:12%] lg2:w-[82vw] lg2:[left:12%] lg3:w-[82vw] lg3:[left:12%] xl1:w-[82vw] xl1:[left:12%] xl:w-[82vw] xl:[left:12%] xxll:w-[82vw] xxll:[left:12%]  xxl1:w-[87vw]  xxl1:[left:7%] xxl2:w-[87vw] xxl2:[left:7%]"
                        } duration-300 no-scrollbar `}
                    >
                        <div className="sticky mt-[100px] "></div>
                        <div>
                            <Request />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProcurementRequest;
