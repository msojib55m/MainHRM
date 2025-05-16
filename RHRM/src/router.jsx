import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import "./index.css";

import PrivateRoute from "./lib/PrivateRoute .jsx";

// Lazy Load Components
const Login = lazy(() => import("./views/Login.jsx"));
const Register = lazy(() => import("./views/Register.jsx"));
const DefulyLayout = lazy(() => import("./Components/DefaulyLaout.jsx"));
const GustLayout = lazy(() => import("./Components/GustLayout.jsx"));
const Users = lazy(() => import("./views/Users.jsx"));
const TakeAttendance = lazy(() => import("./views/TakeAttendance.jsx"));
const AttendanceMonthly = lazy(() => import("./views/AttendanceMonthly.jsx"));
const AwardList = lazy(() => import("./views/AwardList.jsx"));
const DepartmentMain = lazy(() => import("./views/DepartmentMain.jsx"));
const DepartmentSub = lazy(() => import("./views/DepartmentSub.jsx"));
const EmployeePosition = lazy(() => import("./views/EmployeePosition.jsx"));
const EmployeeSub = lazy(() => import("./views/EmployeeSub.jsx"));
const EmployeeParformance = lazy(() =>
    import("./views/EmployeeParformance.jsx")
);
const LeaveWeeklyHoliday = lazy(() => import("./views/LeaveWeeklyHoliday.jsx"));
const LeaveHoliday = lazy(() => import("./views/LeaveHoliday.jsx"));
const LeaveApplication = lazy(() => import("./views/LeaveApplication.jsx"));
const LeaveTypeHoliday = lazy(() => import("./views/LeaveTypeHoliday.jsx"));
const LeaveApprovalHoliday = lazy(() =>
    import("./views/LeaveApprovalHoliday.jsx")
);
const LoanList = lazy(() => import("./views/LoanList.jsx"));
const EmployeeWiseLoan = lazy(() => import("./views/EmployeeWiseLoan.jsx"));
const LoanDisburseReport = lazy(() => import("./views/LoanDisburseReport.jsx"));
const NoticeList = lazy(() => import("./views/NoticeList.jsx"));
const SalaryAdvance = lazy(() => import("./views/SalaryAdvance.jsx"));
const SalaryGenerate = lazy(() => import("./views/SalaryGenerate.jsx"));
const ManageEmployeeSalary = lazy(() =>
    import("./views/ManageEmployeeSalary.jsx")
);
const ProcurementRequest = lazy(() => import("./views/ProcurementRequest.jsx"));
const UnitsRequest = lazy(() => import("./views/UnitsRequest.jsx"));
const CommitteeRequest = lazy(() => import("./views/CommitteeRequest.jsx"));
const VendorProcurement = lazy(() => import("./views/VendorProcurement.jsx"));
const ClientsProjectManagement = lazy(() =>
    import("./views/ClientsProjectManagement.jsx")
);
const ManageTasksProject = lazy(() => import("./views/ManageTasksProject.jsx"));
const TemMemborsReports = lazy(() => import("./views/TemMemborsReports.jsx"));
const CandidateList = lazy(() => import("./views/CandidateList.jsx"));
const CandidateShortlist = lazy(() => import("./views/CandidateShortlist.jsx"));
const Interview = lazy(() => import("./views/Interview.jsx"));
const CandidateSelection = lazy(() => import("./views/CandidateSelection.jsx"));
const PointCategoriesMain = lazy(() =>
    import("./views/pointCategoriesMain.jsx")
);

const CollaborativePointsMain = lazy(() =>
    import("./views/CollaborativePointsMain.jsx")
);
const AttendancePointsMain = lazy(() =>
    import("./views/AttendancePointsMain.jsx")
);

const SetupRuleMain = lazy(() => import("./views/SetupRuleMain.jsx"));

const NewMessageMain = lazy(() => import("./views/NewMessageMain.jsx"));

// লোডিং ইফেক্ট দেখানোর জন্য কম্পোনেন্ট
const Loading = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}
    >
        <ClipLoader color="#36d7b7" size={50} />
    </div>
);

