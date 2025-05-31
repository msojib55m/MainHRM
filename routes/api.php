<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\DepartmentController;
use App\Models\Department;
use App\Http\Controllers\SubDepartmentController;
use App\Http\Controllers\PositionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('logout', [AuthController::class, 'logout']);
    //users
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // try
    Route::get('/get', function (Request $request) {
        return $request->user();
    });
    // Route::apiResource('/users',UserController::class);

});



Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::get('AllEmployeName', [AuthController::class, 'AllEmploye']);


Route::post('/attendance', [AttendanceController::class, 'store']);
Route::get('/AttendanceCount', [AttendanceController::class, 'countAttendance']);


Route::post('/upload', [FileUploadController::class, 'upload']);

// Attendance Monthly
use App\Http\Controllers\AttendanceControllerMonthly;

Route::post('/attendanceMonthly', [AttendanceControllerMonthly::class, 'store']);

// award start
use App\Http\Controllers\AwardController;
Route::post("/award",[AwardController::class,"store"]);
Route::get('/awardGet',[AwardController::class,"index"]);
Route::put('/awardEdit/{id}',[AwardController::class,"update"]);
Route::delete('/awardDelete/{id}',[AwardController::class,"delete"]);
// Award Ends

// Department start
// Department Store Post database now
Route::post('/departments', [DepartmentController::class, 'store']);
// Department Store Post database now
Route::get('/departments', [DepartmentController::class, 'index']);
// Department update now
Route::put('/department/{id}', [DepartmentController::class, 'update']);
// department delete
Route::delete('/departmentsDelete/{id}', [DepartmentController::class, 'destroy']);
Route::get('/DepartmentName', [DepartmentController::class, 'DepartmentNameAll']);
// Department End




// subDepartment start

// mysql data send 
Route::post('/subdepartments', [SubDepartmentController::class, 'store']);
// mysql data send 
// mysql data get
Route::get('/subdepartments', [SubDepartmentController::class, 'index']);
// mysql data get

Route::put('/subdepartments/{id}', [SubDepartmentController::class, 'update']);
Route::delete('/subdepartments/{id}', [SubDepartmentController::class, 'destroy']);
// subDepartment Ends


// Main EmployeePosition 
Route::post('/positions', [PositionController::class, 'store']);
Route::get('/positions', [PositionController::class, 'index']);
Route::put('/positions/{id}', [PositionController::class, 'update']);
Route::delete('positions/{id}', [PositionController::class, 'destroy']);
Route::get('/positionsOne', [PositionController::class, 'IndexOne']);
// Main EmployeePosition 
use App\Http\Controllers\EmployeePerformanceController;

Route::post('/EmployeePerformanceOne', [EmployeePerformanceController::class, 'store']);
Route::get('/EmployeesPerformanceTwo', [EmployeePerformanceController::class, 'index']);
Route::put('/update-performance/{id}', [EmployeePerformanceController::class, 'update']);
Route::get('/EmployeCount', [EmployeePerformanceController::class, 'count']);
Route::delete('delete-performance/{id}', [EmployeePerformanceController::class, 'destroy']);
Route::get("/AllEmployName",[EmployeePerformanceController::class,"EmployName"]);
// EmployeeController
use App\Http\Controllers\EmployeeSubController;

Route::get('/EmpolySub', [EmployeeSubController::class, 'index']);
Route::post('/employees', [EmployeeSubController::class, 'store']);
Route::delete('/employees/reset', [EmployeeSubController::class, 'resetEmployees']);

Route::put('/SubEmpolyEdit/{id}', [EmployeeSubController::class, 'update']);
Route::delete('/SubEmpolyDelete/{id}', [EmployeeSubController::class, 'destroy']);


// routes/api.php




// holiday send post
use App\Http\Controllers\HolidayController;

Route::post('holidays', [HolidayController::class, 'store']);
//  mysql থেকে ডাটা আনা হচ্ছে
Route::get('/holidays', [HolidayController::class, 'index']);
//এখন ডাটা আপডেট করা হচ্ছে
Route::put('/holidaysUpdata/{id}', [HolidayController::class, 'update']);
//  mysql থেকে ডাটা আনা হচ্ছে এবং ডিলেক্ট করব
Route::delete('/holidaysDelete/{id}', [HolidayController::class, 'destroy']);


// leave Type Holiday Now
// Controllers নাম
use App\Http\Controllers\LeaveTypeHolidayController;

