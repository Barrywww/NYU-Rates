package com.example.nyurates.dao.studentDaoImpl;

import com.example.nyurates.dao.StudentDao;
import com.example.nyurates.entity.Student;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Component
public class StudentDaoImpl implements StudentDao {
    private PreparedStatement preparedStatement;
    private Connection connection;
    private ResultSet resultSet;

    @Override
    public Student studentLogin(Student student) {
        boolean result = false;

        String query = "SELECT FROM ";

        return student;
    }
}
