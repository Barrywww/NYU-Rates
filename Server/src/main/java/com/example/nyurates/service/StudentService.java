package com.example.nyurates.service;

import com.example.nyurates.entity.Result;
import com.example.nyurates.entity.Student;

public interface StudentService {
    public Result regist(Student student);
    public Result login(Student student);
}
