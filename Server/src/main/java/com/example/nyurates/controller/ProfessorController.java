package com.example.nyurates.controller;

import com.example.nyurates.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/professor")
@CrossOrigin
public class ProfessorController {

    //植入对象
    @Autowired
    private ProfessorService professorService;

//    @GetMapping(value = "/stats_course")
//    public CourseStatsResult get_course_stats(HttpSession session, @RequestBody Course course){
//        if ((String) session.getAttribute("role") == "professor" & (String) session.getAttribute("state") == "loggedin") {
//            return professorService.get_course_stats(course);
//        }
//        else{
//            UnauthorizedResult failureResult = new UnauthorizedResult();
//            return failureResult;
//        }
//    }

}
