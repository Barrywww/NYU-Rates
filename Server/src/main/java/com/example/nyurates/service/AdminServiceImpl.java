package com.example.nyurates.service;

import java.util.ArrayList;
import java.util.Map;

import com.example.nyurates.dao.AdminDao;
import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.Prof_req;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.Report;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.LoginResult;
import com.example.nyurates.entity.results.ProfListResult;
import com.example.nyurates.entity.results.ProfReqResult;
import com.example.nyurates.entity.results.ReportListResult;
import com.example.nyurates.entity.results.Result;
import com.example.nyurates.entity.results.StudentListResult;

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
                loginResult.setUsername(adm.getName());
                loginResult.setMsg("Successfully Logged in!");
                loginResult.setCode(200);
            }
        } catch (Exception e) {
            loginResult.setMsg(e.getMessage());
            e.printStackTrace();
        }
        return loginResult;
    }

    public Result reviewComment(int comment_id, int report_id, boolean validity){
        Result result = new Result();
        result.setCode(400);
        try{
            if (validity){
                result.setCode(200);
                result.setMsg("This comment is valid");
                boolean r = dao.deleteReport(report_id);
                if (r){
                    result.setCode(200);
                    result.setMsg("Successfully delete invalid comment");
                }else{
                    result.setMsg("Unsuccessfully delete invalid comment");
                }
            }else{
                boolean r = dao.adminDeleteComment(comment_id, report_id);
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

    public StudentListResult studentList(String name, String netid, String email){
        StudentListResult result = new StudentListResult();
        result.setCode(400);
        try{
            ArrayList<Student> student =  dao.studentList(name, netid, email);
            result.setStudent_list(student);
            result.setCode(200);
            result.setMsg("Successfully got student list");
        }
        catch (Exception e){
            result.setMsg("Unable to get student list.");
        }
        return result;
    }

    public ProfListResult profList(String name, String netid, String email, String department){
        ProfListResult result = new ProfListResult();
        result.setCode(400);
        try{
            ArrayList<Professor> professor =  dao.profList(name, netid, email, department);
            result.setProfList(professor);
            result.setCode(200);
            result.setMsg("Successfully got professor list");
        }
        catch (Exception e){
            result.setMsg("Unable to get professor list.");
        }
        return result;
    }

    public ReportListResult getReports(Long report_id, Long comment_id, String comment_user, String course_code) {
        ReportListResult result = new ReportListResult();
        ArrayList<Report> reports;
        try{
            reports = dao.getReports(report_id, comment_id, comment_user, course_code);
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

    public ProfReqResult getProfRequests(){
        ProfReqResult result = new ProfReqResult();
        result.setCode(400);
        ArrayList<Prof_req> requests;
        try{
            requests = dao.getProfReq();
            result.setCode(200);
            result.setMsg("Success");
            result.setProfRequests(requests);
            return result;
        }
        catch(Exception e){
            e.printStackTrace();
            return result;
        }
    }

    public Result handleProfReq(int request_id, boolean operation){
        Result result = new Result();
        result.setCode(400);
        try{
            boolean r = dao.handleProfReq(request_id, operation); 
            if (r){
                result.setCode(200);
                result.setMsg("Success");
                return result;
            }
            else{
                return result;
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return result;
        }
    };

    public Result deleteStudent(String email){
        Result result = new Result();
        result.setCode(400);
        try{
            boolean r = dao.deleteStudent(email);
            if(r){
                result.setCode(200);
                result.setMsg("Success");
            }
            return result;
        }
        catch (Exception e){
            return result;
        }
    }

    public Result getStatistics(){
        Result result = new Result();
        result.setCode(400);
        try{
            String r = dao.getStats();
            result.setCode(200);
            result.setMsg(r);
            return result;
        }
        catch (Exception e){
            return result;
        }
        
    }
}
