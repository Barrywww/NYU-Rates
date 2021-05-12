package com.example.nyurates.controller;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.*;
import com.example.nyurates.service.PublicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;


@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "http://localhost:8080", allowCredentials="true")
public class PublicController {
    //植入对象
    @Autowired
    private PublicService publicService;

    /**
     * Registery
     * @param student
     * @return LoginResult
     */
    @PostMapping(value = "/regist")
    public Result regist(@RequestBody Student student){
        return publicService.regist(student);
    }

    /**
     * Login
     * @param params
     * @return LoginResult
     */
    @PostMapping(value = "/login")
    public LoginResult login(HttpServletRequest request, @RequestBody Map<String, Object> params){
        // session.setAttribute("loggedIn", "true");
        // session.setAttribute("role", "student");
        // return publicService.login(student);
        LoginResult result;
        
        try{
            if (((String) params.get("role")).equals("student")){
                Student student = new Student();
                student.setEmail((String) params.get("email"));
                student.setPassword((String) params.get("password"));
                result = publicService.loginStudent(student);
                if (result.getCode() == 200){
                    HttpSession session = request.getSession();
                    session.setAttribute("loggedIn", "true");
                    session.setAttribute("role", "student");
                    System.out.println(session.getAttribute("role"));
                    System.out.println(session.getAttribute("loggedIn"));
                }
                return result;
            }
            else if (((String) params.get("role")).equals("professor")){
                Professor professor = new Professor();
                professor.setEmail((String) params.get("email"));
                professor.setPassword((String) params.get("password"));
                result = publicService.loginProfessor(professor);
                if (result.getCode() == 200){
                    HttpSession session = request.getSession();
                    session.setAttribute("loggedIn", "true");
                    session.setAttribute("role", "professor");
                }
                return result;
            }
            else{
                result = new LoginResult();
                result.setCode(400);
                result.setMsg("Invalid Login Request.");
                return result;
            }}
        catch (NullPointerException e){
            result = new LoginResult();
            result.setCode(400);
            result.setMsg("Invalid Login Request.");
            return result;
        }
    }

   @PostMapping(value = "/logout")
   public Result logout(HttpSession session, SessionStatus sessionStatus, @RequestBody Student student){
        try{
            System.out.println(session.getAttribute("role"));
            System.out.println(session.getAttribute("loggedIn"));
            session.removeAttribute("role");
            session.removeAttribute("loggedIn");
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

    @GetMapping(value = "/view_course")
    public ViewCourseResult view_course(@RequestBody Course course){
        return publicService.view_course(course);
    }

    @GetMapping(value = "/view_professor")
    public ViewProfessorResult view_professor(@RequestBody Professor professor){
        return publicService.view_professor(professor);
    }

    @GetMapping(value = "/load_comments")
    public CommentsResult load_comments(@RequestBody Course course){
        return publicService.load_comments(course);
    }

    @PostMapping(value = "/search_course")
    public CourseListResult search_course(@RequestBody Course course){
        return publicService.search_course(course);
    }

    @PostMapping(value = "/search_professor")
    public ProfListResult search_professor(@RequestBody Professor professor){
        return publicService.search_professor(professor);
    }
}