// //  mysql থেকে ডাটা পাঠানো হচ্ছে
Route::post('/Leave-Type-Holiday', [LeaveTypeHolidayController::class, 'store']);
//mysql ডাটা আনা হচ্ছে
Route::get('/Leave-Type-Holiday-Show', [LeaveTypeHolidayController::class, 'index']);
Route::put('/leave-Type-Holiday-ShowNow/{id}', [LeaveTypeHolidayController::class, 'update']);
// delete now
Route::delete('/leave-Type-Holiday-ShowNow/{id}', [LeaveTypeHolidayController::class, 'destroy']);


// Leave Application controller
use App\Http\Controllers\LeaveApplicationController;
Route::post('/leave-applications', [LeaveApplicationController::class, 'store']);
Route::get('/leave-applications', [LeaveApplicationController::class, 'index']);
Route::delete('/leave-applications/{id}', [LeaveApplicationController::class, 'destroy']);
Route::get('/employees', [AuthController::class, 'getEmployees']);

Route::get('/employeesAdd', [AuthController::class, 'getEmployeesAdd']);
Route::get('/employeesAddTwo', [AuthController::class, 'getEmployeesAddTwo']);
// new
Route::get('/employeesId', [AuthController::class, 'EmployessId']);
// route 
Route::get('/salariesName', [AuthController::class, 'index']);
Route::get('/EmployNameAddNow', [AuthController::class, 'NewMessage']);
Route::get('/leaveRequests', [LeaveApplicationController::class, 'AllLeveShowHeader']);
Route::get('/LeaveApllicationId', [LeaveApplicationController::class, 'AllLeveShowNumber']);



// loan start
// routes/api.php
use App\Http\Controllers\LoanController;

Route::post('/submit-loan', [LoanController::class, 'submitLoan']);
Route::get('/loans', [LoanController::class, 'getLoans']);
Route::put('/loans/{id}', [LoanController::class, 'update']);
Route::delete('/loans/{id}', [LoanController::class, 'destroy']);

// Notice controller 
use App\Http\Controllers\NoticeController;

Route::post('/notices', [NoticeController::class, 'store'])->middleware('cors');
Route::get('/notices', [NoticeController::class, 'index']);

// edit now
Route::put('/notices/{id}', [NoticeController::class, 'update']);
// delete now
Route::delete('/notices/{id}', [NoticeController::class, 'destroy']);
// ুsalary 
use App\Http\Controllers\EmployeeController;
Route::post('/salary-advance', [EmployeeController::class, 'store']);
Route::get('/salary-advanceNow', [EmployeeController::class, 'index']);
Route::put('/salary-advanceGood/{id}', [EmployeeController::class, 'update']);
Route::delete('/salary-advanceDelete/{id}', [EmployeeController::class, 'destroy']);
// 
use App\Http\Controllers\SalaryGenerate;

Route::post('/salaries', [SalaryGenerate::class, 'store']);
Route::get('/salaries', [SalaryGenerate::class, 'index']);

// Procurement Request 
use App\Http\Controllers\ProcurementRequestController;

Route::post('/requests', [ProcurementRequestController::class, 'store']);

Route::get('/Request-data', [ProcurementRequestController::class, 'index']);

Route::put('/records/{id}', [ProcurementRequestController::class, 'update']);
Route::get('/edit-data/{id}', [ProcurementRequestController::class, 'edit']);
Route::put('/update-data/{id}', [ProcurementRequestController::class, 'update']);
// nubmer 8
// Unit Request
use App\Http\Controllers\UnitController;

Route::get('/units', [UnitController::class, 'index']);
Route::post('/units', [UnitController::class, 'store']);
Route::put('/units/{id}', [UnitController::class, 'update']);
// routes/api.php
Route::delete('/units/{id}', [UnitController::class, 'destroy']);
// sigin Requst
use App\Http\Controllers\SignatureController; //committree

Route::post('/committee', [SignatureController::class, 'store']);
Route::get('/committees', [SignatureController::class, 'index']);
Route::put('/committee/{id}', [SignatureController::class, 'update']);
Route::delete('/committee/{id}', [SignatureController::class, 'destroy']);

//Vendor 

use App\Http\Controllers\VendorController;
Route::post('/vendors', [VendorController::class, 'store']);
Route::get('/vendors', [VendorController::class, 'index']);
Route::put('/vendors/{id}', [VendorController::class, 'update']);
Route::delete('/vendors/{id}', [VendorController::class, 'destroy']);

use App\Http\Controllers\ClientController;
Route::get('/clientsGet', [ClientController::class, 'index']);
Route::post('/clientsPost', [ClientController::class, 'store']);
Route::put('/clientsUpdate/{id}', [ClientController::class, 'update']);
Route::delete('/clientsDelete/{id}', [ClientController::class, 'destroy']);

