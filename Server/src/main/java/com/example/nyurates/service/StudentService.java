package com.example.nyurates.service;

import com.example.nyurates.entity.results.LoginResult;
import com.example.nyurates.entity.Student;

public interface StudentService {
    public LoginResult regist(Student student);
    public LoginResult login(Student student);
}
