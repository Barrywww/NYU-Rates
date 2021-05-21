package com.example.nyurates.controller;

import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.results.*;
import com.example.nyurates.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

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
    public Result getStats(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("admin")){
                return adminService.getStatistics();
            }
            else{
                return new UnauthorizedResult();
            }
        }
        catch (Exception e){
            return new UnauthorizedResult();
        }
    }

    /**
     * Get Student List
     * @param params
     * @return StudentListResult
     */
    @PostMapping(value = "/student_list")
    public Result studentList(HttpServletRequest request, @RequestBody Map<String, String> params){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("admin")){
                return adminService.studentList(params.get("name"), params.get("netid"), params.get("email"));
            }
            else{
                return new UnauthorizedResult();
            }
        }
        catch (Exception e){
            return new UnauthorizedResult();
        }

    }

    /**
     * Get Professor List
     * @param params
     * @return ProfListResult
     */
    @PostMapping(value = "/prof_list")
    public Result profList(HttpServletRequest request, @RequestBody Map<String, String> params){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("admin")){
                return adminService.profList(params.get("name"), params.get("netid"), params.get("email"), params.get("department"));
            }
            else{
                return new UnauthorizedResult();
            }
        }
        catch (Exception e){
            return new UnauthorizedResult();
        }
    }

    /**
     * Get Reports
     * @param session
     * @param params
     * @return ReportListResult
     */
    @RequestMapping(value = "/getreports")
    public Result getReports(HttpServletRequest request, @RequestBody Map<String, Object> params){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("admin")){
                return adminService.getReports((Long) params.get("report_id"), (Long) params.get("comment_id"), (String) params.get("comment_user"), (String) params.get("course_code"));
            }
            else{
                return new UnauthorizedResult();
            }
        }
        catch (Exception e){
            return new UnauthorizedResult();
        }
    }

    /**
     * Review Comments
     * @param params
     * @return Result
     */
    @PostMapping(value = "/reviewcomment")
    public Result reviewComment(HttpServletRequest request, @RequestBody Map<String, Object> params) {
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("admin")){
                return adminService.reviewComment((Integer) params.get("comment_id"), (Integer) params.get("report_id"), (Boolean) params.get("validity"));
            }
            else{
                return new UnauthorizedResult();
            }
        }
        catch (Exception e){
            return new UnauthorizedResult();
        }
    }

    /**
     * Get Add Professor Request
     * @param params
     * @return ProfReqResult
     */
    @RequestMapping (value="/getprofrequests")
    public Result getProfRequests(HttpServletRequest request, @RequestBody Map<String, Object> params){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("admin")){
                return adminService.getProfRequests();
            }
            else{
                return new UnauthorizedResult();
            }
        }
        catch (Exception e){
            return new UnauthorizedResult();
        }
    } 

    /**
     * Handle Add Professor Request
     * @param params
     * @return Result
     */
    @RequestMapping (value="/handleprofrequests")
    public Result handleProfRequests(HttpServletRequest request, @RequestBody Map<String, Object> params){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("admin")){
                return adminService.handleProfReq((Integer) params.get("request_id"), (boolean) params.get("operation"));
            }
            else{
                return new UnauthorizedResult();
            }
        }
        catch (Exception e){
            return new UnauthorizedResult();
        }
    }

    /**
     * Delete Student
     * @param params
     * @return Result
     */
    @RequestMapping (value="/deletestudent")
    public Result deleteStudent(HttpServletRequest request, @RequestBody Map<String, String> params){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("admin")){
                return adminService.deleteStudent(params.get("email"));
            }
            else{
                return new UnauthorizedResult();
            }
        }
        catch (Exception e){
            return new UnauthorizedResult();
        }
    }

    /**
     * Validate
     * @param session
     * @return Result
     */
    @GetMapping (value="/validate")
    public Result validateAdmin(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        Result result = new Result();
        result.setCode(400);
        try{
            if(((String) session.getAttribute("role")).equals("admin")){
                result.setCode(200);
                result.setMsg("Validate Success");
                return result;
            }
            return new UnauthorizedResult();
        }
        catch (Exception e){
            return new UnauthorizedResult();
        }
    }

    @GetMapping (value="/logout")
    public Result adminLogout(HttpServletRequest request, SessionStatus sessionStatus){
        HttpSession session = request.getSession(false);
        try{
            session.removeAttribute("role");
            session.removeAttribute("email");
            session.invalidate();
            sessionStatus.setComplete();
            Result result = new Result();
            result.setCode(200);
            result.setMsg("Successfully logged out.");
            return result;
        }
        catch (Exception e){
            e.printStackTrace();
            Result result = new Result();
            result.setCode(400);
            return result;
        }
    }
}
