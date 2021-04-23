package com.example.nyurates.dao.studentDaoImpl;

import com.example.nyurates.entity.Student;
import com.example.nyurates.jdbcUtil.JdbcUtil;
import com.example.nyurates.dao.StudentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

class StudentDaoImplBak implements StudentDao{
    private PreparedStatement preparedStatement;
    private Connection connection;
    private ResultSet resultSet;

    @Override
    public Student studentLogin(Student student) {
        ResultSet result;
        boolean success = false;
        String query = "SELECT netid, name FROM Students WHERE email = ? AND password= ?";
        try {
            connection = JdbcUtil.getConnection();
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,student.getEmail());
            preparedStatement.setString(2, student.getPassword());
            result =  preparedStatement.executeQuery();
            if (result.next()){
                String netID = result.getString("netid");
                String name = result.getString("name");
                student.setNetId(netID);
                student.setName(name);
                success = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            if(preparedStatement != null){
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (connection != null){
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return success ? student:null;
    }

    @Override
    public void studentRegist(Student student){
        String query = "INSERT INTO Student (email, netid, name, password) VALUES (?, ?, ?, ?)";
        try {
            connection = JdbcUtil.getConnection();
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,student.getEmail());
            preparedStatement.setString(2, student.getNetId());
            preparedStatement.setString(3, student.getName());
            preparedStatement.setString(2, student.getPassword());
            int n =  preparedStatement.executeUpdate();
//            if (n > 0){
//                String netID = result.getString("netid");
//                String name = result.getString("name");
//                student.setNetId(netID);
//                student.setName(name);
//                success = true;
//            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            if(preparedStatement != null){
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (connection != null){
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

@Repository
public class StudentDaoImpl implements StudentDao{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Student studentLogin(Student student) {
        String query = "SELECT netid, name FROM Student WHERE email = ? AND password= ?";
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, student.getEmail(), student.getPassword());
            if (result.size() == 1) {
                Map<String, Object> map = result.get(0);
                student.setName((String) map.get("name"));
                student.setNetId((String) map.get("netid"));
                return student;
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return null;
    }

    @Override
    public void studentRegist(Student student) {
    }
}
