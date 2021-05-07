package com.example.nyurates.service;

import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.results.Result;
import com.example.nyurates.entity.results.ReportResult;
import com.example.nyurates.entity.results.LoginResult;
import com.example.nyurates.entity.results.ProfReqResult;

public interface AdminService {
    public LoginResult login(Admin admin);
    public Result reviewComment(int comment_id, boolean validity);
    public ReportResult getReports();
    public ProfReqResult getProfRequests();
}
