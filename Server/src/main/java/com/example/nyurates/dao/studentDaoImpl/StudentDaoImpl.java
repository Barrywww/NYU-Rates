package com.example.nyurates.dao.studentDaoImpl;

import com.example.nyurates.dao.StudentDao;
import com.example.nyurates.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class StudentDaoImpl implements StudentDao{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Student studentLogin(Student student) {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        String pwdquery = "SELECT password FROM Student WHERE email = ?";
//        try{
//            List<Map<String, Object>> pwdresult = jdbcTemplate.queryForList(pwdquery, student.getEmail());
//            if(pwdresult.size() == 1){
//                Map<String, Object> pwdmap = pwdresult.get(0);
//                boolean isRight = passwordEncoder.matches(student.getPassword().trim(), (String) pwdmap.get("password"));
//                if(isRight){
//                    String query = "SELECT netid, name, password FROM Student WHERE email = ?";
//                    List<Map<String, Object>> result = jdbcTemplate.queryForList(query, student.getEmail());
//                    Map<String, Object> map = result.get(0);
//                    student.setName((String) map.get("name"));
//                    student.setNetid((String) map.get("netid"));
//                    student.setNetid((String) map.get("password"));
//                    return student;
//                }
//            }
//        } catch (DataAccessException e){
//            SQLException exception = (SQLException) e.getCause();
//            exception.printStackTrace();
//        }
        String query = "SELECT netid, name FROM Student WHERE email = ? AND password= ?";
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, student.getEmail(), student.getPassword());
            if (result.size() == 1) {
                Map<String, Object> map = result.get(0);
                student.setName((String) map.get("name"));
                student.setNetid((String) map.get("netid"));
                return student;
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean studentRegist(Student student) {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        String encodedPassword = passwordEncoder.encode(student.getPassword().trim());
//        student.setPassword(encodedPassword);
        String query = "INSERT INTO Student VALUES (?, ?, ?, ?)";
        try{
            int result = jdbcTemplate.update(query, student.getEmail(), student.getNetid(), student.getName(), student.getPassword());
            return true;
        } catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }

    @Override
    public Student searchByEmail(Student student){
        String query = "SELECT netid, name FROM Student WHERE email = ?";
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, student.getEmail());
            if (result.size() == 1) {
                Map<String, Object> map = result.get(0);
                student.setName((String) map.get("name"));
                student.setNetid((String) map.get("netid"));
                return student;
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return null;
    }

}
