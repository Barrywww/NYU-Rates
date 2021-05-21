package com.example.nyurates.controller;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.results.CommentsResult;
import com.example.nyurates.entity.results.CourseStatsResult;
import com.example.nyurates.entity.results.Result;
import com.example.nyurates.entity.results.UnauthorizedResult;
import com.example.nyurates.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/professor")
@CrossOrigin(origins = "http://localhost:8080", allowCredentials="true")
public class ProfessorController {

    //植入对象
    @Autowired
    private ProfessorService professorService;

    /**
     * Get Course Stats
     * @param course
     * @return CourseStatsResult
     */
    @GetMapping(value = "/stats_course")
    public Result get_course_stats(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        try {
            if (((String) session.getAttribute("role")).equals("professor")) {
                Professor prof = new Professor();
                prof.setNetid(((String) (session.getAttribute("email"))).split("@")[0]);
                return professorService.get_prof_stats(prof);
            }
            else{
                return new UnauthorizedResult();
            }
        }
        catch (Exception e){
            return new UnauthorizedResult();
        }
    }

}