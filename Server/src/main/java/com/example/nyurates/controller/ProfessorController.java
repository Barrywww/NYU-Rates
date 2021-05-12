package com.example.nyurates.controller;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.results.CourseStatsResult;
import com.example.nyurates.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/professor")
@CrossOrigin
public class ProfessorController {

    //植入对象
    @Autowired
    private ProfessorService professorService;

    @GetMapping(value = "/stats_course")
    public CourseStatsResult get_course_stats(@RequestBody Course course){
        return professorService.get_course_stats(course);
    }

}