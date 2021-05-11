package com.example.nyurates.service;

import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.results.Result;
import com.example.nyurates.entity.results.StudentListResult;
import com.example.nyurates.entity.results.ReportListResult;
import com.example.nyurates.entity.results.LoginResult;
import com.example.nyurates.entity.results.ProfListResult;
import com.example.nyurates.entity.results.ProfReqResult;

public interface AdminService {
    public LoginResult login(Admin admin);
    public Result reviewComment(int comment_id, boolean validity);
    public StudentListResult studentList(String name, String netid, String email);
    public ProfListResult profList (String name, String netid, String email, String department);
    public ReportListResult getReports(Long report_id, Long comment_id, String comment_user, String course_code);
    public ProfReqResult getProfRequests();
}
