package com.example.nyurates.controller;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.*;
import com.example.nyurates.service.PublicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/public")
public class PublicController {
    //植入对象
    @Autowired
    private PublicService publicService;

    /**
     * 注册
     * @param student 参数封装
     * @return LoginResult
     */
    @PostMapping(value = "/regist")
    public LoginResult regist(@RequestBody Student student){
        return publicService.regist(student);
    }

    /**
     * 登录
     * @param student 参数封装
     * @return LoginResult
     */
    @PostMapping(value = "/login")
    public LoginResult login(@RequestBody Student student){
        return publicService.login(student);
    }

    @GetMapping(value = "/view_course")
    public ViewCourseResult view_course(@RequestBody Course course){
        return publicService.view_course(course);
    }

//    @GetMapping(value = "/view_professor")
//
    @GetMapping(value = "/load_comments")
    public CommentsResult load_comments(@RequestBody Course course){
        return publicService.load_comments(course);
    }

    @PostMapping(value = "/search_course")
    public SearchCourseResult search_course(@RequestBody Course course){
        return publicService.search_course(course);
    }

    @PostMapping(value = "/search_professor")
    public SearchProfessorResult search_professor(@RequestBody Professor professor){
        return publicService.search_professor(professor);
    }
}
