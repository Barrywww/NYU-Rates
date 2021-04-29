package com.example.nyurates.controller;

import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.results.LoginResult;
import com.example.nyurates.entity.results.Result;
import com.example.nyurates.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    /**
     * 登录
     * @param admin 参数封装
     * @return LoginResult
     */
    @PostMapping(value = "/login")
    public LoginResult login(@RequestBody Admin admin){
        return adminService.login(admin);
    }

    @PostMapping(value = "/reviewcomment")
    public Result reviewComment(@RequestBody Map params) {
        return adminService.reviewComment((Integer) params.get("comment_id"), (Boolean) params.get("validity"));
    }
}
