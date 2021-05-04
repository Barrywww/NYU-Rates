package com.example.nyurates.dao.DaoImpl;

import com.example.nyurates.dao.PublicDao;
import com.example.nyurates.entity.Comment;
import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class PublicDaoImpl implements PublicDao {

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

    @Override
    public Course searchCourse(Course course){
        String queryCourseName = "SELECT course_name FROM Course WHERE code = ?";
        String queryCourseCode = "SELECT code FROM Course WHERE course_name = ?";
        try{
            if(course.getCourse_code() != null){
                List<Map<String, Object>> result = jdbcTemplate.queryForList(queryCourseName, course.getCourse_code());
                if (result.size() >0) {
                    Map<String, Object> map = result.get(0);
                    course.setCourse_name((String) map.get("course_name"));
                    return course;
                }
            }else{
                List<Map<String, Object>> result = jdbcTemplate.queryForList(queryCourseCode, course.getCourse_name());
                if (result.size() >0) {
                    Map<String, Object> map = result.get(0);
                    course.setCourse_code((String) map.get("code"));
                    return course;
                }
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return null;
    }

    @Override
    public ArrayList<Comment> searchCourseComments(Course course){
        String query = "SELECT * FROM Comments WHERE course_code = ?";
        ArrayList<Comment> comments = new ArrayList<Comment>();
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, course.getCourse_code());
            if (result.size() > 0) {
                for (int i = 0; i < result.size(); i ++){
                    Comment comment = new Comment();
                    Map<String, Object> map = result.get(i);
                    comment.setComment_id((Long) map.get("comment_id"));
                    comment.setContent((String) map.get("content"));
//                    comment.setDate((Date) map.get("time"));
                    comment.setLikes((Long) map.get("likes"));
                    comment.setDislikes((Long) map.get("dislikes"));
                    comment.setRate((Double) map.get("rate"));
                    comment.setCourse_code((String) map.get("course_code"));
                    comment.setSemester((String) map.get("semester"));
                    comment.setProfessor_id((String) map.get("professor_id"));
                    comment.setStudent_id((String) map.get("user_id"));
                    comments.add(comment);
                }
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return comments;
    }

    @Override
    public double searchAverageRating(Course course){
        String query = "SELECT AVG(rate) AS AverageRate FROM Comments WHERE course_code = ?";
        double rating = 0;
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, course.getCourse_code());
            if (result.size() == 1) {
                Map<String, Object> map = result.get(0);
                rating = (Double) map.get("AverageRate");
                return rating;
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return rating;
    }

    @Override
    public double searchAverageRating(Professor professor){
        String query = "SELECT code FROM Course WHERE professor_id = ?";
        double rating = 0;
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, professor.getNetid());
            double total_rating = 0;
            if (result.size() > 0) {
                for (int i = 0; i < result.size(); i ++){
                    Course course = new Course();
                    Map<String, Object> map = result.get(i);
                    course.setCourse_code((String) map.get("code"));
                    total_rating = total_rating + searchAverageRating(course);
                }
                rating = total_rating / result.size();
                return rating;
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return rating;
    }

    @Override
    public Professor searchProfessor(Professor professor){
        String queryProfessorName = "SELECT name, visible FROM Professor WHERE netid = ?";
        String queryProfessorID = "SELECT netid, visible FROM Professor WHERE name = ?";
        try{
            if(professor.getNetid() != null){
                List<Map<String, Object>> result = jdbcTemplate.queryForList(queryProfessorName, professor.getNetid());
                if (result.size() >0) {
                    Map<String, Object> map = result.get(0);
                    professor.setName((String) map.get("name"));
                    professor.setVisible((Integer) map.get("visible"));
                    return professor;
                }
            }else{
                List<Map<String, Object>> result = jdbcTemplate.queryForList(queryProfessorID, professor.getName());
                if (result.size() >0) {
                    Map<String, Object> map = result.get(0);
                    professor.setNetid((String) map.get("netid"));
                    professor.setVisible((Integer) map.get("visible"));
                    return professor;
                }
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return null;
    }

}
