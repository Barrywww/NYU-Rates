package com.example.nyurates.dao;
import com.example.nyurates.entity.Student;

public interface StudentDao {
    public Student studentLogin(Student student);
    public boolean studentRegist(Student student);
}
