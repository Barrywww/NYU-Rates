package com.example.nyurates.controller;

import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.results.*;
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

    @RequestMapping(value = "/getreports")
    public ReportResult getReports(@RequestBody Map<String, Object> params){
        return adminService.getReports();
    }

    @PostMapping(value = "/reviewcomment")
    public Result reviewComment(@RequestBody Map<String, Object> params) {
        return adminService.reviewComment((Integer) params.get("comment_id"), (Boolean) params.get("validity"));
    }

    @RequestMapping (value="/getprofrequests")
    public Result getProfRequests(@RequestBody Map<String, Object> params){
        return adminService.getProfRequests();
    } 
}
