import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

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
} from "@fortawesome/free-solid-svg-icons";

// fontawesome Icon Ends
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/Contextsprovider";
import axiosClient from "../axiosClient";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
// Registering Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// try navbar toggle
// try navbar toggle
// show navbar

// hide
const pictures = [
    "https://hrm.bdtask-demoserver.com/storage/application/1716900096sidebar-logo.png",
    "https://hrm.bdtask-demoserver.com/storage/application/1716900212sidebar-collapsed-logo.png",
];

const Heder = () => {
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
                { label: "Tax setup", path: "/Tax/setup" },
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
    const [openIndex, setOpenIndex] = useState(null);
    // Toggle function to open/close menu items
    const toggleMenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
    // dashbord title
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);
    // dashbord title

    // gropup chart
    // Chart.js dependencies
    // State to manage the chart data
    const [chartData, setChartData] = useState({
        labels: [
            "Consulting",
            "Finance 2",
            "ABC",
            "Safety Designing Security",
            "Technical",
            "AminRestaurants",
            "Electrical",
        ],
        datasets: [
            {
                label: "Data Set 1",
                data: [65, 59, 80, 81, 56, 55, 60],
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            },
        ],
    });
    const handleButtonClick = (dataset) => {
        switch (dataset) {
            case "data1":
                setChartData({
                    labels: [
                        "Consulting",
                        "Finance 2",
                        "ABC",
                        "Safety Designing Security",
                        "Technical",
                        "AminRestaurants",
                        "Electrical",
                    ],
                    datasets: [
                        {
                            label: "Data Set 1",
                            data: [65, 59, 80, 81, 56, 55, 60],
                            borderColor: "rgba(75,192,192,1)",
                            fill: false,
                        },
                    ],
                });
                break;
            case "data2":
                setChartData({
                    labels: [
                        "Consulting",
                        "Finance 2",
                        "ABC",
                        "Safety Designing Security",
                        "Technical",
                        "AminRestaurants",
                        "Electrical",
                    ],
                    datasets: [
                        {
                            label: "Data Set 2",
                            data: [33, 45, 75, 63, 44, 70, 60],
                            borderColor: "rgba(153,102,255,1)",
                            fill: false,
                        },
                    ],
                });
                break;
            case "data3":
                setChartData({
                    labels: [
                        "Consulting",
                        "Finance 2",
                        "ABC",
                        "Safety Designing Security",
                        "Technical",
                        "AminRestaurants",
                        "Electrical",
                    ],
                    datasets: [
                        {
                            label: "Data Set 3",
                            data: [50, 60, 55, 80, 95, 90],
                            borderColor: "rgba(255,159,64,1)",
                            fill: false,
                        },
                    ],
                });
                break;
            default:
                break;
        }
    };
    // group chart
    // try chat background
    const [width, setWidth] = useState(700);
    const [bgColor, setBgColor] = useState("");
    const [textColor, setTextColor] = useState("text-white");
    const [text, setText] = useState("Engineer:1");

    const backgroundChange = (event) => {
        const value = event.target.value;
        let newColor = "";
        if (value === "0") newColor = "";
        else if (value === "1") newColor = "bg-pink-500";
        else if (value === "2") newColor = "bg-cyan-500";
        else if (value === "3") newColor = "bg-blue-500";
        if (value === "1") {
            setTextColor("text-blue-500");
            setText("Developer:2");
        } else if (value === "2") {
            setTextColor("text-white");
            setText("Manager:3");
        } else if (value === "3") {
            setTextColor("text-white");
            setText("CEO:4");
        }

        setBgColor(newColor);

        let currentWidth = 100;
        const interval = setInterval(() => {
            currentWidth += 10;
            setWidth(currentWidth);

            if (currentWidth >= 700) {
                clearInterval(interval);
            }
        }, 50);
    };
    // try chat background
    // hover backgrund onno background
    const [hover, setHover] = useState(false);
    // hover background now
    const [bgColorChange, setBgColorChange] = useState("black");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const colors = ["red", "blue", "green", "purple", "orange", "black"];

        const interval = setInterval(() => {
            setBgColorChange(colors[index]);
            setIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 1000); // প্রতি ১ সেকেন্ড পর কালার পরিবর্তন হবে

        return () => clearInterval(interval);
    }, [index]); // `index` পরিবর্তন হলে useEffect পুনরায় চলবে
    // hover background now

    // count Employe now
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/EmployeCount")
            .then((response) => {
                setCount(response.data.count);
            })
            .catch((error) => {
                console.error("Error fetching message count:", error);
            });
    }, []);
    // Today attendance
    const [countAttendance, setCountAttendance] = useState(0);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/AttendanceCount")
            .then((response) => {
                setCountAttendance(response.data.countAttendance);
            })
            .catch((error) => {
                console.error("Error fetching message Attendance:", error);
            });
    }, []);
    const [leaveRequests, setLeaveRequests] = useState([]);
    // leave application now
    const [countleave, setCountleave] = useState(0);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/LeaveApllicationId")
            .then((response) => {
                setCountleave(response.data.countleave);
            })
            .catch((error) => {
                console.error(
                    "Error fetching message Leave Apllication:",
                    error
                );
            });
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/leaveRequests") // ✅ Laravel API route
            .then((response) => {
                setLeaveRequests(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch leave requests:", error);
            });
    }, []);
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashbord</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div
                className="bg-gray-300"
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
                                    alt="Logo"
                                    className={`cursor-pointer ${
                                        nabVarOpen
                                            ? "w-[156px] h-[40px] mt-[5px]"
                                            : "w-[30px] h-[40px] mt-[5px]"
                                    }`}
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
                            const { icon1, name, icon2, link1, link2, link3 } =
                                data;
                            return (
                                <div key={index}>
                                    <li
                                        className="mt-[20px] hover:bg-green-100 transition duration-300 hover:text-green-700"
                                        onClick={() => toggleMenu(index)}
                                    >
                                        <a className="flex justify-between pl-[20px] mt-[7px]   h-[40px] rounded  items-center">
                                            <div className="">
                                                <FontAwesomeIcon icon={icon1} />
                                                <span
                                                    className={`${
                                                        slidvarOpen
                                                            ? ""
                                                            : "hidden"
                                                    } pl-[20px]`}
                                                >
                                                    {" "}
                                                    {name}
                                                </span>
                                            </div>
                                            <div className="mr-[12px]">
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
                                    <div>
                                        <div>
                                            {openIndex === index && (
                                                <div>
                                                    <ul
                                                        className={`${
                                                            slidvarOpen
                                                                ? ""
                                                                : "hidden"
                                                        }`}
                                                    >
                                                        {data.links.map(
                                                            (link, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="flex items-center justify-start ml-[20px] mt-[10px] hover:bg-green-100 transition duration-300 hover:text-green-700"
                                                                >
                                                                    <div
                                                                        className={`${
                                                                            slidvarOpen
                                                                                ? ""
                                                                                : "hidden"
                                                                        } dotted mr-[10px]`}
                                                                    ></div>
                                                                    <Link
                                                                        to={
                                                                            link.path
                                                                        }
                                                                        className={`${
                                                                            slidvarOpen
                                                                                ? ""
                                                                                : "hidden"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            link.label
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* list try */}
                    </ul>
                </nav>
                <Outlet />
                {/* navbar Ends */}

                {/* <div
                    className="fixed top-[10%] left-[17%] w-[82vw] h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 relative
                 xs:w-[40vw]
                 md:w-[60vw] md:[left:35%]
                 md1:w-[64vw] md1:[left:33%]
                 md2:w-[65vw] md2:[left:33%]
                 md3:w-[66vw] md3:[left:30%]
                 md4:w-[66vw] md4:[left:28%]
                 md5:w-[66vw] md5:[left:30%]
                 lg:w-[69vw] lg:[left:27%]
                 lg2:w-[72vw] lg2:[left:25%]
                 lg3:w-[72vw] lg3:[left:23%]
                 xl1:w-[72vw] xl1:[left:20%]
                 xl:w-[72vw] xl:[left:22%]
                xxll:w-[73vw] xxll:[left:18%] 
                xxl1:w-[75vw]  xxl1:[left:20%]
                xxl2:w-[77vw] xxl2:[left:16%] "
                ></div> */}
                <div
                    className={`${
                        nabVarOpen
                            ? "fixed top-[10%] left-[17%] w-[82vw] h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 relative xs:w-[40vw]  md:w-[60vw] md:[left:35%] md1:w-[64vw] md1:[left:33%] md2:w-[65vw] md2:[left:33%] md3:w-[66vw] md3:[left:30%] md4:w-[66vw] md4:[left:28%] md5:w-[66vw] md5:[left:30%] lg:w-[69vw] lg:[left:27%] lg2:w-[72vw] lg2:[left:25%] lg3:w-[72vw] lg3:[left:23%] xl1:w-[72vw] xl1:[left:20%] xl:w-[72vw] xl:[left:22%] xxll:w-[73vw] xxll:[left:18%]  xxl1:w-[75vw]  xxl1:[left:20%] xxl2:w-[77vw] xxl2:[left:16%]  "
                            : "fixed top-[10%] left-[17%] w-[82vw] h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 relative xs:w-[40vw]  md:w-[83vw] md:[left:12%] md1:w-[83vw] md1:[left:12%] md2:w-[83vw] md2:[left:12%] md3:w-[83vw] md3:[left:12%] md4:w-[83vw] md4:[left:12%] md5:w-[83vw] md5:[left:12%] lg:w-[83vw] lg:[left:12%] lg2:w-[82vw] lg2:[left:12%] lg3:w-[82vw] lg3:[left:12%] xl1:w-[82vw] xl1:[left:12%] xl:w-[82vw] xl:[left:12%] xxll:w-[82vw] xxll:[left:12%]  xxl1:w-[87vw]  xxl1:[left:7%] xxl2:w-[87vw] xxl2:[left:7%]"
                    } duration-300 no-scrollbar `}
                >
                    <div className="sticky mt-[100px] h-[518px] p-2 z-10 flex items-start justify-between ">
                        {/*md:flex md:flex-col md5:grid  md5:grid-cols-2 md5:gap-4 md5:mr-[50px] md5:flex md5:items-start */}
                        <div className="flex flex-col relative  ">
                            {/* card one */}
                            {/* 1md:w-[600px]md5:w-[300px]1  2md:w-[700px] md5:w-[300px]2*/}
                            <div
                                className={`${
                                    nabVarOpen
                                        ? "w-[233px] h-[121px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] flex items-center justify-between "
                                        : "w-[233px]   h-[121px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] flex items-center justify-between "
                                } duration-300 `}
                            >
                                <div className="flex items-center justify-between ">
                                    {/* 1md:w-[470px] md2:w-[530px] md5:w-[270px]1 2md:w-[620px] md5:w-[270px]2 */}
                                    <div
                                        className={`${
                                            nabVarOpen
                                                ? "flex items-center justify-between w-[200px]  pl-[20px]"
                                                : "flex items-center justify-between w-[200px]   pl-[20px]"
                                        } duration-300 `}
                                    >
                                        <div>
                                            <p className="text-base font-medium mb-1">
                                                Total employee
                                            </p>
                                            <h3 className="mb-0 font-bold">
                                                {count}
                                            </h3>
                                        </div>
                                        <div>
                                            <div class="bg-green-100 p-2 rounded-lg flex items-center justify-center">
                                                <svg
                                                    width="26"
                                                    height="20"
                                                    viewBox="0 0 26 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M19.4102 9.23327C20.6623 8.28328 21.4682 6.82078 21.4682 5.1749C21.4682 2.32078 19.0463 0 16.0741 0C14.5794 0 13.2275 0.587489 12.2484 1.52916C11.4382 1.0625 10.5067 0.808341 9.55352 0.808341C6.68111 0.808341 4.34136 3.04582 4.34136 5.79177C4.34136 7.35011 5.09958 8.74589 6.27805 9.66268C4.98259 10.1127 3.79112 10.821 2.7859 11.7835C0.992187 13.5085 0 15.8 0 18.2458C0 19.2125 0.818855 20 1.82837 20H24.1283C25.1595 20 26 19.1917 26 18.2C25.9957 14.071 23.2447 10.5458 19.4102 9.23327ZM16.0742 1.66666C18.0931 1.66666 19.7352 3.24163 19.7352 5.1749C19.7352 7.10817 18.0931 8.68314 16.0742 8.68314C14.0552 8.68314 12.4131 7.10817 12.4131 5.1749C12.4131 3.24163 14.0552 1.66666 16.0742 1.66666ZM6.07882 5.79169C6.07882 3.96253 7.63855 2.47492 9.55793 2.47492C10.1515 2.47492 10.7277 2.62075 11.239 2.89158C10.8837 3.57907 10.6801 4.35408 10.6801 5.1749C10.6801 6.35822 11.1003 7.44987 11.8022 8.32474C11.1913 8.82474 10.4115 9.10807 9.59259 9.11223H9.5276C7.62558 9.09973 6.07882 7.60832 6.07882 5.79169ZM1.82857 18.3332C1.77658 18.3332 1.73325 18.2957 1.73325 18.2457C1.73325 16.2499 2.54345 14.3748 4.01654 12.9665C5.4853 11.5582 7.44352 10.7791 9.52317 10.7791H9.59249C9.67915 10.7791 9.7658 10.7874 9.85245 10.7874C7.5995 12.5332 6.15234 15.2082 6.15234 18.1999C6.15234 18.2457 6.161 18.2874 6.16534 18.3332L1.82857 18.3332ZM24.1241 18.3332H8.02426C7.9506 18.3332 7.88561 18.2749 7.88561 18.1999C7.88561 13.8708 11.5466 10.3498 16.0484 10.3498H16.1004C20.6018 10.3498 24.2631 13.8706 24.2631 18.1999C24.2631 18.2749 24.2025 18.3332 24.1245 18.3332H24.1241Z"
                                                        fill="#00B074"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* card one */}
                            {/* card Two */}
                            {/* 1 md:w-[600px] md:mt-[10px] md5:w-[300px] 1 2md:w-[700px] md:mt-[10px] md5:w-[300px]2*/}
                            <div
                                className={`${
                                    nabVarOpen
                                        ? "w-[233px] mt-[10px] h-[121px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] flex items-center justify-between "
                                        : "w-[233px] mt-[10px]  h-[121px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] flex items-center justify-between "
                                } duration-300 `}
                            >
                                <div className="flex items-center justify-between ">
                                    {/*1md:w-[470px] md2:w-[530px]md5:w-[270px]1 2md:w-[620px] md5:w-[270px]2  */}
                                    <div
                                        className={`${
                                            nabVarOpen
                                                ? "flex items-center justify-between w-[200px]  pl-[20px] "
                                                : "flex items-center justify-between w-[200px]  pl-[20px]"
                                        } duration-300 `}
                                    >
                                        <div>
                                            <p className="text-base font-medium mb-1">
                                                Today presents
                                            </p>
                                            <h3 className="mb-0 font-bold">
                                                {countAttendance}
                                            </h3>
                                        </div>
                                        <div>
                                            <div class="bg-green-100 p-2 rounded-lg flex items-center justify-center">
                                                <svg
                                                    width="26"
                                                    height="24"
                                                    viewBox="0 0 26 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5.26239 13.1559C5.26233 14.3654 5.45188 15.5629 5.82021 16.6803C6.18854 17.7977 6.72843 18.813 7.40907 19.6682C8.08971 20.5234 8.89775 21.2018 9.78706 21.6646C10.6764 22.1274 11.6295 22.3657 12.5921 22.3657C13.5547 22.3657 14.5079 22.1274 15.3972 21.6646C16.2865 21.2018 17.0946 20.5234 17.7752 19.6682C18.4558 18.813 18.9957 17.7977 19.3641 16.6803C19.7324 15.5629 19.9219 14.3654 19.9219 13.1559C19.9219 11.9465 19.7324 10.749 19.3641 9.63158C18.9957 8.51421 18.4558 7.49893 17.7752 6.64372C17.0946 5.78852 16.2865 5.11012 15.3972 4.64729C14.5079 4.18445 13.5547 3.94623 12.5921 3.94623C11.6295 3.94623 10.6764 4.18445 9.78706 4.64729C8.89775 5.11012 8.08971 5.78852 7.40907 6.64372C6.72843 7.49893 6.18854 8.51421 5.82021 9.63158C5.45188 10.749 5.26233 11.9465 5.26239 13.1559Z"
                                                        fill="#099B69"
                                                        fill-opacity="0.15"
                                                    ></path>
                                                    <path
                                                        d="M0.563827 12.5921C0.187942 12.5921 0 12.2162 0 11.8404C0 10.9007 0.375884 8.83329 1.69148 6.57798C1.87942 6.20209 2.25531 6.20209 2.63119 6.39004C3.00708 6.57798 3.19502 7.14181 2.81913 7.32975C1.69148 9.58505 1.3156 11.2765 1.3156 12.0283C1.3156 12.4042 0.939711 12.5921 0.563827 12.5921ZM3.19502 6.39004C3.00708 6.39004 2.81913 6.39004 2.81913 6.20209C2.44325 6.01415 2.44325 5.45033 2.63119 5.26238C3.94679 3.5709 5.63827 2.25531 7.32975 1.3156C7.70563 1.12765 8.08152 1.3156 8.26946 1.69148C8.4574 2.06736 8.26946 2.44325 7.89357 2.63119C6.39004 3.38296 5.07444 4.51061 3.75885 6.01415C3.75885 6.20209 3.5709 6.39004 3.19502 6.39004ZM9.96094 1.87942C9.58506 1.87942 9.39711 1.69148 9.20917 1.3156C9.20917 0.939711 9.39711 0.563827 9.773 0.375884C10.9007 0 12.2162 0 13.5318 0C14.0957 0.187942 14.2836 0.563827 14.2836 0.939711C14.2836 1.3156 13.9077 1.69148 13.5318 1.69148C12.4042 1.50354 11.2765 1.50354 9.96094 1.87942C10.1489 1.87942 10.1489 1.87942 9.96094 1.87942ZM18.9822 3.19502C18.7942 3.19502 18.7942 3.19502 18.6063 3.00708C17.4786 2.25531 16.163 1.87942 14.8474 1.50354C14.6595 1.69148 14.2836 1.3156 14.4716 0.939711C14.4716 0.563827 14.8474 0.375884 15.2233 0.375884C16.7269 0.751769 18.0425 1.12765 19.3581 2.06736C19.7339 2.25531 19.7339 2.63119 19.546 3.00708C19.546 3.19502 19.1701 3.19502 18.9822 3.19502ZM24.6204 14.4716C24.2446 14.4716 23.8687 14.0957 23.8687 13.7198C23.6807 9.58506 22.3651 6.39004 20.1098 4.32267C19.7339 4.13473 19.7339 3.5709 20.1098 3.38296C20.2978 3.00708 20.8616 3.00708 21.0495 3.38296C23.4928 5.63827 24.9963 9.20917 25.1843 13.7198C25.3722 14.0957 24.9963 14.4716 24.6204 14.4716Z"
                                                        fill="#00B074"
                                                    ></path>
                                                    <path
                                                        d="M20.2978 22.5531H20.1098C19.7339 22.3651 19.546 21.9893 19.7339 21.6134C19.7339 21.6134 20.1098 20.4857 20.6736 18.2304C21.2375 15.9751 20.8616 12.968 20.8616 12.968C20.8616 9.77301 18.9822 6.76593 15.9751 5.45034C15.5992 5.26239 15.4113 4.88651 15.5992 4.51062C15.7871 4.13474 16.163 3.9468 16.5389 4.13474C19.9219 5.63828 22.1772 9.02124 22.1772 12.7801C22.1772 12.7801 22.5531 15.9751 21.9892 18.4183C21.4254 20.8616 20.8616 21.9893 20.8616 21.9893C20.6736 22.3651 20.4857 22.5531 20.2978 22.5531ZM7.70563 6.2021C7.51769 6.2021 7.32975 6.01416 7.1418 5.82622C6.95386 5.63828 7.1418 5.26239 7.32975 5.07445C9.39711 3.57091 11.8404 3.00709 14.2836 3.57091C14.6595 3.57091 14.8474 3.9468 14.8474 4.32268C14.8474 4.69857 14.4716 4.88651 14.0957 4.88651C12.0283 4.51062 9.96094 4.88651 8.26946 6.2021H7.70563ZM0.751769 16.9148C0.375884 16.9148 0.187942 16.7269 0 16.351C0 15.9751 0.187942 15.5992 0.563827 15.5992C0.563827 15.5992 1.3156 15.4113 2.06736 14.6595C2.63119 14.0957 3.19502 13.156 3.38296 12.7801C3.38296 10.7127 4.13473 8.64535 5.45032 6.95387C5.63827 6.57799 6.20209 6.39005 6.39004 6.76593C6.76592 6.95387 6.76592 7.32976 6.57798 7.70564C5.45032 9.20918 4.69856 10.9007 4.69856 12.7801V12.968C4.69856 13.156 4.13473 14.8474 3.00708 15.5992C1.87942 16.5389 0.939711 16.9148 0.939711 16.9148H0.751769Z"
                                                        fill="#00B074"
                                                    ></path>
                                                    <path
                                                        d="M2.2553 19.3581C2.06736 19.3581 1.87942 19.1701 1.69147 18.9822C1.50353 18.6063 1.50353 18.2304 1.87942 18.0425C1.87942 18.0425 4.32267 16.351 5.07443 15.7872C5.26238 15.5992 5.8262 14.6595 6.01415 13.7198C6.01415 12.2163 6.95386 9.58508 7.89357 8.45743C7.89357 8.45743 8.26945 7.8936 9.20917 7.32977C9.96093 6.95389 10.9006 6.578 11.8404 6.578C12.2162 6.39006 12.5921 6.578 12.5921 6.95389C12.5921 7.32977 12.4042 7.70566 12.0283 7.70566C11.2765 7.70566 10.7127 7.8936 10.1489 8.26948C9.39711 8.83331 9.02122 9.20919 9.02122 9.20919C8.26945 10.1489 7.32974 12.5922 7.32974 13.9078V14.0957C7.1418 14.6595 6.57797 16.351 5.8262 17.1028C5.26238 17.4787 2.81913 19.1701 2.63119 19.3581H2.2553ZM17.1027 10.3368C16.9148 10.3368 16.7269 10.3368 16.5389 10.1489C15.9751 9.20919 15.0354 8.45743 13.9077 8.08154C13.5318 7.8936 13.3439 7.51771 13.5318 7.14183C13.5318 6.76594 14.0957 6.578 14.4715 6.76594C15.7871 7.32977 17.1027 8.26948 17.8545 9.20919C18.0425 9.58508 18.0424 9.96096 17.6666 10.1489C17.4786 10.3368 17.2907 10.3368 17.1027 10.3368ZM17.6666 17.4787C17.1027 17.2907 16.9148 16.9148 16.9148 16.5389C17.1027 15.9751 17.1027 15.5992 17.2907 15.4113C17.4786 14.6595 17.4786 12.968 17.4786 12.968C17.4786 12.5922 17.4786 12.0283 17.2907 11.6524C17.2907 11.2766 17.4786 10.9007 17.8545 10.7127C18.2304 10.5248 18.6063 10.9007 18.7942 11.2766C18.9822 11.8404 18.9822 12.4042 18.9822 12.968C18.9822 12.968 18.7942 14.8475 18.7942 15.5992C18.7942 15.7872 18.6063 16.1631 18.6063 16.7269C18.2304 17.1028 18.0424 17.4787 17.6666 17.4787Z"
                                                        fill="#00B074"
                                                    ></path>
                                                    <path
                                                        d="M16.163 22.929H15.9751C15.5992 22.741 15.4113 22.3651 15.5992 21.9893C15.5992 21.9893 16.163 19.9219 16.7269 18.0425C16.7269 17.6666 17.2907 17.4786 17.6666 17.4786C18.0425 17.4786 18.2304 17.8545 18.2304 18.4183C17.8545 20.2978 17.1028 22.3651 17.1028 22.3651C16.7269 22.741 16.5389 22.929 16.163 22.929Z"
                                                        fill="#00B074"
                                                    ></path>
                                                    <path
                                                        d="M13.156 23.1169C12.5921 22.929 12.4042 22.5531 12.4042 22.1772L14.4716 13.7198C14.8474 12.5921 14.0957 11.4645 12.968 11.0886C11.8404 10.9006 10.5248 11.6524 10.3368 12.7801L8.4574 18.2304L4.69855 21.2375C4.32267 21.6134 3.75884 21.6134 3.5709 21.2375C3.38296 20.8616 3.38296 20.4857 3.75884 20.2978L7.32974 17.4786L9.02122 12.5921C9.02122 11.6524 9.77299 10.7127 10.5248 10.3368C11.2765 9.773 12.4042 9.58505 13.3439 9.96094C15.2233 10.3368 16.5389 12.2162 15.9751 14.2836L13.9077 22.741C13.9077 22.929 13.5318 23.1169 13.156 23.1169Z"
                                                        fill="#00B074"
                                                    ></path>
                                                    <path
                                                        d="M9.02123 23.3049H8.64535C8.26946 23.1169 8.26946 22.741 8.4574 22.3651L10.5248 18.6063L11.6524 13.3439C11.6524 12.968 12.0283 12.7801 12.4042 12.7801C12.7801 12.7801 12.968 13.156 12.968 13.5319L11.8404 19.1701L9.58506 23.1169C9.58506 23.1169 9.20917 23.3049 9.02123 23.3049Z"
                                                        fill="#00B074"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* card Two */}
                            {/* card Three */}
                            {/* 1md:w-[600px] md:mt-[10px] md5:w-[300px]1  2md:w-[700px] md:mt-[10px] md5:w-[300px]*/}
                            <div
                                className={`${
                                    nabVarOpen
                                        ? "w-[233px] mt-[10px] h-[121px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] flex items-center justify-between "
                                        : "w-[233px] mt-[10px]  h-[121px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] flex items-center justify-between "
                                } duration-300 `}
                            >
                                <div className="flex items-center justify-between ">
                                    {/* 1md:w-[470px] md2:w-[530px] md5:w-[270px]1  2md:w-[620px] md5:w-[270px]2*/}
                                    <div
                                        className={`${
                                            nabVarOpen
                                                ? "flex items-center justify-between w-[200px]  pl-[20px]"
                                                : "flex items-center justify-between w-[200px]  pl-[20px]"
                                        } duration-300 `}
                                    >
                                        <div>
                                            <p className="text-base font-medium mb-1">
                                                Today absents
                                            </p>
                                            <h3 className="mb-0 font-bold">
                                                22
                                            </h3>
                                        </div>
                                        <div>
                                            <div class="bg-green-100 p-2 rounded-lg flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="26"
                                                    height="22"
                                                    viewBox="0 0 640 512"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                                                        fill="#00B074"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* card Three */}
                            {/* card Four */}
                            {/* 1 md:w-[600px] md:mt-[10px] md5:w-[300px]1 2md:w-[700px] md:mt-[10px] md5:w-[300px]2*/}
                            <div
                                className={`${
                                    nabVarOpen
                                        ? "w-[233px] mt-[10px] h-[121px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] flex items-center justify-between "
                                        : "w-[233px] mt-[10px]  h-[121px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] flex items-center justify-between "
                                } duration-300 `}
                            >
                                <div className="flex items-center justify-between ">
                                    {/* 1 md:w-[470px] md2:w-[530px] md5:w-[270px]1 2 md:w-[620px] md5:w-[270px] 2*/}
                                    <div
                                        className={`${
                                            nabVarOpen
                                                ? "flex items-center justify-between w-[200px]  pl-[20px]"
                                                : "flex items-center justify-between w-[200px]  pl-[20px]"
                                        } duration-300 `}
                                    >
                                        <div>
                                            <p className="text-base font-medium mb-1">
                                                Today leave
                                            </p>
                                            <h3 className="mb-0 font-bold">
                                                {countleave}
                                            </h3>
                                        </div>
                                        <div>
                                            <div class="bg-green-100 p-2 rounded-lg flex items-center justify-center">
                                                <svg
                                                    width="26"
                                                    height="22"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                                                        fill="#00B074"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* card Four */}
                        </div>
                        {/* w-[900px] */}
                        {/* 1md:mt-[10px] md:w-[600px] md:ml-[0px] md:h-[300px] md5:w-[600px]1 
                        2md:mt-[10px] md:w-[600px] md:ml-[0px] md2:w-[700px] md:h-[400px]2*/}
                        <div
                            className={`${
                                nabVarOpen
                                    ? " h-[518px] w-[700px]  border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] ml-[20px] "
                                    : " h-[518px] w-[700px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] ml-[20px] "
                            } duration-300`}
                        >
                            {/* m-0 text-lg font-semibold */}
                            <div className="p-[15px]">
                                <h5
                                    class={`${
                                        nabVarOpen
                                            ? "m-0 text-lg font-semibold md5:text-[15px]"
                                            : "m-0 text-lg font-semibold"
                                    } duration-300`}
                                >
                                    Daily attendance statistic (department wise)
                                </h5>
                            </div>
                            <hr />
                            {/*1md:w-[450px] md5:w-[300px]1 2md:w-[600px] md5:w-[300px]2  */}
                            <div
                                className={`${
                                    nabVarOpen ? "w-[500px]" : "w-[500px]"
                                } duration-300`}
                            >
                                <div className="float-right flex items-center w-[300px] justify-between mt-[20px]">
                                    <button
                                        className="flex items-center w-[100px]"
                                        onClick={() =>
                                            handleButtonClick("data1")
                                        }
                                    >
                                        <div className="w-[10px] h-[10px] border-[1px] border-[solid] border-[red] bg-[red] mr-[10px]"></div>{" "}
                                        leave %
                                    </button>
                                    <button
                                        className=" flex items-center w-[100px] "
                                        onClick={() =>
                                            handleButtonClick("data2")
                                        }
                                    >
                                        <div className="w-[10px] h-[10px] border-[1px] border-[solid] border-[green] bg-[green] mr-[10px]"></div>
                                        Present %
                                    </button>
                                    <button
                                        className="flex items-center w-[100px] "
                                        onClick={() =>
                                            handleButtonClick("data3")
                                        }
                                    >
                                        <div className="w-[10px] h-[10px] border border-solid border-yellow-400 bg-yellow-400 mr-[10px]"></div>
                                        Absent %
                                    </button>
                                </div>
                                {/* Rendering the Line chart with updated chart data */}
                                <Line data={chartData} />
                            </div>
                        </div>
                        {/* // department wise card one */}
                        {/* w-[700px] h-[518px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] ml-[20px] */}
                        {/* 1md:ml-[0px] md:mt-[10px] md:w-[600px] md2:w-[600px] md5:w-[500px] 1 2md:ml-[0px] md:mt-[10px] md:w-[690px] md2:w-[700px]2 */}
                        <div
                            className={`${
                                nabVarOpen
                                    ? " h-[518px] w-[700px]  border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] ml-[20px] "
                                    : " h-[518px] w-[700px] border-[1px] border-[solid] border-[#fff] rounded-[12px] bg-[#fff] ml-[20px] "
                            } duration-300`}
                        >
                            <div>
                                <div className="p-[15px]">
                                    <h5 className="m-0 text-lg font-semibold">
                                        Leave Application
                                    </h5>
                                </div>
                                <hr />

                                {leaveRequests.length === 0 ? (
                                    <p className="text-center text-gray-500 py-4">
                                        No requests found.
                                    </p>
                                ) : (
                                    leaveRequests.slice(0, 5).map((request) => (
                                        <div
                                            key={request.id}
                                            className="flex justify-between items-center border-b px-4 py-3"
                                        >
                                            <div className="flex items-start gap-3">
                                                <img
                                                    className="rounded-lg w-12 h-12"
                                                    src={request.image}
                                                    alt={request.name}
                                                />
                                                <div>
                                                    <p className="mb-2 leading-none text-lg font-semibold text-gray-900">
                                                        {request.name ||
                                                            "No Name"}
                                                    </p>
                                                    <p className="mb-0 leading-none text-sm font-medium text-gray-700">
                                                        Reason: {request.reason}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-green-100 w-[90px] rounded-lg p-1">
                                                <p className="mb-0 text-sm font-semibold text-green-700 text-center">
                                                    Approved
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}

                                <div className="py-3">
                                    <Link
                                        to="/leave/application" // <-- এখানে আপনি যে রাউটে যেতে চান সেটি দিন
                                        className="flex gap-1 items-center justify-center leading-[2rem] text-sm font-semibold text-green-600"
                                    >
                                        See All Request
                                        <svg
                                            width="11"
                                            height="8"
                                            viewBox="0 0 11 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 4H10M10 4L6.75 1M10 4L6.75 7"
                                                stroke="#00B074"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start justify-between">
                        {/* Recruitment Box */}
                        <div
                            className={`${
                                nabVarOpen
                                    ? "w-[760px] ml-2.5 h-[500px] bg-white mt-7 rounded-lg shadow-md p-6"
                                    : "w-[850px] ml-2.5 h-[500px] bg-white mt-7 rounded-lg shadow-md p-6"
                            } duration-300`}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <h5 className="text-lg font-semibold m-0">
                                    Position wise recruitment
                                </h5>
                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue="3"
                                    onChange={backgroundChange}
                                >
                                    <option value="0">Daily</option>
                                    <option value="1">Weekly</option>
                                    <option value="2">Monthly</option>
                                    <option value="3">Yearly</option>
                                </select>
                            </div>
                            <hr className="my-6" />
                            <div className="mt-[40px]">
                                <hr />
                            </div>
                            <div className="mt-[70px]">
                                <hr />
                            </div>
                            {/* Animated Progress Bar */}
                            <div
                                className={`${
                                    nabVarOpen
                                        ? "w-full pr-[17px] ml-[5px] mt-20 relative"
                                        : "w-[710px] ml-[10px] mt-20 relative"
                                } `}
                            >
                                <div
                                    className={`h-24  transition-all duration-500 ${bgColor}  ${
                                        hover
                                            ? "border-2 shadow-lg shadow-gray-500/50  "
                                            : "border-2 border-transparent"
                                    } flex align-center`}
                                    style={{ width: `${width}px` }}
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                >
                                    <span className={`${textColor} p-4`}>
                                        {text}
                                    </span>
                                    {hover && (
                                        <div
                                            className="absolute top-3 right-[16px] w-20 h-10 bg-[black] text-white flex items-center justify-between pr-[10px] pl-[10px] transition-all duration-500 rounded-lg"
                                            style={{
                                                backgroundColor: bgColorChange,
                                            }}
                                        >
                                            <div
                                                className="w-[10px] h-[10px]  rounded-[50%]"
                                                style={{
                                                    backgroundColor:
                                                        bgColorChange,
                                                }}
                                            ></div>
                                            <div>1.0</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${
                                nabVarOpen
                                    ? "h-[500px] bg-[#fff] w-[700px] mt-[27px] ml-[20px] rounded-lg"
                                    : "h-[500px] bg-[#fff] w-[610px] mt-[27px] ml-[20px] rounded-lg"
                            } duration-300`}
                        >
                            <h5 className="mt-[20px] text-lg font-semibold text-gray-800 ml-[20px]">
                                New recruitment
                            </h5>
                            <div className="mt-[20px] ">
                                <hr />
                            </div>
                            <div className="">
                                <div className="flex justify-between items-center border-b px-4 py-3">
                                    <div className="flex items-start gap-3">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPJmL3hkxNFtGJ9M6s-D5zE7YW27R39-oAzw&s"
                                            alt="recruitment image"
                                            className="rounded-lg w-12 h-12"
                                        />
                                        <div>
                                            <p className="mb-2 leading-tight text-lg font-semibold text-gray-900">
                                                Maisha Lucy Zamora Gonzales
                                            </p>
                                            <p className="mb-2 leading-tight text-sm font-normal text-gray-600"></p>
                                            <p className="mb-0 leading-tight text-sm font-medium text-gray-700">
                                                Reason:
                                            </p>
                                        </div>
                                        <div class="bg-green-100 w-24 rounded-lg p-1">
                                            <p class="mb-0 text-sm font-semibold text-green-600 text-center">
                                                Approved
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* 2  card*/}
                                <div className="flex items-start gap-3 pr-[20px] pl-[16px] mt-[14px]">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPJmL3hkxNFtGJ9M6s-D5zE7YW27R39-oAzw&s"
                                        alt="recruitment image"
                                        className="rounded-lg w-12 h-12"
                                    />
                                    <div>
                                        <p className="mb-2 leading-tight text-lg font-semibold text-gray-900">
                                            Maisha Lucy Zamora Gonzales
                                        </p>
                                        <p className="mb-2 leading-tight text-sm font-normal text-gray-600"></p>
                                        <p className="mb-0 leading-tight text-sm font-medium text-gray-700">
                                            Reason:
                                        </p>
                                    </div>
                                    <div class="bg-green-100 w-24 rounded-lg p-1">
                                        <p class="mb-0 text-sm font-semibold text-green-600 text-center">
                                            Approved
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-[20px] ">
                                    <hr />
                                </div>
                                {/* 2 card */}
                                {/* 3  card*/}
                                <div className="flex items-start gap-3 pr-[20px] pl-[16px] mt-[14px]">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPJmL3hkxNFtGJ9M6s-D5zE7YW27R39-oAzw&s"
                                        alt="recruitment image"
                                        className="rounded-lg w-12 h-12"
                                    />
                                    <div>
                                        <p className="mb-2 leading-tight text-lg font-semibold text-gray-900">
                                            Maisha Lucy Zamora Gonzales
                                        </p>
                                        <p className="mb-2 leading-tight text-sm font-normal text-gray-600"></p>
                                        <p className="mb-0 leading-tight text-sm font-medium text-gray-700">
                                            Reason:
                                        </p>
                                    </div>
                                    <div class="bg-green-100 w-24 rounded-lg p-1">
                                        <p class="mb-0 text-sm font-semibold text-green-600 text-center">
                                            Approved
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-[20px] ">
                                    <hr />
                                </div>
                                {/* 3 card */}
                                {/* 4  card*/}
                                <div className="flex items-start gap-3 pr-[20px] pl-[16px] mt-[14px]">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPJmL3hkxNFtGJ9M6s-D5zE7YW27R39-oAzw&s"
                                        alt="recruitment image"
                                        className="rounded-lg w-12 h-12"
                                    />
                                    <div>
                                        <p className="mb-2 leading-tight text-lg font-semibold text-gray-900">
                                            Maisha Lucy Zamora Gonzales
                                        </p>
                                        <p className="mb-2 leading-tight text-sm font-normal text-gray-600"></p>
                                        <p className="mb-0 leading-tight text-sm font-medium text-gray-700">
                                            Reason:
                                        </p>
                                    </div>
                                    <div class="bg-green-100 w-24 rounded-lg p-1">
                                        <p class="mb-0 text-sm font-semibold text-green-600 text-center">
                                            Approved
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-[20px] ">
                                    <hr />
                                </div>
                                {/* 4 card */}
                            </div>

                            <div class="py-3">
                                <a
                                    href=""
                                    class="flex gap-1 items-center justify-center leading-[2rem] text-sm font-semibold text-green-600 md:text-center"
                                >
                                    See All Request
                                    <svg
                                        width="11"
                                        height="8"
                                        viewBox="0 0 11 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 4H10M10 4L6.75 1M10 4L6.75 7"
                                            stroke="#00B074"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start justify-between">
                        {/* card 1 */}
                        <div
                            className={`${
                                nabVarOpen
                                    ? "w-[760px] ml-2.5 h-[530px] bg-white mt-7 rounded-lg shadow-md "
                                    : "w-[850px] ml-2.5 h-[530px] bg-white mt-7 rounded-lg shadow-md "
                            } duration-300`}
                        >
                            <div className="p-6">
                                <h5 className="m-0 text-lg font-semibold">
                                    Awarded
                                </h5>
                            </div>
                            <div>
                                <hr />
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {/* Column 1 */}
                                <div className="space-y-2 grid grid-cols-[auto_auto_auto_auto_auto_auto]  gap-y-[5px">
                                    {/* 1 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 ease-in-out peer-checked:bg-red-200">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-red-500 border-gray-300 rounded-md peer-checked:bg-red-300 peer-checked:border-red-900 focus:ring-2 focus:ring-red-500"></div>
                                        <span className="text-gray-700 peer-checked:text-red-300">
                                            Consulting
                                        </span>
                                    </label>
                                    {/* 1 */}
                                    {/* 2 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-green-600 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-green-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-green-500 border-gray-300 rounded-md peer-checked:bg-green-300 peer-checked:border-green-900 focus:ring-4 focus:ring-green-500"></div>
                                        <span className="text-gray-500 peer-checked:text-green-300">
                                            HR
                                        </span>
                                    </label>
                                    {/* 2 */}
                                    {/* 3 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-yellow-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-yellow-500 border-gray-300 rounded-md peer-checked:bg-yellow-300 peer-checked:border-yellow-900 focus:ring-4 focus:ring-yellow-500"></div>
                                        <span className="text-gray-700 peer-checked:text-yellow-300">
                                            Finance 2
                                        </span>
                                    </label>
                                    {/* 3 */}
                                    {/* 4 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-blue-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-yellow-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-blue-500 border-gray-300 rounded-md peer-checked:bg-blue-300 peer-checked:border-yellow-900 focus:ring-4 focus:ring-yellow-500"></div>
                                        <span className="text-gray-700 peer-checked:text-blue-300">
                                            ABC
                                        </span>
                                    </label>
                                    {/* 4 */}
                                    {/* 5 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-blue-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-yellow-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-orange-500 border-gray-300 rounded-md peer-checked:bg-orange-300 peer-checked:border-yellow-900 focus:ring-4 focus:ring-yellow-500"></div>
                                        <span className="text-gray-700 peer-checked:text-orange-300">
                                            Safety, Security
                                        </span>
                                    </label>
                                    {/* 5 */}
                                    {/* 6 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-green-600 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-green-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-green-500 border-gray-300 rounded-md peer-checked:bg-green-300 peer-checked:border-green-900 focus:ring-4 focus:ring-green-500"></div>
                                        <span className="text-gray-500 peer-checked:text-green-300">
                                            Designing
                                        </span>
                                    </label>
                                    {/* 6 */}
                                </div>
                                <div className="space-y-2  grid grid-cols-[auto_auto_auto_auto_auto]  gap-y-[5px]">
                                    {/* 7 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-yellow-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-yellow-500 border-gray-300 rounded-md peer-checked:bg-yellow-300 peer-checked:border-yellow-900 focus:ring-4 focus:ring-yellow-500"></div>
                                        <span className="text-gray-700 peer-checked:text-yellow-300">
                                            Software Support Engineer
                                        </span>
                                    </label>
                                    {/* 7 */}
                                    {/* 8 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-blue-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-yellow-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-blue-500 border-gray-300 rounded-md peer-checked:bg-blue-300 peer-checked:border-yellow-900 focus:ring-4 focus:ring-yellow-500"></div>
                                        <span className="text-gray-700 peer-checked:text-blue-300">
                                            Technical
                                        </span>
                                    </label>
                                    {/* 8 */}
                                    {/* 9 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-200 ease-in-out peer-checked:bg-red-200">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-red-500 border-gray-300 rounded-md peer-checked:bg-red-300 peer-checked:border-red-900 focus:ring-2 focus:ring-red-500"></div>
                                        <span className="text-gray-700 peer-checked:text-red-300">
                                            Finance
                                        </span>
                                    </label>
                                    {/* 9 */}
                                    {/* 10 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-green-600 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-green-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-green-500 border-gray-300 rounded-md peer-checked:bg-green-300 peer-checked:border-green-900 focus:ring-4 focus:ring-green-500"></div>
                                        <span className="text-gray-500 peer-checked:text-green-300">
                                            Admin
                                        </span>
                                    </label>
                                    {/* 10 */}
                                    {/* 11 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-yellow-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-yellow-500 border-gray-300 rounded-md peer-checked:bg-yellow-300 peer-checked:border-yellow-900 focus:ring-4 focus:ring-yellow-500"></div>
                                        <span className="text-gray-700 peer-checked:text-yellow-300">
                                            Restaurants
                                        </span>
                                    </label>
                                    {/* 11 */}
                                    {/* 12 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-blue-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-yellow-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-blue-500 border-gray-300 rounded-md peer-checked:bg-blue-300 peer-checked:border-yellow-900 focus:ring-4 focus:ring-yellow-500"></div>
                                        <span className="text-gray-700 peer-checked:text-blue-300">
                                            Production
                                        </span>
                                    </label>
                                    {/* 12 */}
                                    {/* 13 */}
                                    <label className="flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ease-in-out bg-white peer-checked:bg-blue-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-yellow-400">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <div className="w-5 h-5 bg-orange-500 border-gray-300 rounded-md peer-checked:bg-orange-300 peer-checked:border-yellow-900 focus:ring-4 focus:ring-yellow-500"></div>
                                        <span className="text-gray-700 peer-checked:text-orange-300">
                                            Electrical
                                        </span>
                                    </label>
                                    {/* 13 */}
                                </div>
                            </div>
                            <div className="pl-[30px] pr-[30px] mt-[20px]">
                                <hr />
                            </div>
                            <div className="pl-[30px] pr-[30px] mt-[40px]">
                                <hr />
                            </div>
                            <div className="pl-[30px] pr-[30px] mt-[40px]">
                                <hr />
                            </div>
                            <div className="pl-[30px] pr-[30px] mt-[40px]">
                                <hr />
                            </div>
                            <div className="pl-[30px] pr-[30px] mt-[40px]">
                                <hr />
                            </div>
                            <div className="pl-[30px] pr-[30px] mt-[40px]">
                                <hr />
                            </div>
                            <div className="pl-[20px] pr-[20px] mt-[10px] flex items-center justify-between">
                                <div className="mr-[6px]">
                                    <h5>jan</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>Feb</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>Mar</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>Apr</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>May</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>Jun</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>Jul</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>Aug</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>Sep</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>Oct</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>Nov</h5>
                                </div>
                                <div className="mr-[6px]">
                                    <h5>Dec</h5>
                                </div>
                            </div>
                        </div>
                        {/* card 1 */}
                        {/* card 2 */}
                        <div
                            className={`${
                                nabVarOpen
                                    ? "w-[525px] ml-2.5 h-[530px] bg-white mt-7 rounded-lg shadow-md "
                                    : "w-[605px] ml-2.5 h-[530px] bg-white mt-7 rounded-lg shadow-md "
                            } duration-300`}
                        >
                            <div>
                                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                    <h5 className="m-0 text-lg font-semibold text-gray-800">
                                        Loan payment received
                                    </h5>
                                </div>
                                <div className="flex items-center justify-center h-[400px] relative">
                                    <div className="border-[2px] border-[solid] border-[black] w-[300px] h-[300px] mt-[50px] rounded-[50%] shadow-[1px_5px_17px_17px_#00000024]">
                                        <div className="flex items-center justify-center">
                                            <div className=" border-[2px] border-[solid] border-[black] w-[250px] h-[250px] mt-[25px] rounded-[50%] shadow-[1px_5px_17px_17px_#00000024]"></div>
                                        </div>
                                    </div>
                                    <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">
                                        <div className="flex flex-col mt-[50px]">
                                            <h5 className="text-[20px]">
                                                Total Loan Amount
                                            </h5>
                                            <h5 className="text-center text-[20px]">
                                                0
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* card 2 */}
                    </div>
                    <div className="flex items-start justify-between">
                        {/* card one */}
                        <div
                            className={`${
                                nabVarOpen
                                    ? "h-[560px] bg-[#fff] w-[500px] mt-[27px] ml-[10px] rounded-lg"
                                    : "h-[560px] bg-[#fff] w-[600px] mt-[27px] ml-[10px] rounded-lg"
                            } duration-300`}
                        >
                            <div className="">
                                <div class="flex w-[100px] items-center justify-between pl-[15px] mt-[15px]">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M4.5 0C4.99706 0 5.4 0.402944 5.4 0.9V1.8H12.6V0.9C12.6 0.402944 13.0029 0 13.5 0C13.9971 0 14.4 0.402944 14.4 0.9V1.80002C14.8131 1.80028 15.1733 1.80282 15.4755 1.82751C15.8313 1.85658 16.1853 1.92076 16.5258 2.09429C17.0337 2.3531 17.4468 2.76611 17.7057 3.2742L17.7057 3.27431C17.8792 3.61482 17.9434 3.96869 17.9725 4.32447C18 4.66158 18 5.07086 18 5.54529V14.2547C18 14.7291 18 15.1384 17.9725 15.4755C17.9434 15.8313 17.8792 16.1852 17.7057 16.5257C17.4469 17.0338 17.0338 17.4469 16.5257 17.7057C16.1852 17.8792 15.8313 17.9434 15.4755 17.9725C15.1384 18 14.7291 18 14.2547 18H3.74529C3.27087 18 2.86158 18 2.52447 17.9725C2.16869 17.9434 1.81483 17.8792 1.47431 17.7057C0.966166 17.4469 0.553123 17.0338 0.294291 16.5258C0.120766 16.1853 0.0565843 15.8313 0.0275143 15.4755C-2.93026e-05 15.1384 -1.52951e-05 14.7291 7.72383e-07 14.2547V5.54531C-1.52951e-05 5.07087 -2.93026e-05 4.66159 0.0275145 4.32447C0.0565852 3.96867 0.0919921 3.61653 0.265502 3.276M3.78 3.6C3.2611 3.6 2.92606 3.6007 2.67106 3.62153C2.42656 3.64151 2.33591 3.67542 2.29142 3.69809C2.12208 3.78437 1.98438 3.92205 1.89811 4.09139C1.87543 4.13589 1.84151 4.22656 1.82154 4.47105C1.8007 4.72605 1.8 5.0611 1.8 5.58V14.22C1.8 14.7389 1.8007 15.0739 1.82154 15.329C1.84151 15.5735 1.87543 15.6641 1.89809 15.7086C1.98439 15.878 2.12208 16.0156 2.29133 16.1018L2.29143 16.1019C2.33592 16.1246 2.42656 16.1585 2.67106 16.1785C2.92606 16.1993 3.2611 16.2 3.78 16.2H14.22C14.7389 16.2 15.0739 16.1993 15.329 16.1785C15.5735 16.1585 15.6641 16.1246 15.7086 16.1019L15.7087 16.1019C15.8779 16.0156 16.0156 15.8779 16.1019 15.7087L16.1019 15.7086C16.1246 15.6641 16.1585 15.5735 16.1785 15.329C16.1993 15.0739 16.2 14.7389 16.2 14.22V5.58C16.2 5.0611 16.1993 4.72605 16.1785 4.47105C16.1585 4.22656 16.1246 4.13592 16.1019 4.09143L16.1019 4.09132C16.0156 3.92208 15.878 3.78439 15.7086 3.69809C15.6641 3.67543 15.5735 3.64151 15.329 3.62153C15.0739 3.6007 14.7389 3.6 14.22 3.6H3.78ZM3.6 7.2C3.6 6.70294 4.00294 6.3 4.5 6.3H13.5C13.9971 6.3 14.4 6.70294 14.4 7.2C14.4 7.69706 13.9971 8.1 13.5 8.1H4.5C4.00294 8.1 3.6 7.69706 3.6 7.2ZM3.6 10.8C3.6 10.3029 4.00294 9.9 4.5 9.9H9C9.49706 9.9 9.9 10.3029 9.9 10.8C9.9 11.2971 9.49706 11.7 9 11.7H4.5C4.00294 11.7 3.6 11.2971 3.6 10.8Z"
                                            fill="#00B074"
                                        ></path>
                                    </svg>
                                    <h5 class="m-0 fs-18 fw-semi-bold">
                                        Notice
                                    </h5>
                                </div>
                                <div className="  mt-[40px]">
                                    <hr />
                                </div>
                                {/* main content */}
                                <div className=" flex items-start flex-col">
                                    {/* card 1 */}
                                    <div
                                        className={`${
                                            nabVarOpen
                                                ? "bg-blue-50 rounded-xl p-3 mb-3 w-[420px] h-[100px] ml-[40px] mt-[20px]"
                                                : "bg-blue-50 rounded-xl p-3 mb-3 w-[505px] h-[100px] ml-[40px] mt-[20px]"
                                        } duration-300`}
                                    >
                                        <div className="flex  items-start justify-between p-[10px]">
                                            <div>
                                                <h5 className="m-0 fs-18 fw-semi-bold">
                                                    Md sojib mia
                                                </h5>
                                            </div>
                                            <div>
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.5042 1.6483C6.66128 1.27875 6.73986 1.09398 6.84924 1.03708C6.94423 0.987641 7.05578 0.987641 7.15078 1.03708C7.26016 1.09398 7.33873 1.27875 7.49581 1.6483L8.74703 4.59178C8.79351 4.70103 8.81672 4.75565 8.85268 4.79748C8.88444 4.83449 8.92332 4.8641 8.96668 4.88436C9.01573 4.90727 9.07246 4.91355 9.18591 4.9261L12.2422 5.26436C12.626 5.30682 12.8178 5.32805 12.9032 5.41955C12.9774 5.49902 13.0118 5.6103 12.9964 5.72033C12.9786 5.84698 12.8353 5.98238 12.5487 6.25325L10.2656 8.4107C10.1809 8.49075 10.1385 8.53081 10.1117 8.57955C10.088 8.62273 10.0731 8.67062 10.0681 8.72014C10.0625 8.77614 10.0743 8.83462 10.098 8.95167L10.7357 12.1042C10.8158 12.5 10.8558 12.6979 10.7992 12.8113C10.75 12.9099 10.6598 12.9786 10.5552 12.9972C10.4348 13.0185 10.2677 12.9175 9.93345 12.7154L7.27122 11.1052C7.17242 11.0454 7.12303 11.0156 7.07051 11.0039C7.02403 10.9936 6.97599 10.9936 6.92951 11.0039C6.87699 11.0156 6.82759 11.0454 6.7288 11.1052L4.06657 12.7154C3.73234 12.9175 3.56522 13.0185 3.44484 12.9972C3.34027 12.9786 3.25 12.9099 3.20085 12.8113C3.14427 12.6979 3.18429 12.5 3.26435 12.1042L3.90201 8.95167C3.92568 8.83462 3.93751 8.77614 3.9319 8.72014C3.92692 8.67062 3.91208 8.62273 3.88833 8.57955C3.8615 8.53081 3.81913 8.49075 3.7344 8.4107L1.45139 6.25325C1.16476 5.98238 1.02145 5.84698 1.00363 5.72033C0.988162 5.6103 1.02264 5.49902 1.09683 5.41955C1.18224 5.32805 1.3741 5.30682 1.75781 5.26436L4.81414 4.9261C4.92757 4.91355 4.98429 4.90727 5.03333 4.88436C5.07672 4.8641 5.11558 4.83449 5.14737 4.79748C5.1833 4.75565 5.20652 4.70103 5.25297 4.59178L6.5042 1.6483Z"
                                                        stroke="black"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex  items-start justify-between p-[10px]">
                                            <div>Good</div>
                                            <div className="flex w-[100px] items-center justify-between">
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M4.5 0C4.99706 0 5.4 0.402944 5.4 0.9V1.8H12.6V0.9C12.6 0.402944 13.0029 0 13.5 0C13.9971 0 14.4 0.402944 14.4 0.9V1.80002C14.8131 1.80028 15.1733 1.80282 15.4755 1.82751C15.8313 1.85658 16.1853 1.92076 16.5258 2.09429C17.0337 2.3531 17.4468 2.76611 17.7057 3.2742L17.7057 3.27431C17.8792 3.61482 17.9434 3.96869 17.9725 4.32447C18 4.66158 18 5.07086 18 5.54529V14.2547C18 14.7291 18 15.1384 17.9725 15.4755C17.9434 15.8313 17.8792 16.1852 17.7057 16.5257C17.4469 17.0338 17.0338 17.4469 16.5257 17.7057C16.1852 17.8792 15.8313 17.9434 15.4755 17.9725C15.1384 18 14.7291 18 14.2547 18H3.74529C3.27087 18 2.86158 18 2.52447 17.9725C2.16869 17.9434 1.81483 17.8792 1.47431 17.7057C0.966166 17.4469 0.553123 17.0338 0.294291 16.5258C0.120766 16.1853 0.0565843 15.8313 0.0275143 15.4755C-2.93026e-05 15.1384 -1.52951e-05 14.7291 7.72383e-07 14.2547V5.54531C-1.52951e-05 5.07087 -2.93026e-05 4.66159 0.0275145 4.32447C0.0565852 3.96867 0.0919921 3.61653 0.265502 3.276M3.78 3.6C3.2611 3.6 2.92606 3.6007 2.67106 3.62153C2.42656 3.64151 2.33591 3.67542 2.29142 3.69809C2.12208 3.78437 1.98438 3.92205 1.89811 4.09139C1.87543 4.13589 1.84151 4.22656 1.82154 4.47105C1.8007 4.72605 1.8 5.0611 1.8 5.58V14.22C1.8 14.7389 1.8007 15.0739 1.82154 15.329C1.84151 15.5735 1.87543 15.6641 1.89809 15.7086C1.98439 15.878 2.12208 16.0156 2.29133 16.1018L2.29143 16.1019C2.33592 16.1246 2.42656 16.1585 2.67106 16.1785C2.92606 16.1993 3.2611 16.2 3.78 16.2H14.22C14.7389 16.2 15.0739 16.1993 15.329 16.1785C15.5735 16.1585 15.6641 16.1246 15.7086 16.1019L15.7087 16.1019C15.8779 16.0156 16.0156 15.8779 16.1019 15.7087L16.1019 15.7086C16.1246 15.6641 16.1585 15.5735 16.1785 15.329C16.1993 15.0739 16.2 14.7389 16.2 14.22V5.58C16.2 5.0611 16.1993 4.72605 16.1785 4.47105C16.1585 4.22656 16.1246 4.13592 16.1019 4.09143L16.1019 4.09132C16.0156 3.92208 15.878 3.78439 15.7086 3.69809C15.6641 3.67543 15.5735 3.64151 15.329 3.62153C15.0739 3.6007 14.7389 3.6 14.22 3.6H3.78ZM3.6 7.2C3.6 6.70294 4.00294 6.3 4.5 6.3H13.5C13.9971 6.3 14.4 6.70294 14.4 7.2C14.4 7.69706 13.9971 8.1 13.5 8.1H4.5C4.00294 8.1 3.6 7.69706 3.6 7.2ZM3.6 10.8C3.6 10.3029 4.00294 9.9 4.5 9.9H9C9.49706 9.9 9.9 10.3029 9.9 10.8C9.9 11.2971 9.49706 11.7 9 11.7H4.5C4.00294 11.7 3.6 11.2971 3.6 10.8Z"
                                                        fill="#00B074"
                                                    ></path>
                                                </svg>
                                                <div>
                                                    <p class="text-gray-500 font-medium text-base mb-0">
                                                        27-Mar-25
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* card 1 */}
                                    </div>
                                    {/* card 2 */}
                                    <div
                                        className={`${
                                            nabVarOpen
                                                ? "bg-blue-50 rounded-xl p-3 mb-3 w-[420px] h-[100px] ml-[40px] mt-[20px]"
                                                : "bg-blue-50 rounded-xl p-3 mb-3 w-[505px] h-[100px] ml-[40px] mt-[20px]"
                                        } duration-300`}
                                    >
                                        <div className="flex  items-start justify-between p-[10px]">
                                            <div>
                                                <h5 className="m-0 fs-18 fw-semi-bold">
                                                    Md sojib mia
                                                </h5>
                                            </div>
                                            <div>
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.5042 1.6483C6.66128 1.27875 6.73986 1.09398 6.84924 1.03708C6.94423 0.987641 7.05578 0.987641 7.15078 1.03708C7.26016 1.09398 7.33873 1.27875 7.49581 1.6483L8.74703 4.59178C8.79351 4.70103 8.81672 4.75565 8.85268 4.79748C8.88444 4.83449 8.92332 4.8641 8.96668 4.88436C9.01573 4.90727 9.07246 4.91355 9.18591 4.9261L12.2422 5.26436C12.626 5.30682 12.8178 5.32805 12.9032 5.41955C12.9774 5.49902 13.0118 5.6103 12.9964 5.72033C12.9786 5.84698 12.8353 5.98238 12.5487 6.25325L10.2656 8.4107C10.1809 8.49075 10.1385 8.53081 10.1117 8.57955C10.088 8.62273 10.0731 8.67062 10.0681 8.72014C10.0625 8.77614 10.0743 8.83462 10.098 8.95167L10.7357 12.1042C10.8158 12.5 10.8558 12.6979 10.7992 12.8113C10.75 12.9099 10.6598 12.9786 10.5552 12.9972C10.4348 13.0185 10.2677 12.9175 9.93345 12.7154L7.27122 11.1052C7.17242 11.0454 7.12303 11.0156 7.07051 11.0039C7.02403 10.9936 6.97599 10.9936 6.92951 11.0039C6.87699 11.0156 6.82759 11.0454 6.7288 11.1052L4.06657 12.7154C3.73234 12.9175 3.56522 13.0185 3.44484 12.9972C3.34027 12.9786 3.25 12.9099 3.20085 12.8113C3.14427 12.6979 3.18429 12.5 3.26435 12.1042L3.90201 8.95167C3.92568 8.83462 3.93751 8.77614 3.9319 8.72014C3.92692 8.67062 3.91208 8.62273 3.88833 8.57955C3.8615 8.53081 3.81913 8.49075 3.7344 8.4107L1.45139 6.25325C1.16476 5.98238 1.02145 5.84698 1.00363 5.72033C0.988162 5.6103 1.02264 5.49902 1.09683 5.41955C1.18224 5.32805 1.3741 5.30682 1.75781 5.26436L4.81414 4.9261C4.92757 4.91355 4.98429 4.90727 5.03333 4.88436C5.07672 4.8641 5.11558 4.83449 5.14737 4.79748C5.1833 4.75565 5.20652 4.70103 5.25297 4.59178L6.5042 1.6483Z"
                                                        stroke="black"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex  items-start justify-between p-[10px]">
                                            <div>Good</div>
                                            <div className="flex w-[100px] items-center justify-between">
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M4.5 0C4.99706 0 5.4 0.402944 5.4 0.9V1.8H12.6V0.9C12.6 0.402944 13.0029 0 13.5 0C13.9971 0 14.4 0.402944 14.4 0.9V1.80002C14.8131 1.80028 15.1733 1.80282 15.4755 1.82751C15.8313 1.85658 16.1853 1.92076 16.5258 2.09429C17.0337 2.3531 17.4468 2.76611 17.7057 3.2742L17.7057 3.27431C17.8792 3.61482 17.9434 3.96869 17.9725 4.32447C18 4.66158 18 5.07086 18 5.54529V14.2547C18 14.7291 18 15.1384 17.9725 15.4755C17.9434 15.8313 17.8792 16.1852 17.7057 16.5257C17.4469 17.0338 17.0338 17.4469 16.5257 17.7057C16.1852 17.8792 15.8313 17.9434 15.4755 17.9725C15.1384 18 14.7291 18 14.2547 18H3.74529C3.27087 18 2.86158 18 2.52447 17.9725C2.16869 17.9434 1.81483 17.8792 1.47431 17.7057C0.966166 17.4469 0.553123 17.0338 0.294291 16.5258C0.120766 16.1853 0.0565843 15.8313 0.0275143 15.4755C-2.93026e-05 15.1384 -1.52951e-05 14.7291 7.72383e-07 14.2547V5.54531C-1.52951e-05 5.07087 -2.93026e-05 4.66159 0.0275145 4.32447C0.0565852 3.96867 0.0919921 3.61653 0.265502 3.276M3.78 3.6C3.2611 3.6 2.92606 3.6007 2.67106 3.62153C2.42656 3.64151 2.33591 3.67542 2.29142 3.69809C2.12208 3.78437 1.98438 3.92205 1.89811 4.09139C1.87543 4.13589 1.84151 4.22656 1.82154 4.47105C1.8007 4.72605 1.8 5.0611 1.8 5.58V14.22C1.8 14.7389 1.8007 15.0739 1.82154 15.329C1.84151 15.5735 1.87543 15.6641 1.89809 15.7086C1.98439 15.878 2.12208 16.0156 2.29133 16.1018L2.29143 16.1019C2.33592 16.1246 2.42656 16.1585 2.67106 16.1785C2.92606 16.1993 3.2611 16.2 3.78 16.2H14.22C14.7389 16.2 15.0739 16.1993 15.329 16.1785C15.5735 16.1585 15.6641 16.1246 15.7086 16.1019L15.7087 16.1019C15.8779 16.0156 16.0156 15.8779 16.1019 15.7087L16.1019 15.7086C16.1246 15.6641 16.1585 15.5735 16.1785 15.329C16.1993 15.0739 16.2 14.7389 16.2 14.22V5.58C16.2 5.0611 16.1993 4.72605 16.1785 4.47105C16.1585 4.22656 16.1246 4.13592 16.1019 4.09143L16.1019 4.09132C16.0156 3.92208 15.878 3.78439 15.7086 3.69809C15.6641 3.67543 15.5735 3.64151 15.329 3.62153C15.0739 3.6007 14.7389 3.6 14.22 3.6H3.78ZM3.6 7.2C3.6 6.70294 4.00294 6.3 4.5 6.3H13.5C13.9971 6.3 14.4 6.70294 14.4 7.2C14.4 7.69706 13.9971 8.1 13.5 8.1H4.5C4.00294 8.1 3.6 7.69706 3.6 7.2ZM3.6 10.8C3.6 10.3029 4.00294 9.9 4.5 9.9H9C9.49706 9.9 9.9 10.3029 9.9 10.8C9.9 11.2971 9.49706 11.7 9 11.7H4.5C4.00294 11.7 3.6 11.2971 3.6 10.8Z"
                                                        fill="#00B074"
                                                    ></path>
                                                </svg>
                                                <div>
                                                    <p class="text-gray-500 font-medium text-base mb-0">
                                                        27-Mar-25
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* card 1 */}
                                    </div>
                                    {/* card 3 */}
                                    <div
                                        className={`${
                                            nabVarOpen
                                                ? "bg-blue-50 rounded-xl p-3 mb-3 w-[420px] h-[100px] ml-[40px] mt-[20px]"
                                                : "bg-blue-50 rounded-xl p-3 mb-3 w-[505px] h-[100px] ml-[40px] mt-[20px]"
                                        } duration-300`}
                                    >
                                        <div className="flex  items-start justify-between p-[10px]">
                                            <div>
                                                <h5 className="m-0 fs-18 fw-semi-bold">
                                                    Md sojib mia
                                                </h5>
                                            </div>
                                            <div>
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.5042 1.6483C6.66128 1.27875 6.73986 1.09398 6.84924 1.03708C6.94423 0.987641 7.05578 0.987641 7.15078 1.03708C7.26016 1.09398 7.33873 1.27875 7.49581 1.6483L8.74703 4.59178C8.79351 4.70103 8.81672 4.75565 8.85268 4.79748C8.88444 4.83449 8.92332 4.8641 8.96668 4.88436C9.01573 4.90727 9.07246 4.91355 9.18591 4.9261L12.2422 5.26436C12.626 5.30682 12.8178 5.32805 12.9032 5.41955C12.9774 5.49902 13.0118 5.6103 12.9964 5.72033C12.9786 5.84698 12.8353 5.98238 12.5487 6.25325L10.2656 8.4107C10.1809 8.49075 10.1385 8.53081 10.1117 8.57955C10.088 8.62273 10.0731 8.67062 10.0681 8.72014C10.0625 8.77614 10.0743 8.83462 10.098 8.95167L10.7357 12.1042C10.8158 12.5 10.8558 12.6979 10.7992 12.8113C10.75 12.9099 10.6598 12.9786 10.5552 12.9972C10.4348 13.0185 10.2677 12.9175 9.93345 12.7154L7.27122 11.1052C7.17242 11.0454 7.12303 11.0156 7.07051 11.0039C7.02403 10.9936 6.97599 10.9936 6.92951 11.0039C6.87699 11.0156 6.82759 11.0454 6.7288 11.1052L4.06657 12.7154C3.73234 12.9175 3.56522 13.0185 3.44484 12.9972C3.34027 12.9786 3.25 12.9099 3.20085 12.8113C3.14427 12.6979 3.18429 12.5 3.26435 12.1042L3.90201 8.95167C3.92568 8.83462 3.93751 8.77614 3.9319 8.72014C3.92692 8.67062 3.91208 8.62273 3.88833 8.57955C3.8615 8.53081 3.81913 8.49075 3.7344 8.4107L1.45139 6.25325C1.16476 5.98238 1.02145 5.84698 1.00363 5.72033C0.988162 5.6103 1.02264 5.49902 1.09683 5.41955C1.18224 5.32805 1.3741 5.30682 1.75781 5.26436L4.81414 4.9261C4.92757 4.91355 4.98429 4.90727 5.03333 4.88436C5.07672 4.8641 5.11558 4.83449 5.14737 4.79748C5.1833 4.75565 5.20652 4.70103 5.25297 4.59178L6.5042 1.6483Z"
                                                        stroke="black"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex  items-start justify-between p-[10px]">
                                            <div>Good</div>
                                            <div className="flex w-[100px] items-center justify-between">
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M4.5 0C4.99706 0 5.4 0.402944 5.4 0.9V1.8H12.6V0.9C12.6 0.402944 13.0029 0 13.5 0C13.9971 0 14.4 0.402944 14.4 0.9V1.80002C14.8131 1.80028 15.1733 1.80282 15.4755 1.82751C15.8313 1.85658 16.1853 1.92076 16.5258 2.09429C17.0337 2.3531 17.4468 2.76611 17.7057 3.2742L17.7057 3.27431C17.8792 3.61482 17.9434 3.96869 17.9725 4.32447C18 4.66158 18 5.07086 18 5.54529V14.2547C18 14.7291 18 15.1384 17.9725 15.4755C17.9434 15.8313 17.8792 16.1852 17.7057 16.5257C17.4469 17.0338 17.0338 17.4469 16.5257 17.7057C16.1852 17.8792 15.8313 17.9434 15.4755 17.9725C15.1384 18 14.7291 18 14.2547 18H3.74529C3.27087 18 2.86158 18 2.52447 17.9725C2.16869 17.9434 1.81483 17.8792 1.47431 17.7057C0.966166 17.4469 0.553123 17.0338 0.294291 16.5258C0.120766 16.1853 0.0565843 15.8313 0.0275143 15.4755C-2.93026e-05 15.1384 -1.52951e-05 14.7291 7.72383e-07 14.2547V5.54531C-1.52951e-05 5.07087 -2.93026e-05 4.66159 0.0275145 4.32447C0.0565852 3.96867 0.0919921 3.61653 0.265502 3.276M3.78 3.6C3.2611 3.6 2.92606 3.6007 2.67106 3.62153C2.42656 3.64151 2.33591 3.67542 2.29142 3.69809C2.12208 3.78437 1.98438 3.92205 1.89811 4.09139C1.87543 4.13589 1.84151 4.22656 1.82154 4.47105C1.8007 4.72605 1.8 5.0611 1.8 5.58V14.22C1.8 14.7389 1.8007 15.0739 1.82154 15.329C1.84151 15.5735 1.87543 15.6641 1.89809 15.7086C1.98439 15.878 2.12208 16.0156 2.29133 16.1018L2.29143 16.1019C2.33592 16.1246 2.42656 16.1585 2.67106 16.1785C2.92606 16.1993 3.2611 16.2 3.78 16.2H14.22C14.7389 16.2 15.0739 16.1993 15.329 16.1785C15.5735 16.1585 15.6641 16.1246 15.7086 16.1019L15.7087 16.1019C15.8779 16.0156 16.0156 15.8779 16.1019 15.7087L16.1019 15.7086C16.1246 15.6641 16.1585 15.5735 16.1785 15.329C16.1993 15.0739 16.2 14.7389 16.2 14.22V5.58C16.2 5.0611 16.1993 4.72605 16.1785 4.47105C16.1585 4.22656 16.1246 4.13592 16.1019 4.09143L16.1019 4.09132C16.0156 3.92208 15.878 3.78439 15.7086 3.69809C15.6641 3.67543 15.5735 3.64151 15.329 3.62153C15.0739 3.6007 14.7389 3.6 14.22 3.6H3.78ZM3.6 7.2C3.6 6.70294 4.00294 6.3 4.5 6.3H13.5C13.9971 6.3 14.4 6.70294 14.4 7.2C14.4 7.69706 13.9971 8.1 13.5 8.1H4.5C4.00294 8.1 3.6 7.69706 3.6 7.2ZM3.6 10.8C3.6 10.3029 4.00294 9.9 4.5 9.9H9C9.49706 9.9 9.9 10.3029 9.9 10.8C9.9 11.2971 9.49706 11.7 9 11.7H4.5C4.00294 11.7 3.6 11.2971 3.6 10.8Z"
                                                        fill="#00B074"
                                                    ></path>
                                                </svg>
                                                <div>
                                                    <p class="text-gray-500 font-medium text-base mb-0">
                                                        27-Mar-25
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* card 1 */}
                                    </div>
                                </div>
                                <div className="mt-[30px]">
                                    <hr />
                                </div>
                                <div>
                                    <a
                                        href=""
                                        class="flex mt-[20px] gap-1 items-center justify-center text-sm font-semibold"
                                    >
                                        See More
                                    </a>
                                </div>
                                {/* main content */}
                            </div>
                        </div>
                        {/* card one */}
                        {/* card two */}
                        <div
                            className={`${
                                nabVarOpen
                                    ? "h-[560px] bg-[#fff] w-[800px] mt-[27px] ml-[20px] rounded-lg"
                                    : "h-[560px] bg-[#fff] w-[900px] mt-[27px] ml-[20px] rounded-lg"
                            } duration-300`}
                        >
                            <div class="flex items-center justify-between gap-3 border-b p-4 bg-white shadow-sm">
                                <h5 class="m-0 text-lg font-semibold">
                                    Employee award list
                                </h5>
                                <a
                                    href=""
                                    class="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-medium shadow hover:bg-green-700 transition"
                                >
                                    <i class="fa fa-list"></i>
                                    <span>Award list</span>
                                </a>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full border-collapse border border-gray-200 bg-white shadow-md">
                                    <thead class="bg-gray-100">
                                        <tr class="text-left text-gray-700">
                                            <th class="border border-gray-200 px-4 py-2">
                                                Sl.
                                            </th>
                                            <th class="border border-gray-200 px-4 py-2">
                                                Image
                                            </th>
                                            <th class="border border-gray-200 px-4 py-2">
                                                Name
                                            </th>
                                            <th class="border border-gray-200 px-4 py-2">
                                                Department Name
                                            </th>
                                            <th class="border border-gray-200 px-4 py-2">
                                                Award Name
                                            </th>
                                            <th class="border border-gray-200 px-4 py-2">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border border-gray-200 text-gray-800">
                                            <td class="px-4 py-2 border">1</td>
                                            <td class="px-4 py-2 border">
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmLWXK74WBuGuRhNjAe4HmpbxsyiI-vjjCQ&s"
                                                    alt=""
                                                    className="w-12 h-12 rounded-lg"
                                                />
                                            </td>
                                            <td class="px-4 py-2 border">
                                                Maisha Lucy Zamora Gonzales
                                            </td>
                                            <td class="px-4 py-2 border"></td>
                                            <td class="px-4 py-2 border">
                                                <div class="flex items-center gap-2">
                                                    <svg
                                                        width="13"
                                                        height="14"
                                                        viewBox="0 0 13 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12.5 1.96079C12.4989 1.73361 12.4082 1.51604 12.2475 1.3554C12.0869 1.19476 11.8693 1.10403 11.6422 1.10294H10.8334V0.539218C10.8336 0.468348 10.8198 0.39814 10.7927 0.332628C10.7657 0.267117 10.726 0.207595 10.6759 0.157485C10.6258 0.107374 10.5662 0.0676646 10.5007 0.0406381C10.4352 0.0136117 10.365 -0.000198383 10.2941 2.15301e-06H2.20588C2.13501 -0.000198383 2.0648 0.0136117 1.99929 0.0406381C1.93377 0.0676646 1.87425 0.107374 1.82413 0.157485C1.77402 0.207595 1.7343 0.267117 1.70727 0.332628C1.68024 0.39814 1.66642 0.468348 1.66662 0.539218V1.10294H0.857843C0.630664 1.10403 0.4131 1.19476 0.252458 1.3554C0.0918167 1.51604 0.00108781 1.73361 1.07562e-08 1.96079V6.45585C-3.18389e-05 6.65689 0.0706686 6.85153 0.199718 7.00569C0.328768 7.15985 0.50794 7.26369 0.705853 7.29902L4.54868 7.995C4.7036 8.2936 4.81119 8.61445 4.86761 8.94608L5.08985 10.2902C4.72009 10.3369 4.37738 10.5086 4.11857 10.7767C3.85976 11.0449 3.70039 11.3935 3.6669 11.7647H3.18627C3.05627 11.7647 2.93158 11.8164 2.83965 11.9083C2.74772 12.0002 2.69608 12.1249 2.69608 12.2549V13.1127C2.69608 13.2428 2.74772 13.3674 2.83965 13.4594C2.93158 13.5513 3.05627 13.6029 3.18627 13.6029H9.31373C9.44373 13.6029 9.56842 13.5513 9.66035 13.4594C9.75228 13.3674 9.80392 13.2428 9.80392 13.1127V12.2549C9.80392 12.1249 9.75228 12.0002 9.66035 11.9083C9.56842 11.8164 9.44373 11.7647 9.31373 11.7647H8.8331C8.79961 11.3935 8.64024 11.0449 8.38143 10.7767C8.12262 10.5086 7.77991 10.3369 7.41015 10.2902L7.63239 8.94608C7.68881 8.61445 7.7964 8.2936 7.95132 7.99501L11.7941 7.29902C11.9921 7.26369 12.1712 7.15985 12.3003 7.00569C12.4293 6.85153 12.5 6.65689 12.5 6.45585V1.96079ZM4.53431 2.7549H5.41669C5.45642 2.75542 5.49539 2.74402 5.52858 2.72217C5.56177 2.70033 5.58766 2.66905 5.60291 2.63235L6.04906 1.59314C6.06501 1.55704 6.09111 1.52635 6.12418 1.5048C6.15725 1.48326 6.19587 1.47179 6.23534 1.47179C6.27481 1.47179 6.31343 1.48326 6.3465 1.5048C6.37957 1.52635 6.40566 1.55704 6.42161 1.59314L6.86765 2.63235C6.88401 2.66826 6.91019 2.69881 6.94315 2.72049C6.97612 2.74217 7.01454 2.7541 7.05398 2.7549H7.93624C7.97874 2.75426 8.02038 2.767 8.05525 2.79131C8.09011 2.81563 8.11646 2.85029 8.13055 2.8904C8.14464 2.9305 8.14577 2.97402 8.13377 3.0148C8.12177 3.05559 8.09726 3.09156 8.06369 3.11765L7.29406 3.7353C7.2623 3.76022 7.23877 3.79412 7.22654 3.83259C7.21431 3.87106 7.21395 3.91233 7.22549 3.95101L7.57843 5.12743C7.59178 5.16833 7.59177 5.21242 7.57841 5.25332C7.56504 5.29421 7.539 5.32979 7.50407 5.35491C7.46913 5.38002 7.42711 5.39337 7.38409 5.39301C7.34106 5.39265 7.29927 5.37861 7.26476 5.35292L6.35784 4.67157C6.32239 4.64528 6.27943 4.63109 6.23529 4.63109C6.19116 4.63109 6.1482 4.64528 6.11275 4.67157L5.21074 5.35289C5.17591 5.37829 5.13398 5.39211 5.09087 5.39241C5.04776 5.39271 5.00565 5.37948 4.97046 5.35457C4.93527 5.32967 4.90879 5.29435 4.89474 5.25359C4.88069 5.21283 4.87979 5.1687 4.89216 5.1274L5.2451 3.95098C5.2578 3.91238 5.25801 3.87076 5.24569 3.83204C5.23337 3.79332 5.20916 3.75947 5.1765 3.7353L4.40686 3.11765C4.3738 3.09131 4.34976 3.05534 4.33807 3.01472C4.32638 2.9741 4.32763 2.93085 4.34164 2.89097C4.35566 2.85109 4.38173 2.81657 4.41626 2.79218C4.45079 2.7678 4.49205 2.75477 4.53431 2.7549ZM0.735294 6.45585V1.96079C0.735129 1.94465 0.738186 1.92864 0.744286 1.91369C0.750386 1.89875 0.759407 1.88518 0.77082 1.87376C0.782232 1.86235 0.795808 1.85333 0.810751 1.84723C0.825694 1.84113 0.841704 1.83807 0.857843 1.83824H1.66662V3.85785C1.66616 4.39528 1.8 4.92432 2.05599 5.39688C2.31198 5.86944 2.682 6.27054 3.13242 6.56373L3.44609 6.77454C3.60439 6.87972 3.75317 6.99857 3.8907 7.12974L0.838235 6.57349C0.809911 6.56928 0.784007 6.55513 0.76515 6.53358C0.746293 6.51203 0.735711 6.48448 0.735294 6.45585ZM11.7647 6.45585C11.7643 6.48449 11.7537 6.51205 11.7349 6.53361C11.716 6.55516 11.6901 6.5693 11.6618 6.57349L8.60931 7.12975C8.74685 6.99858 8.89562 6.87972 9.05392 6.77455L9.36759 6.56373C9.81801 6.27054 10.188 5.86944 10.444 5.39688C10.7 4.92432 10.8338 4.39528 10.8334 3.85785V1.83824H11.6422C11.6583 1.83807 11.6743 1.84113 11.6892 1.84723C11.7042 1.85333 11.7178 1.86235 11.7292 1.87376C11.7406 1.88518 11.7496 1.89875 11.7557 1.91369C11.7618 1.92864 11.7649 1.94465 11.7647 1.96079V6.45585Z"
                                                            fill="#F7C604"
                                                        ></path>
                                                    </svg>
                                                    <span>Team Son</span>
                                                </div>
                                            </td>
                                            <td class="px-4 py-2 border">
                                                17-02-2025
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* card two */}
                    </div>
                    <div>
                        <footer className="bg-[#fff] mt-[20px] h-[60px]  rounded-lg ml-[10px]">
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
        </>
    );
};

export default Heder;