// tasks managers
use App\Http\Controllers\TasksController;
Route::post('/projects', [TasksController::class, 'store']);
Route::get('/projects', [TasksController::class, 'index']);
Route::put('/updateTaks/{id}', [TasksController::class, 'update']);
Route::delete('/TasksId/{id}', [TasksController::class, 'destroy']);


// Route::get('/employees', [AuthController::class, 'getEmployees']);
// candidate List now
use App\Http\Controllers\CandidateController;
Route::post('/candidates', [CandidateController::class, 'store']);
Route::get('/candidates', [CandidateController::class, 'index']);
Route::put('/candidates/{id}', [CandidateController::class, 'update']);
Route::delete('CandidateId/{id}', [CandidateController::class, 'destroy']);
Route::get('/candidateShort', [CandidateController::class, 'AllCandateShow']);



// CandidateShortList now
use App\Http\Controllers\CandidateControllerList;
Route::get('/CandidateShortListGet', [CandidateControllerList::class, 'index']);
Route::post('/CandidateShortListPost', [CandidateControllerList::class, 'store']);
Route::delete('/deleteCandidate/{id}', [CandidateControllerList::class, 'destroy']);
Route::get('/CandidateShortlist', [CandidateControllerList::class, 'Candidate']);
Route::get('/CandidateShortlistJov', [CandidateControllerList::class, 'CandidateJov']);
// interview
use App\Http\Controllers\InterviewController;
Route::post('/interviews', [InterviewController::class, 'store']);
Route::get('/interviews', [InterviewController::class, 'index']);
Route::delete('/interviews/{id}', [InterviewController::class, 'destroy']);
Route::get('/CandidateSelection', [InterviewController::class, 'CandidateSelection']);
Route::get('/CandidateSelection2', [InterviewController::class, 'CandidateSelection2']);

// SelectionTermController 
use App\Http\Controllers\SelectionTermController;

Route::get('/selection-terms', [SelectionTermController::class, 'index']);
Route::post('/selection-terms', [SelectionTermController::class, 'store']);
Route::put('/selectionTermsUpdate/{id}', [SelectionTermController::class, 'update']);
Route::delete('/selectionTermsDelete/{id}', [SelectionTermController::class, 'destroy']);
// PointCategoryController 
use App\Http\Controllers\PointCategoryController;



Route::get('/pointCategories', [PointCategoryController::class, 'index']);
Route::post('/pointCategories', [PointCategoryController::class, 'store']);

Route::put('/pointCategories/{id}', [PointCategoryController::class, 'update']);
Route::delete('/pointCategories/{id}', [PointCategoryController::class, 'destroy']);


// CollaborativePointController
use App\Http\Controllers\CollaborativePointController;
Route::post('/collaborative-points', [CollaborativePointController::class, 'store']);
Route::get('/collaborative-points', [CollaborativePointController::class, 'index']);

use App\Http\Controllers\AttendanceControllerPoints;
Route::post('/attendance-post', [AttendanceControllerPoints::class, 'store']);
Route::get('/attendance-get', [AttendanceControllerPoints::class, 'index']);


use App\Http\Controllers\SetupRuleController;

Route::post('/setup-rules', [SetupRuleController::class, 'store']);
Route::get('/setup-rules', [SetupRuleController::class, 'index']);
Route::post('/setupRuleUpdate/{id}', [SetupRuleController::class, 'update']);
// routes/api.php
use App\Http\Controllers\NewMessageController;
Route::post('/selection-terms', [NewMessageController::class, 'store']);
Route::get('/selection-terms', [NewMessageController::class, 'index']);
Route::put('/selection-terms/{id}', [NewMessageController::class, 'update']);
Route::delete('/selection-terms/{id}', [NewMessageController::class, 'destroy']);
Route::put('/selection-terms/{id}', [NewMessageController::class, 'SccenNow']);

use App\Http\Controllers\CurrencyController;
Route::post('/currencies', [CurrencyController::class, 'store']);
Route::get('/currencies', [CurrencyController::class, 'index']);
Route::put('/currencies/{id}', [CurrencyController::class, 'update']);
Route::delete('/currencies/{id}', [CurrencyController::class, 'destroy']);

use App\Http\Controllers\MailSettingsController;
Route::post('/update-mail-settings', [MailSettingsController::class, 'update']);


// Attendance report controller now
use App\Http\Controllers\AttendanceReportController;
Route::get('/attendance_report_All', [AttendanceReportController::class, 'index']);

Route::post('/attendance_report', [AttendanceReportController::class, 'store']);
Route::put('/Allattendance_report_update/{id}', [AttendanceReportController::class, 'update']);
// routes/api.php

Route::delete('/Allattendance_report_delete/{id}', [AttendanceReportController::class, 'destroy']);

