package com.example.nyurates.service;

import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.Result;
import com.example.nyurates.dao.studentDaoImpl.StudentDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class StudentServiceImpl implements StudentService{

    //植入dao层对象
    @Autowired
    private StudentDaoImpl dao;

    /**
     * 注册
     * @param student 参数封装
     * @return Result
     */
    public Result<Student> regist(Student student) {
        Result<Student> result = new Result<>();
        result.setSuccess(false);
        result.setDetail(null);
        try {
            Student existStudent = dao.studentLogin(student);
            if(existStudent != null){
                //如果用户名已存在
                result.setMsg("Email existed!");
            }else{
                dao.studentRegist(student);
                System.out.println(student.getNetId());
                result.setMsg("Successfully registered!");
                result.setSuccess(true);
                result.setDetail(student);
            }
        } catch (Exception e) {
            result.setMsg(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }
    /**
     * 登录
     * @param student 用户名和密码
     * @return Result
     */
    public Result<Student> login(Student student) {
        Result<Student> result = new Result<>();
        result.setSuccess(false);
        result.setDetail(null);
        try {
            Student std= dao.studentLogin(student);
            if(std == null){
                result.setMsg("The email or the password is wrong!");
            }else{
                result.setMsg("Successfully Logged in!");
                result.setSuccess(true);
                result.setDetail(std);
            }
        } catch (Exception e) {
            result.setMsg(e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

}