// Custom Layout with Global Loader
const PageLoaderWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return loading ? <Loading /> : children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<Loading />}>
                <PageLoaderWrapper>
                    <DefulyLayout />
                </PageLoaderWrapper>
            </Suspense>
        ),
        children: [
            {
                path: "/users",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Users />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/attendance",
        element: <PrivateRoute />, // 🔐 এখন এটি প্রাইভেট রাউট
        children: [
            {
                path: "",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <TakeAttendance />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/attendance",
        element: <PrivateRoute />, // 🔐 এখন এটি প্রাইভেট রাউট
        children: [
            {
                path: "monthly",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <AttendanceMonthly />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/award",
        element: <PrivateRoute />, // 🔐 প্রাইভেট রাউট দিয়ে সুরক্ষিত
        children: [
            {
                path: "list",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <AwardList />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },

    {
        path: "/department",
        element: <PrivateRoute />, // 🔐 প্রাইভেট রাউট দিয়ে সুরক্ষিত
        children: [
            {
                path: "main",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <DepartmentMain />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // /department/sub
    {
        path: "/department",
        element: <PrivateRoute />, // 🔐 প্রাইভেট রাউট দিয়ে সুরক্ষিত
        children: [
            {
                path: "sub",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <DepartmentSub />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/employee",
        element: <PrivateRoute />, // 🔐 প্রাইভেট রাউট দিয়ে সুরক্ষিত
        children: [
            {
                path: "position",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <EmployeePosition />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },

    {
        path: "/employee",
        element: <PrivateRoute />, // 🔐 প্রাইভেট রাউট দিয়ে সুরক্ষিত
        children: [
            {
                path: "sub",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <EmployeeSub />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },

    {
        path: "/employee",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "performance",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <EmployeeParformance />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Wekkly holiday
    {
        path: "/leave/weekly-holiday",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/leave/weekly-holiday",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <LeaveWeeklyHoliday />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // leave Holiday
    {
        path: "/leave/holiday",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/leave/holiday",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <LeaveHoliday />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Leave Apllication
    {
        path: "/leave/application",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/leave/application",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <LeaveApplication />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/leaves/type/index",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/leaves/type/index",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <LeaveTypeHoliday />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/leaves/approvals",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/leaves/approvals",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <LeaveApprovalHoliday />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Loin List now start
    {
        path: "/loan/list",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/loan/list",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <LoanList />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Employee Wise loan now
    {
        path: "/loans-report-loan_disburse_report",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/loans-report-loan_disburse_report",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <EmployeeWiseLoan />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Employee Wise loan now
    // Loan Disburse Report loan now
    {
        path: "/loans-report/employee",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/loans-report/employee",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <LoanDisburseReport />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Employee Wise loan now
    // notice List now
    {
        path: "/notice/notices",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/notice/notices",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <NoticeList />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // notice List Ends
    // Salary start
    {
        path: "/payroll/salary-advance",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/payroll/salary-advance",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <SalaryAdvance />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/payroll/salary-generate",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/payroll/salary-generate",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <SalaryGenerate />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/payroll/manage-salaries",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/payroll/manage-salaries",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <ManageEmployeeSalary />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Salary Ends
    // ProcurementRequest
    // nubmer: 1;
    {
        path: "/procurement_request",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/procurement_request",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <ProcurementRequest />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // number:6
    {
        path: "/hr/vendor",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/hr/vendor",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <VendorProcurement />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // number:6
    // number:7
    {
        path: "/hr/committee",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/hr/committee",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <CommitteeRequest />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // nubmer: 8;
    {
        path: "/hr/units",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/hr/units",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <UnitsRequest />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },

    // Clients project management
    // number : 1
    {
        path: "/project/clients",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/project/clients",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <ClientsProjectManagement />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },

    // number : 3
    {
        path: "/project/manage_tasks",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/project/manage_tasks",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <ManageTasksProject />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // number : 4
    {
        path: "/project/team_member_search",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/project/team_member_search",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <TemMemborsReports />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Clients project management
    // cadidateList all now
    // candidate list one
    {
        path: "/hr/recruitment",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/hr/recruitment",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <CandidateList />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // candidate list one
    // candidateShortlist one
    {
        path: "/hr/shortlist",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/hr/shortlist",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <CandidateShortlist />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // candidateShortlist one
    // cadidateList all now
    // InterviewOne
    {
        path: "/hr/interview",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/hr/interview",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <Interview />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // InterviewOne
    // CandidateSelection
    {
        path: "/hr/selection",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/hr/selection",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <CandidateSelection />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    //  Reward points

    // Point categories start\
    {
        path: "/reward/point-categories",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/reward/point-categories",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <PointCategoriesMain />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Point categories  Ends
    // Collaborative Points Main
    {
        path: "/reward/collaborative-points",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/reward/collaborative-points",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <CollaborativePointsMain />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Collaborative Points Main
    // Attendance Points Start
    {
        path: "/reward/attendance-points",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/reward/attendance-points",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <AttendancePointsMain />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Attendance Points Start
    // Setep Rule one
    {
        path: "/hr/setup-rules",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/hr/setup-rules",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <SetupRuleMain />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Message Rule one
    {
        path: "/message/new",
        element: <PrivateRoute />, // 🔥 এই রুট এখন প্রাইভেট
        children: [
            {
                path: "/message/new",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <NewMessageMain />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
    // Message Rule one
    // login not allword
    {
        path: "/",
        element: (
            <Suspense fallback={<Loading />}>
                <PageLoaderWrapper>
                    <GustLayout />
                </PageLoaderWrapper>
            </Suspense>
        ),
        children: [
            {
                path: "/login",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <Login />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
            {
                path: "/register",
                element: (
                    <Suspense fallback={<Loading />}>
                        <PageLoaderWrapper>
                            <Register />
                        </PageLoaderWrapper>
                    </Suspense>
                ),
            },
        ],
    },
]);

export default router;
