package com.example.nyurates.dao.studentDaoImpl;

import com.example.nyurates.entity.Student;
import com.example.nyurates.jdbcUtil.JdbcUtil;
import com.example.nyurates.dao.StudentDao;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class StudentDaoImpl implements StudentDao{
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
