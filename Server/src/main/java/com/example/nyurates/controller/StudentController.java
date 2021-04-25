package com.example.nyurates.controller;

import com.example.nyurates.entity.Result;
import com.example.nyurates.entity.Student;
import com.example.nyurates.service.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/student")
public class StudentController {
    //植入对象
    @Autowired
    private StudentServiceImpl studentService;

    /**
     * 注册
     * @param student 参数封装
     * @return Result
     */
    @PostMapping(value = "/regist")
    public Result<Student> regist(Student student){
        return studentService.regist(student);
    }

    /**
     * 登录
     * @param student 参数封装
     * @return Result
     */
    @PostMapping(value = "/login")
    public Result<Student> login(Student student){
        return studentService.login(student);
    }

}
