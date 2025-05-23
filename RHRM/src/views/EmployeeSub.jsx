import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
    faFilter,
    faList,
    faKey,
    faInfoCircle,
    faAddressCard,
    faInfo,
} from "@fortawesome/free-solid-svg-icons";

// fontawesome Icon Ends
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/Contextsprovider";
import axiosClient from "../axiosClient";
import { motion } from "framer-motion";
import axios from "axios";
import MainEmployList from "../lib/MainEmployList";
// import Employe Sub
import EmployeeSubOne from "../lib/EmployeeAll/EmployeeSubOne";

// try navbar toggle
// try navbar toggle
// show navbar

// hide
const pictures = [
    "https://hrm.bdtask-demoserver.com/storage/application/1716900096sidebar-logo.png",
    "https://hrm.bdtask-demoserver.com/storage/application/1716900212sidebar-collapsed-logo.png",
];

const EmployeeSub = () => {
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
    // active link

    // State to track which link is active

    const links = [
        { id: 1, name: "Employee", url: "/employee/sub" },
        { id: 2, name: "Position list", url: "/employee/position" },
        {
            id: 3,
            name: "Employee performance list",
            url: "/employee/performance",
        },
    ];
    const navigate = useNavigate();
    // attendance Ends
    const [active, setActive] = useState(links[0].id);
    // attendance now
    const [showInput, setShowInput] = useState(false);
    // click Filter1
    const [isActive, setIsActive] = useState(false);
    const [searchTextInput, setSearchTextInput] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([
        "Select employee",
        "Honorato Imogene Curry Terry",
        "Maisha Lucy Zamora Gonzales",
        "Amy Aphrodite Zamora Peck",
        "Jonathan Ibrahim Shekh",
        "Scarlet Melvin Reese Rogers",
        "Arnika Paula Roach Mcmillan",
        "Suchana Noel Mcfarland Mejia",
        "Aquila Elaine Jennings Jefferson",
        "Kristen Lillith Stout Rodriquez",
        "Nell Mohona Lacey Byers Lewis",
        "Devin Aimee Valentine Castro",
        "Inga Rose Dennis Robbins",
        "Jerome Grace Willis Terry",
        "Ora Caryn Garcia Cardenas",
        "Flavia Xandra Stafford Pennington",
        "Adena Dominic Guthrie Rocha",
        "Kieran Thane Aguilar Larson",
        "Whoopi Julian Mcleod Haynes",
        "Abra Nelle Barron Hyde",
        "Oleg Hall Larson Sloan",
        "Odysseus Glover",
        "Dawn Cobb",
        "Jaquelyn White",
        "Thomas Goodman",
        "Iman",
        "Khubaib Ahmed",
        "Uma Stafford",
        "Mohmed Afif Akram",
        "Ch. Monalisa Subudhi",
    ]);

    const divRef = useRef(null);

    // Handle clicking outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearchTextInput(searchText);

        // Filter the options based on search text
        const filtered = [
            "Select employee",
            "Honorato Imogene Curry Terry",
            "Maisha Lucy Zamora Gonzales",
            "Amy Aphrodite Zamora Peck",
            "Jonathan Ibrahim Shekh",
            "Scarlet Melvin Reese Rogers",
            "Arnika Paula Roach Mcmillan",
            "Suchana Noel Mcfarland Mejia",
            "Aquila Elaine Jennings Jefferson",
            "Kristen Lillith Stout Rodriquez",
            "Nell Mohona Lacey Byers Lewis",
            "Devin Aimee Valentine Castro",
            "Inga Rose Dennis Robbins",
            "Jerome Grace Willis Terry",
            "Ora Caryn Garcia Cardenas",
            "Flavia Xandra Stafford Pennington",
            "Adena Dominic Guthrie Rocha",
            "Kieran Thane Aguilar Larson",
            "Whoopi Julian Mcleod Haynes",
            "Abra Nelle Barron Hyde",
            "Oleg Hall Larson Sloan",
            "Odysseus Glover",
            "Dawn Cobb",
            "Jaquelyn White",
            "Thomas Goodman",
            "Iman",
            "Khubaib Ahmed",
            "Uma Stafford",
            "Mohmed Afif Akram",
            "Ch. Monalisa Subudhi",
        ].filter((option) =>
            option.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredOptions(filtered);
    };

    const handleSelectOption = (option) => {
        setSearchTextInput(option); // Set the selected option to the input field

        // Add the selected option to the filtered options list if it doesn't exist already
        setFilteredOptions((prevOptions) => {
            if (!prevOptions.includes(option)) {
                return [...prevOptions, option]; // Add new option to the list
            }
            return prevOptions;
        });

        setIsActive(false); // Close the dropdown after selection
    };
    // filter 1
    // filter 2
    const [isActive2, setIsActive2] = useState(false);
    const [searchTextInput2, setSearchTextInput2] = useState("");
    const [filteredOptions2, setFilteredOptions2] = useState([
        "000001",
        "000002",
        "000003",
        "000004",
        "000005",
        "000006",
        "000007",
        "000008",
        "000009",
        "0000010",
    ]);

    const divRef2 = useRef(null);
    // Handle clicking outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef2.current && !divRef2.current.contains(event.target)) {
                setIsActive2(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearc2 = (e) => {
        const searchText = e.target.value;
        setSearchTextInput2(searchText);

        // Filter the options based on search text
        const filtered2 = [
            "000001",
            "000002",
            "000003",
            "000004",
            "000005",
            "000006",
            "000007",
            "000008",
            "000009",
            "0000010",
        ].filter((option) =>
            option.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredOptions2(filtered2);
    };

    const handleSelectOption2 = (option) => {
        setSearchTextInput2(option); // Set the selected option to the input field

        // Add the selected option to the filtered options list if it doesn't exist already
        setFilteredOptions2((prevOptions) => {
            if (!prevOptions.includes(option)) {
                return [...prevOptions, option]; // Add new option to the list
            }
            return prevOptions;
        });

        setIsActive2(false); // Close the dropdown after selection
    };
    // filter 2
    // filter 3
    const [isActive3, setIsActive3] = useState(false);
    const [searchTextInput3, setSearchTextInput3] = useState("");
    const [filteredOptions3, setFilteredOptions3] = useState([
        "Intern",
        "Contractual",
        "Full Time",
        "Remote",
    ]);

    const divRef3 = useRef(null);
    // Handle clicking outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef3.current && !divRef3.current.contains(event.target)) {
                setIsActive3(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearc3 = (e) => {
        const searchText = e.target.value;
        setSearchTextInput3(searchText);

        // Filter the options based on search text
        const filtered3 = [
            "000001",
            "000002",
            "000003",
            "000004",
            "000005",
            "000006",
            "000007",
            "000008",
            "000009",
            "0000010",
        ].filter((option) =>
            option.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredOptions3(filtered3);
    };

    const handleSelectOption3 = (option) => {
        setSearchTextInput3(option); // Set the selected option to the input field

        // Add the selected option to the filtered options list if it doesn't exist already
        setFilteredOptions3((prevOptions) => {
            if (!prevOptions.includes(option)) {
                return [...prevOptions, option]; // Add new option to the list
            }
            return prevOptions;
        });

        setIsActive3(false); // Close the dropdown after selection
    };
    // filter 3
    // filter 4
    const [isActive4, setIsActive4] = useState(false);
    const [searchTextInput4, setSearchTextInput4] = useState("");
    const [filteredOptions4, setFilteredOptions4] = useState([
        "All department",
        "Design",
        "SOJIB",
        "Consulting",
        "Hr",
        "Finance 2",
        "ABC",
        "Safety, Security",
        "Designing",
        "Software Support Engineer",
        "Technical",
        "Finance",
        "Admin",
        "Restaurants",
        "Production",
        "Electrical",
    ]);

    const divRef4 = useRef(null);
    // Handle clicking outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef4.current && !divRef4.current.contains(event.target)) {
                setIsActive4(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearc4 = (e) => {
        const searchText = e.target.value;
        setSearchTextInput4(searchText);

        // Filter the options based on search text
        const filtered4 = [
            "All department",
            "Design",
            "SOJIB",
            "Consulting",
            "Hr",
            "Finance 2",
            "ABC",
            "Safety, Security",
            "Designing",
            "Software Support Engineer",
            "Technical",
            "Finance",
            "Admin",
            "Restaurants",
            "Production",
            "Electrical",
        ].filter((option) =>
            option.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredOptions4(filtered4);
    };

    const handleSelectOption4 = (option) => {
        setSearchTextInput4(option); // Set the selected option to the input field

        // Add the selected option to the filtered options list if it doesn't exist already
        setFilteredOptions4((prevOptions) => {
            if (!prevOptions.includes(option)) {
                return [...prevOptions, option]; // Add new option to the list
            }
            return prevOptions;
        });

        setIsActive4(false); // Close the dropdown after selection
    };
    // filter 4
    // filter 5
    const [isActive5, setIsActive5] = useState(false);
    const [searchTextInput5, setSearchTextInput5] = useState("");
    const [filteredOptions5, setFilteredOptions5] = useState([
        "All designation",
        "Drivers",
        "Cooks",
        "IT Manager",
        "Engineer",
    ]);

    const divRef5 = useRef(null);
    // Handle clicking outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef5.current && !divRef5.current.contains(event.target)) {
                setIsActive5(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearc5 = (e) => {
        const searchText = e.target.value;
        setSearchTextInput5(searchText);

        // Filter the options based on search text
        const filtered5 = [
            "All designation",
            "Drivers",
            "Cooks",
            "IT Manager",
            "Engineer",
        ].filter((option) =>
            option.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredOptions5(filtered5);
    };

    const handleSelectOption5 = (option) => {
        setSearchTextInput5(option); // Set the selected option to the input field

        // Add the selected option to the filtered options list if it doesn't exist already
        setFilteredOptions5((prevOptions) => {
            if (!prevOptions.includes(option)) {
                return [...prevOptions, option]; // Add new option to the list
            }
            return prevOptions;
        });

        setIsActive5(false); // Close the dropdown after selection
    };
    // filter 5
    // filter 6
    const [isActive6, setIsActive6] = useState(false);
    const [searchTextInput6, setSearchTextInput6] = useState("");
    const [filteredOptions6, setFilteredOptions6] = useState([
        "All blood group",
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
    ]);

    const divRef6 = useRef(null);
    // Handle clicking outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef6.current && !divRef6.current.contains(event.target)) {
                setIsActive6(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearc6 = (e) => {
        const searchText = e.target.value;
        setSearchTextInput6(searchText);

        // Filter the options based on search text
        const filtered6 = [
            "All blood group",
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-",
        ].filter((option) =>
            option.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredOptions6(filtered6);
    };

    const handleSelectOption6 = (option) => {
        setSearchTextInput6(option); // Set the selected option to the input field

        // Add the selected option to the filtered options list if it doesn't exist already
        setFilteredOptions6((prevOptions) => {
            if (!prevOptions.includes(option)) {
                return [...prevOptions, option]; // Add new option to the list
            }
            return prevOptions;
        });

        setIsActive6(false); // Close the dropdown after selection
    };
    // filter 6
    // filter 7
    const [isActive7, setIsActive7] = useState(false);
    const [searchTextInput7, setSearchTextInput7] = useState("");
    const [filteredOptions7, setFilteredOptions7] = useState([
        "All blood group",
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
    ]);

    const divRef7 = useRef(null);
    // Handle clicking outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef7.current && !divRef7.current.contains(event.target)) {
                setIsActive7(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearc7 = (e) => {
        const searchText = e.target.value;
        setSearchTextInput7(searchText);

        // Filter the options based on search text
        const filtered7 = [
            "All blood group",
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-",
        ].filter((option) =>
            option.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredOptions7(filtered7);
    };

    const handleSelectOption7 = (option) => {
        setSearchTextInput7(option); // Set the selected option to the input field

        // Add the selected option to the filtered options list if it doesn't exist already
        setFilteredOptions7((prevOptions) => {
            if (!prevOptions.includes(option)) {
                return [...prevOptions, option]; // Add new option to the list
            }
            return prevOptions;
        });

        setIsActive7(false); // Close the dropdown after selection
    };
    // filter 7
    // filter 8
    const [isActive8, setIsActive8] = useState(false);
    const [searchTextInput8, setSearchTextInput8] = useState("");
    const [filteredOptions8, setFilteredOptions8] = useState([
        "All gender",
        "Transgender",
        "Female",
        "Male",
    ]);

    const divRef8 = useRef(null);
    // Handle clicking outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef8.current && !divRef8.current.contains(event.target)) {
                setIsActive8(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearc8 = (e) => {
        const searchText = e.target.value;
        setSearchTextInput8(searchText);

        // Filter the options based on search text
        const filtered8 = [
            "All gender",
            "Transgender",
            "Female",
            "Male",
        ].filter((option) =>
            option.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredOptions8(filtered8);
    };

    const handleSelectOption8 = (option) => {
        setSearchTextInput8(option); // Set the selected option to the input field

        // Add the selected option to the filtered options list if it doesn't exist already
        setFilteredOptions8((prevOptions) => {
            if (!prevOptions.includes(option)) {
                return [...prevOptions, option]; // Add new option to the list
            }
            return prevOptions;
        });

        setIsActive8(false); // Close the dropdown after selection
    };
    // filter 8
    // filter 9
    const [isActive9, setIsActive9] = useState(false);
    const [searchTextInput9, setSearchTextInput9] = useState("");
    const [filteredOptions9, setFilteredOptions9] = useState([
        "All gender",
        "Transgender",
        "Female",
        "Male",
    ]);

    const divRef9 = useRef(null);
    // Handle clicking outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef9.current && !divRef9.current.contains(event.target)) {
                setIsActive9(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearc9 = (e) => {
        const searchText = e.target.value;
        setSearchTextInput9(searchText);

        // Filter the options based on search text
        const filtered9 = [
            "All gender",
            "Transgender",
            "Female",
            "Male",
        ].filter((option) =>
            option.toLowerCase().includes(searchText.toLowerCase())
        );

        setFilteredOptions9(filtered9);
    };

    const handleSelectOption9 = (option) => {
        setSearchTextInput9(option); // Set the selected option to the input field

        // Add the selected option to the filtered options list if it doesn't exist already
        setFilteredOptions9((prevOptions) => {
            if (!prevOptions.includes(option)) {
                return [...prevOptions, option]; // Add new option to the list
            }
            return prevOptions;
        });

        setIsActive9(false); // Close the dropdown after selection
    };
    // filter 9
    // click Filter
    // Add employee Form
    const [searchTerm, setSearchTerm] = useState("");

    const handleOutsideClick = (event) => {
        if (
            !event.target.closest(".dropdown-container") &&
            !event.target.closest("#searchInput")
        ) {
            setIsCountryDropdownVisible(false);
        }
        if (
            !event.target.closest(".attendance-dropdown-container") &&
            !event.target.closest("#attendanceInput")
        ) {
            setIsAttendanceDropdownVisible(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const [showForm, setShowForm] = useState(false);
    // Add employee Form
    // add list Employee form
    const countriesName = [
        "Bangladesh",
        "India",
        "United States",
        "United Kingdom",
        "Canada",
        "Australia",
        "Germany",
        "France",
        "China",
        "Japan",
        "Brazil",
        "Italy",
        "Spain",
    ];

    const attendanceOptionsName = [
        "Normal Shift General",
        "General Shift",
        "Regular Working Days",
    ];
    const [selectedCountryName, setSelectedCountryName] = useState("");
    const [countryDropdownName, setCountryDropdownName] = useState(false);
    const [filteredCountriesName, setFilteredCountriesName] =
        useState(countriesName);
    const [selectedAttendanceName, setSelectedAttendanceName] = useState("");
    const [attendanceDropdownName, setAttendanceDropdownName] = useState(false);

    const filterCountriesName = (event) => {
        const searchText = event.target.value.toLowerCase();
        setFilteredCountriesName(
            countries.filter((country) =>
                country.toLowerCase().includes(searchText)
            )
        );
    };
    const dropdownRef = useRef(null);

    // All remove
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setCountryDropdownName(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const dropdownRef1 = useRef(null); // ✅ এখানে ঠিকভাবে ইনিশিয়ালাইজ করা হয়েছে।

    // যেকোনো জায়গায় ক্লিক করলে ড্রপডাউন বন্ধ করার জন্য useEffect ব্যবহার
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef1.current &&
                !dropdownRef1.current.contains(event.target)
            ) {
                setAttendanceDropdownName(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title> Employee list</title>
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
                {/* Position list */}

                {/* position list */}
                <div
                    className={`${
                        nabVarOpen
                            ? "fixed top-[10%] left-[17%] w-[82vw] h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 relative xs:w-[40vw]  md:w-[60vw] md:[left:35%] md1:w-[64vw] md1:[left:33%] md2:w-[65vw] md2:[left:33%] md3:w-[66vw] md3:[left:30%] md4:w-[66vw] md4:[left:28%] md5:w-[66vw] md5:[left:30%] lg:w-[69vw] lg:[left:27%] lg2:w-[72vw] lg2:[left:25%] lg3:w-[72vw] lg3:[left:23%] xl1:w-[72vw] xl1:[left:20%] xl:w-[72vw] xl:[left:22%] xxll:w-[73vw] xxll:[left:18%]  xxl1:w-[75vw]  xxl1:[left:20%] xxl2:w-[77vw] xxl2:[left:16%]  "
                            : "fixed top-[10%] left-[17%] w-[82vw] h-[100vh] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 relative xs:w-[40vw]  md:w-[83vw] md:[left:12%] md1:w-[83vw] md1:[left:12%] md2:w-[83vw] md2:[left:12%] md3:w-[83vw] md3:[left:12%] md4:w-[83vw] md4:[left:12%] md5:w-[83vw] md5:[left:12%] lg:w-[83vw] lg:[left:12%] lg2:w-[82vw] lg2:[left:12%] lg3:w-[82vw] lg3:[left:12%] xl1:w-[82vw] xl1:[left:12%] xl:w-[82vw] xl:[left:12%] xxll:w-[82vw] xxll:[left:12%]  xxl1:w-[87vw]  xxl1:[left:7%] xxl2:w-[87vw] xxl2:[left:7%]"
                    } duration-300 no-scrollbar `}
                >
                    <div className="sticky mt-[100px] h-[auto] p-2 z-10 flex items-start justify-between rounded-[12px]">
                        <div className="w-full">
                            <div className="flex items-center justify-between w-full h-[80px] pr-[10px] bg-[white] rounded-[12px] pl-[10px] relative  p-2">
                                <div className="flex space-x-4 p-4">
                                    {links.map((link) => (
                                        <button
                                            key={link.id}
                                            onClick={() => {
                                                setActive(link.id);
                                                navigate(link.url);
                                            }}
                                            className={`px-4 py-2 rounded-md transition ${
                                                active === link.id
                                                    ? "bg-green-200 text-black"
                                                    : "bg-gray-300 text-black"
                                            }`}
                                        >
                                            {link.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Employ List card one */}

                            {!showForm && (
                                <div className="h-[800px] bg-[white] mt-[20px] rounded-[12px]  pr-[10px]  ">
                                    <div className="flex align-center justify-between pl-[15px] rounded-[12px]  pr-[15px]">
                                        <div className="mt-[20px]">
                                            <h6 class="text-lg font-semibold mb-0">
                                                Employee list
                                            </h6>
                                        </div>
                                        <div className="flex mt-[20px] w-[270px] items-start justify-between">
                                            <button
                                                type="button"
                                                className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg transition-all hover:bg-green-700"
                                                onClick={() =>
                                                    setShowInput(!showInput)
                                                }
                                            >
                                                {/* FontAwesome icon */}
                                                <div>
                                                    <FontAwesomeIcon
                                                        icon={faFilter}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Filter</h6>
                                                </div>
                                            </button>
                                            {/*  Add Employ  */}
                                            <div
                                                className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg transition-all"
                                                onClick={() =>
                                                    setShowForm(!showForm)
                                                }
                                            >
                                                <div>
                                                    <FontAwesomeIcon
                                                        icon={faCirclePlus}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Add Employee</h6>
                                                </div>
                                            </div>

                                            {/*  Add Employ  */}
                                        </div>
                                    </div>

                                    <div className="mt-[20px]">
                                        <hr />
                                    </div>

                                    {showInput && (
                                        <div className="grid grid-cols-6 gap-4 ">
                                            {/* one Filter */}
                                            <div
                                                className="mt-[20px] ml-[15px] w-[200px] relative"
                                                ref={divRef}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsActive(true);
                                                    }}
                                                    className={`block w-full h-[40px] px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm 
                                             border-gray-500 hover:border-red-500 focus:ring-blue-500 focus:border-blue-500 
                                             ${
                                                 isActive
                                                     ? "border-red-700"
                                                     : ""
                                             } overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {searchTextInput ||
                                                        "Select employee"}
                                                </div>

                                                {isActive && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-[9999]">
                                                        <input
                                                            type="text"
                                                            onChange={
                                                                handleSearch
                                                            }
                                                            placeholder="Search..."
                                                            className="w-full h-[40px] px-2 py-1 text-gray-700 border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />

                                                        {/* Filtered Options List */}
                                                        <ul className="w-full h-[150px] overflow-y-auto">
                                                            {filteredOptions.length >
                                                            0 ? (
                                                                filteredOptions.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            onClick={() =>
                                                                                handleSelectOption(
                                                                                    option
                                                                                )
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="px-4 py-2 text-gray-500">
                                                                    No options
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            {/* one Filter */}
                                            {/* two Filter */}
                                            <div
                                                className="mt-[20px] ml-[15px] w-[200px] relative"
                                                ref={divRef2}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsActive2(true);
                                                    }}
                                                    className={`block w-full h-[40px] px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm 
                                             border-gray-500 hover:border-red-500 focus:ring-blue-500 focus:border-blue-500 
                                             ${
                                                 isActive2
                                                     ? "border-red-700"
                                                     : ""
                                             } overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {searchTextInput2 ||
                                                        "Select employee Id"}
                                                </div>

                                                {isActive2 && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-[9999]">
                                                        <input
                                                            type="text"
                                                            onChange={
                                                                handleSearc2
                                                            }
                                                            placeholder="Search..."
                                                            className="w-full h-[40px] px-2 py-1 text-gray-700 border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />

                                                        {/* Filtered Options List */}
                                                        <ul className="w-full h-[150px] overflow-y-auto">
                                                            {filteredOptions2.length >
                                                            0 ? (
                                                                filteredOptions2.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            onClick={() =>
                                                                                handleSelectOption2(
                                                                                    option
                                                                                )
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="px-4 py-2 text-gray-500">
                                                                    No options
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            {/* two Filter */}
                                            {/* three Filter */}
                                            <div
                                                className="mt-[20px] ml-[15px] w-[200px] relative"
                                                ref={divRef3}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsActive3(true);
                                                    }}
                                                    className={`block w-full h-[40px] px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm 
                                             border-gray-500 hover:border-red-500 focus:ring-blue-500 focus:border-blue-500 
                                             ${
                                                 isActive3
                                                     ? "border-red-700"
                                                     : ""
                                             } overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {searchTextInput3 ||
                                                        "Select employee type"}
                                                </div>

                                                {isActive3 && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-[9999]">
                                                        <input
                                                            type="text"
                                                            onChange={
                                                                handleSearc3
                                                            }
                                                            placeholder="Search..."
                                                            className="w-full h-[40px] px-2 py-1 text-gray-700 border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />

                                                        {/* Filtered Options List */}
                                                        <ul className="w-full h-[150px] overflow-y-auto">
                                                            {filteredOptions3.length >
                                                            0 ? (
                                                                filteredOptions3.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            onClick={() =>
                                                                                handleSelectOption3(
                                                                                    option
                                                                                )
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="px-4 py-2 text-gray-500">
                                                                    No options
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            {/* three Filter */}
                                            {/* four */}
                                            <div
                                                className="mt-[20px] ml-[15px] w-[200px] relative"
                                                ref={divRef4}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsActive4(true);
                                                    }}
                                                    className={`block w-full h-[40px] px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm 
                                             border-gray-500 hover:border-red-500 focus:ring-blue-500 focus:border-blue-500 
                                             ${
                                                 isActive4
                                                     ? "border-red-700"
                                                     : ""
                                             } overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {searchTextInput4 ||
                                                        "All Department"}
                                                </div>

                                                {isActive4 && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-[9999]">
                                                        <input
                                                            type="text"
                                                            onChange={
                                                                handleSearc4
                                                            }
                                                            placeholder="Search..."
                                                            className="w-full h-[40px] px-2 py-1 text-gray-700 border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />

                                                        {/* Filtered Options List */}
                                                        <ul className="w-full h-[150px] overflow-y-auto">
                                                            {filteredOptions4.length >
                                                            0 ? (
                                                                filteredOptions4.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            onClick={() =>
                                                                                handleSelectOption4(
                                                                                    option
                                                                                )
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="px-4 py-2 text-gray-500">
                                                                    No options
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            {/* four Filter */}
                                            {/* five  Filter*/}
                                            <div
                                                className="mt-[20px] ml-[15px] w-[200px] relative"
                                                ref={divRef5}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsActive5(true);
                                                    }}
                                                    className={`block w-full h-[40px] px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm 
                                             border-gray-500 hover:border-red-500 focus:ring-blue-500 focus:border-blue-500 
                                             ${
                                                 isActive5
                                                     ? "border-red-700"
                                                     : ""
                                             } overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {searchTextInput5 ||
                                                        "All Designation"}
                                                </div>

                                                {isActive5 && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-[9999]">
                                                        <input
                                                            type="text"
                                                            onChange={
                                                                handleSearc5
                                                            }
                                                            placeholder="Search..."
                                                            className="w-full h-[40px] px-2 py-1 text-gray-700 border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />

                                                        {/* Filtered Options List */}
                                                        <ul className="w-full h-[150px] overflow-y-auto">
                                                            {filteredOptions5.length >
                                                            0 ? (
                                                                filteredOptions5.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            onClick={() =>
                                                                                handleSelectOption5(
                                                                                    option
                                                                                )
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="px-4 py-2 text-gray-500">
                                                                    No options
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            {/* five  Filter*/}
                                            {/* six Filter */}
                                            <div
                                                className="mt-[20px] ml-[10px] w-[200px] relative "
                                                ref={divRef6}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsActive6(true);
                                                    }}
                                                    className={`block w-full h-[40px] px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm 
                                             border-gray-500 hover:border-red-500 focus:ring-blue-500 focus:border-blue-500 
                                             ${
                                                 isActive6
                                                     ? "border-red-700"
                                                     : ""
                                             } overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {searchTextInput6 ||
                                                        "All blood group"}
                                                </div>

                                                {isActive6 && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-[9999]">
                                                        <input
                                                            type="text"
                                                            onChange={
                                                                handleSearc6
                                                            }
                                                            placeholder="Search..."
                                                            className="w-full h-[40px] px-2 py-1 text-gray-700 border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />

                                                        {/* Filtered Options List */}
                                                        <ul className="w-full h-[150px] overflow-y-auto">
                                                            {filteredOptions6.length >
                                                            0 ? (
                                                                filteredOptions6.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            onClick={() =>
                                                                                handleSelectOption6(
                                                                                    option
                                                                                )
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="px-4 py-2 text-gray-500">
                                                                    No options
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            {/* six Filter */}
                                            {/* seven Filter */}
                                            <div
                                                className="mt-[20px] ml-[15px] w-[200px] relative z-50"
                                                ref={divRef7}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsActive7(true);
                                                    }}
                                                    className={`block w-full h-[40px] px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm 
                                             border-gray-500 hover:border-red-500 focus:ring-blue-500 focus:border-blue-500 
                                             ${
                                                 isActive7
                                                     ? "border-red-700"
                                                     : ""
                                             } overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {searchTextInput7 ||
                                                        "All Country"}
                                                </div>

                                                {isActive7 && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-[9999]">
                                                        <input
                                                            type="text"
                                                            onChange={
                                                                handleSearc7
                                                            }
                                                            placeholder="Search..."
                                                            className="w-full h-[40px] px-2 py-1 text-gray-700 border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />

                                                        {/* Filtered Options List */}
                                                        <ul className="w-full h-[150px] overflow-y-auto">
                                                            {filteredOptions7.length >
                                                            0 ? (
                                                                filteredOptions7.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            onClick={() =>
                                                                                handleSelectOption7(
                                                                                    option
                                                                                )
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="px-4 py-2 text-gray-500">
                                                                    No options
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            {/* seven Filter */}
                                            {/* Eight Filter */}
                                            <div
                                                className="mt-[20px] ml-[15px] w-[200px] relative z-50"
                                                ref={divRef8}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsActive8(true);
                                                    }}
                                                    className={`block w-full h-[40px] px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm 
                                             border-gray-500 hover:border-red-500 focus:ring-blue-500 focus:border-blue-500 
                                             ${
                                                 isActive8
                                                     ? "border-red-700"
                                                     : ""
                                             } overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {searchTextInput8 ||
                                                        "All gender"}
                                                </div>

                                                {isActive8 && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-[9999]">
                                                        <input
                                                            type="text"
                                                            onChange={
                                                                handleSearc8
                                                            }
                                                            placeholder="Search..."
                                                            className="w-full h-[40px] px-2 py-1 text-gray-700 border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />

                                                        {/* Filtered Options List */}
                                                        <ul className="w-full h-[150px] overflow-y-auto">
                                                            {filteredOptions8.length >
                                                            0 ? (
                                                                filteredOptions8.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            onClick={() =>
                                                                                handleSelectOption8(
                                                                                    option
                                                                                )
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="px-4 py-2 text-gray-500">
                                                                    No options
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            {/*Eight  Filter */}
                                            {/* Nine Filter */}
                                            <div
                                                className="mt-[20px] ml-[15px] w-[200px] relative z-50"
                                                ref={divRef9}
                                            >
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsActive9(true);
                                                    }}
                                                    className={`block w-full h-[40px] px-2 py-1 text-gray-700 bg-white border rounded-lg shadow-sm 
                                             border-gray-500 hover:border-red-500 focus:ring-blue-500 focus:border-blue-500 
                                             ${
                                                 isActive9
                                                     ? "border-red-700"
                                                     : ""
                                             } overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {searchTextInput9 ||
                                                        "All marital Status"}
                                                </div>

                                                {isActive9 && (
                                                    <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-[9999]">
                                                        <input
                                                            type="text"
                                                            onChange={
                                                                handleSearc9
                                                            }
                                                            placeholder="Search..."
                                                            className="w-full h-[40px] px-2 py-1 text-gray-700 border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />

                                                        {/* Filtered Options List */}
                                                        <ul className="w-full h-[150px] overflow-y-auto">
                                                            {filteredOptions9.length >
                                                            0 ? (
                                                                filteredOptions9.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            onClick={() =>
                                                                                handleSelectOption9(
                                                                                    option
                                                                                )
                                                                            }
                                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </li>
                                                                    )
                                                                )
                                                            ) : (
                                                                <li className="px-4 py-2 text-gray-500">
                                                                    No options
                                                                    found
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            {/*Nine  Filter */}
                                            <div className="w-full md:w-1/5 mb-4 flex items-end space-x-2 mt-[20px] ml-[15px]">
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:ring-2 focus:ring-green-400"
                                                >
                                                    Find
                                                </button>
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:ring-2 focus:ring-red-400"
                                                >
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <MainEmployList />
                                    </div>
                                </div>
                            )}
                            {/* Employ List card one */}
                            {showForm && (
                                <div className="w-full">
                                    <div className="h-[800px] bg-white mt-5 rounded-[12px] p-4 shadow-lg">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-semibold">
                                                Add Employee
                                            </h2>

                                            {/* Back to Employee List Button */}
                                            <div
                                                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg transition-all cursor-pointer hover:bg-blue-700"
                                                onClick={() =>
                                                    setShowForm(false)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faList}
                                                />
                                                <h6>Employee List</h6>
                                            </div>
                                        </div>
                                        <div className="mt-[20px] w-full">
                                            <hr />
                                        </div>
                                        <div className="mt-[20px]">
                                            {/* Add List name */}
                                            <div>
                                                <EmployeeSubOne />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
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
            </div>
        </>
    );
};
export default EmployeeSub;
