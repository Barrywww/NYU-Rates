package com.example.nyurates.dao.studentDaoImpl;

import com.example.nyurates.entity.Student;
import com.example.nyurates.jdbcUtil.JdbcUtil;
import com.example.nyurates.dao.studentDao;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class studentDaoImpl implements studentDao{
    private PreparedStatement preparedStatement;
    private Connection connection;
    private ResultSet resultSet;

    @Override
    public boolean studentLogin(Student student) {
        boolean result = false;

        String query = "SELECT FROM ";

        return false;
    }
}
