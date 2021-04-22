package com.example.nyurates.service;

@Service
public class StudentServiceImpl {

    //植入dao层对象
    @Resource(name = "StudentDao")
    private StudentDao dao;

    @Override
    public Student login(String email, String userpassword) {
        return dao.login(email,userpassword);
    }

}
