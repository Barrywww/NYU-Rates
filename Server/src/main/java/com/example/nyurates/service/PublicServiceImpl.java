package com.example.nyurates.service;

import com.example.nyurates.dao.StudentDao;
import com.example.nyurates.entity.results.LoginResult;
import com.example.nyurates.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class PublicServiceImpl implements PublicService {

    //植入dao层对象
    @Autowired
    private StudentDao dao;

    /**
     * 注册
     * @param student 参数封装
     * @return Result
     */
    public LoginResult regist(Student student) {
        LoginResult loginResult = new LoginResult();
        loginResult.setCode(400);
        try {
            Student existStudent = dao.searchByEmail(student);
            if(existStudent != null){
                // student already existed
                loginResult.setMsg("The account has existed. Failed to register.");
                loginResult.setCode(400);
            }else{
                boolean r = dao.studentRegist(student);
                if (r){
                    System.out.println(student.getNetid());
                    loginResult.setMsg("Successfully registered!");
                    loginResult.setCode(200);
                }
            }
        } catch (Exception e) {
            loginResult.setMsg(e.getMessage());
            e.printStackTrace();
        }
        return loginResult;
    }

    /**
     * Login
     * @param student 用户名和密码
     * @return LoginResult
     */
    public LoginResult login(Student student) {
        LoginResult loginResult = new LoginResult();
        loginResult.setCode(400);
        try {
            Student std= dao.studentLogin(student);
            if(std == null){
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

}
