package com.example.nyurates.service;

import java.util.ArrayList;

import com.example.nyurates.dao.AdminDao;
import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.Report;
import com.example.nyurates.entity.results.LoginResult;
import com.example.nyurates.entity.results.ReportResult;
import com.example.nyurates.entity.results.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class AdminServiceImpl implements AdminService{
    @Autowired
    private AdminDao dao;

    /**
     * Login
     * @param admin 用户名和密码
     * @return LoginResult
     */
    public LoginResult login(Admin admin) {
        LoginResult loginResult = new LoginResult();
        loginResult.setCode(400);
        try {
            Admin adm = dao.adminBundle(admin);
            if(adm == null){
                loginResult.setMsg("Unable to login with provided credentials.");
                loginResult.setCode(400);
            }else{
                loginResult.setMsg("Successfully Logged in!");
                loginResult.setCode(200);
            }
        } catch (Exception e) {
            loginResult.setMsg(e.getMessage());
            e.printStackTrace();
        }
        return loginResult;
    }

    public Result reviewComment(int comment_id, boolean validity){
        Result result = new Result();
        result.setCode(400);
        try{
            if (validity){
                result.setCode(200);
                result.setMsg("This comment is valid");
            }else{
                boolean r = dao.adminDeleteComment(comment_id);
                if (r){
                    result.setCode(200);
                    result.setMsg("Successfully delete invalid comment");
                }else{
                    result.setMsg("Unsuccessfully delete invalid comment");
                }
            }
        }catch (Exception e) {
            result.setMsg(e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    public ReportResult getReports() {
        ReportResult result = new ReportResult();
        ArrayList<Report> reports;
        try{
            reports = dao.getReports();
            if (reports.size() > 0){
                result.setCode(200);
                result.setMsg("Successfully got reports");
                result.setReportsArray(reports);
            }
            else{
                result.setCode(400);
                result.setMsg("Failed to get reports");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
