package com.example.nyurates.controller;

import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.LoginResult;
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

}
