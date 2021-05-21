package com.example.nyurates.controller;

import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.results.*;
import com.example.nyurates.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8080", allowCredentials="true")
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    /**
     * Login
     * @param admin
     * @param request
     * @return LoginResult
     */
    @PostMapping(value = "/login")
    public LoginResult login(HttpServletRequest request, @RequestBody Admin admin){
        LoginResult result = adminService.login(admin);
        if (result.getCode() == 200){
            HttpSession session = request.getSession();
            session.setAttribute("loggedIn", "true");
            session.setAttribute("role", "admin");
            return result;
        }
        return result;
    }

    /**
     * Get Statistics
     * @return Result
     */
    @GetMapping (value = "/stats")
    public Result getStats(){
        return adminService.getStatistics();    
    }

    /**
     * Get Student List
     * @param params
     * @return StudentListResult
     */
    @PostMapping(value = "/student_list")
    public StudentListResult studentList(@RequestBody Map<String, String> params){
        return adminService.studentList(params.get("name"), params.get("netid"), params.get("email"));
    }

    /**
     * Get Professor List
     * @param params
     * @return ProfListResult
     */
    @PostMapping(value = "/prof_list")
    public ProfListResult profList(@RequestBody Map<String, String> params){
        return adminService.profList(params.get("name"), params.get("netid"), params.get("email"), params.get("department"));
    }

    /**
     * Get Reports
     * @param session
     * @param params
     * @return ReportListResult
     */
    @RequestMapping(value = "/getreports")
    public ReportListResult getReports(HttpSession session, @RequestBody Map<String, Object> params){
        System.out.println(session.getAttribute("role"));
        return adminService.getReports((Long) params.get("report_id"), (Long) params.get("comment_id"), (String) params.get("comment_user"), (String) params.get("course_code"));
    }

    /**
     * Review Comments
     * @param params
     * @return Result
     */
    @PostMapping(value = "/reviewcomment")
    public Result reviewComment(@RequestBody Map<String, Object> params) {
        return adminService.reviewComment((Integer) params.get("comment_id"), (Integer) params.get("report_id"), (Boolean) params.get("validity"));
    }

    /**
     * Get Add Professor Request
     * @param params
     * @return ProfReqResult
     */
    @RequestMapping (value="/getprofrequests")
    public ProfReqResult getProfRequests(@RequestBody Map<String, Object> params){
        return adminService.getProfRequests();
    }

    /**
     * Handle Add Professor Request
     * @param params
     * @return Result
     */
    @RequestMapping (value="/handleprofrequests")
    public Result handleProfRequests(@RequestBody Map<String, Object> params){
        return adminService.handleProfReq((Integer) params.get("request_id"), (boolean) params.get("operation"));
    }

    /**
     * Delete Student
     * @param params
     * @return Result
     */
    @RequestMapping (value="/deletestudent")
    public Result deleteStudent(@RequestBody Map<String, String> params){
        return adminService.deleteStudent(params.get("email"));
    }

    /**
     * Validate
     * @param session
     * @return Result
     */
    @GetMapping (value="/validate")
    public Result validateAdmin(HttpSession session){
        Result result = new Result();
        if(((String) session.getAttribute("role")).equals("admin")){
            result.setCode(200);
            result.setMsg("Validate Success");
            return result;
        }
        return result;
    }
}
