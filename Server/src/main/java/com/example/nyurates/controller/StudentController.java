package com.example.nyurates.controller;

import com.example.nyurates.entity.Comment;
import com.example.nyurates.entity.Prof_req;
import com.example.nyurates.entity.Report;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.CommentsResult;
import com.example.nyurates.entity.results.Result;
import com.example.nyurates.entity.results.UnauthorizedResult;
import com.example.nyurates.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;


@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:8080", allowCredentials="true")
public class StudentController {
    //植入对象
    @Autowired
    private StudentService studentService;

    /**
     * Post Comments
     * @param comment
     * @param request
     * @return Result
     */
    @PostMapping(value = "/post_comment")
    public Result post_comment(HttpServletRequest request, @RequestBody Comment comment){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("student")){
                comment.setStudent_id(((String) session.getAttribute("email")).split("@")[0]);
                return studentService.post_comment(comment);
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
     * Hit Likes/Dislikes
     * @param params
     * @return Result
     */
    @PostMapping(value = "/handle_like")
    public Result handle_like(HttpServletRequest request, @RequestBody Map<String, Object> params){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("student")){
                int comid = (Integer) params.get("comment_id");
                Long comment_id = Long.valueOf(comid);
                return studentService.handle_like(comment_id, (Boolean) params.get("isLike"));
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
     * Report comments
     * @param report
     * @param session
     * @return Result
     */
    @PostMapping(value = "/reportcomment")
    public Result report_comment(HttpServletRequest request, @RequestBody Report report){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("student") ||
                    ((String) session.getAttribute("role")).equals("professor")){
                return studentService.report_comment(report);
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
     * Add Professor Request
     * @param prof_req
     * @param session
     * @return Result
     */
    @PostMapping(value = "/addprofessor")
    public Result addprofessor(HttpServletRequest request, @RequestBody Prof_req prof_req){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("student")){
                return studentService.addprofessor(prof_req);
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
     * View Comments History
     * @param student
     * @return CommentsResult
     */
    @GetMapping(value = "/viewhistory")
    public Result view_history(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("student")){
                Student student = new Student();
                student.setNetid(((String) session.getAttribute("email")).split("@")[0]);
                return studentService.view_history(student);
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
     * Validate Role
     * @param session
     * @return Result
     */
    @GetMapping(value= "/validate")
    public Result validate_role(HttpServletRequest request){
        Result result = new Result();
        HttpSession session = request.getSession(false);
        try{
            if (((String) session.getAttribute("role")).equals("student")){
                result.setCode(200);
                result.setMsg("Validation success!");
            }
            else{
                result.setCode(400);
                result.setMsg("Validation failed!");
            }
            return result;
        }
        catch (Exception e){
            result.setCode(400);
            result.setMsg("Validation failed!");
            return result;
        }
    }
}
