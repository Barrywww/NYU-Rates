package com.example.nyurates.dao.DaoImpl;

import com.example.nyurates.dao.PublicDao;
import com.example.nyurates.entity.*;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class PublicDaoImpl implements PublicDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    NamedParameterJdbcTemplate namedJdbcTemplate;

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
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, student.getEmail(), DigestUtils.md5Hex(student.getPassword()));
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
    public Professor professorLogin(Professor professor){
        String query = "SELECT netid, name FROM Professor WHERE email = ? AND password= ?";
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, professor.getEmail(), DigestUtils.md5Hex(professor.getPassword()));
            if (result.size() == 1) {
                Map<String, Object> map = result.get(0);
                professor.setName((String) map.get("name"));
                professor.setNetid((String) map.get("netid"));
                return professor;
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
            jdbcTemplate.update(query, student.getEmail(), student.getNetid(), student.getName(), DigestUtils.md5Hex(student.getPassword()));
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
    public Course matchCourse(Course course){
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
    public ArrayList<Course> searchCourse(Course course){
        String query= "SELECT course_name, code, department, " +
                "(SELECT content FROM Comments WHERE Comments.course_code = Course.code ORDER BY likes DESC LIMIT 1) AS hot_comment, " +
                "(SELECT AVG(rate) FROM Comments WHERE course_code = Course.code) AS rate " +
                "FROM Course WHERE (code LIKE ? OR course_name LIKE ?)";
        ArrayList<Course> resultList = new ArrayList<Course>();
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, "%"+course.getCourse_code()+"%", "%"+course.getCourse_name()+"%");
            if (result.size() > 0) {
                for (int i=0; i<result.size(); i++){
                    Map<String, Object> map = result.get(i);
                    course.setCourse_name((String) map.get("course_name"));
                    course.setCourse_code((String) map.get("code"));
                    course.setDept_name((String) map.get("department"));
                    course.setHot_comment((String) map.get("hot_comment"));
                    course.setRate((double) map.get("rate"));
                    resultList.add(course);
                }
                return resultList;
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return resultList;
    }

    @Override
    public ArrayList<Comment> searchComments(Course course){
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
                    comment.setDate((LocalDateTime) map.get("time"));
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
    public ArrayList<Comment> searchComments(Professor professor){
        String query = "SELECT * FROM Comments WHERE professor_id = ?";
        ArrayList<Comment> comments = new ArrayList<Comment>();
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, professor.getNetid());
            if (result.size() > 0) {
                for (int i = 0; i < result.size(); i ++){
                    Comment comment = new Comment();
                    Map<String, Object> map = result.get(i);
                    comment.setComment_id((Long) map.get("comment_id"));
                    comment.setContent((String) map.get("content"));
                    comment.setDate((LocalDateTime) map.get("time"));
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
    public ArrayList<Comment> searchComments(Student student){
        String query = "SELECT * FROM Comments WHERE user_id = ?";
        ArrayList<Comment> comments = new ArrayList<Comment>();
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, student.getNetid());
            if (result.size() > 0) {
                for (int i = 0; i < result.size(); i ++){
                    Comment comment = new Comment();
                    Map<String, Object> map = result.get(i);
                    comment.setComment_id((Long) map.get("comment_id"));
                    comment.setContent((String) map.get("content"));
                    comment.setDate((LocalDateTime) map.get("time"));
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
    public Professor matchProfessor(Professor professor){
        String queryProfessorName = "SELECT name, department FROM Professor WHERE netid = ? AND visible = 1";
        String queryProfessorID = "SELECT netid, department FROM Professor WHERE name = ? AND visible = 1";
        try{
            if(professor.getNetid() != null){
                List<Map<String, Object>> result = jdbcTemplate.queryForList(queryProfessorName, professor.getNetid());
                if (result.size() > 0) {
                    Map<String, Object> map = result.get(0);
                    professor.setName((String) map.get("name"));
                    professor.setDept((String) map.get("department"));
                    return professor;
                }
            }else{
                List<Map<String, Object>> result = jdbcTemplate.queryForList(queryProfessorID, professor.getName());
                if (result.size() >0) {
                    Map<String, Object> map = result.get(0);
                    professor.setNetid((String) map.get("netid"));
                    professor.setDept((String) map.get("department"));
                    return professor;
                }
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return null;
    }


    @Override
    public ArrayList<Professor> searchProfessor(Professor professor){
        String query= "SELECT name, netid, department, " +
        "(SELECT content FROM Comments WHERE Comments.professor_id = Professor.netid ORDER BY likes DESC LIMIT 1) AS hot_comment, " + 
        "(SELECT AVG(rate) FROM Comments WHERE professor_id = Professor.netid) AS rate " + 
        "FROM Professor WHERE (netid LIKE ? OR name LIKE ?) AND visible = 1";
        ArrayList<Professor> resultList = new ArrayList<Professor>();
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, "%"+professor.getNetid()+"%", "%"+professor.getName()+"%");
            if (result.size() > 0) {
                for (int i=0; i<result.size(); i++){
                    Map<String, Object> map = result.get(i);
                    professor.setName((String) map.get("name"));
                    professor.setNetid((String) map.get("netid"));
                    professor.setDept((String) map.get("department"));
                    professor.setHot_comment((String) map.get("hot_comment"));
                    professor.setRate((double) map.get("rate"));
                    resultList.add(professor);
                }
                return resultList;
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return resultList;
    }

    @Override
    public ArrayList<Course> searchProfessorCourse(Professor professor){
        String query = "SELECT * FROM Course WHERE professor_id = ?";
        ArrayList<Course> courses = new ArrayList<Course>();
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, professor.getNetid());
            if (result.size() > 0) {
                for (int i = 0; i < result.size(); i ++){
                    Course course = new Course();
                    Map<String, Object> map = result.get(i);
                    course.setCourse_name((String) map.get("course_name"));
                    course.setCourse_code((String) map.get("code"));
                    course.setSemester((String) map.get("semester"));
                    course.setLocation((String) map.get("location"));
                    course.setDept_name((String) map.get("department"));
                    course.setProfessor_id(professor.getNetid());
                    courses.add(course);
                }
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return courses;
    }

    @Override
    public boolean postComment(Comment comment){
        String query = "INSERT INTO Comments(content, time, likes, dislikes, rate, course_code, semester, professor_id, user_id) VALUES (?, ?, 0, 0, ?, ?, ?, ?, ?)";
        try{
            jdbcTemplate.update(query, comment.getContent(), comment.getDate(), comment.getRate(), comment.getCourse_code(), comment.getSemester(), comment.getProfessor_id(), comment.getStudent_id());
            return true;
        } catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean handleLike(Long comment_id, boolean isLike){
        String query = "SELECT likes, dislikes FROM Comments WHERE comment_id = ?";
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, comment_id);
            if (result.size() == 1) {
                Map<String, Object> map = result.get(0);
                Long likes = (Long) map.get("likes");
                Long dislikes = (Long) map.get("dislikes");
                if (isLike){
                    likes += 1;
                    String queryLike = "UPDATE Comments SET likes = ? WHERE comment_id = ? ";
                    jdbcTemplate.update(queryLike, likes, comment_id);
                    return true;
                }else{
                    dislikes += 1;
                    String queryDislike = "UPDATE Comments SET dislikes = ? WHERE comment_id = ? ";
                    jdbcTemplate.update(queryDislike, dislikes, comment_id);
                    return true;
                }
            }
        } catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean addprofessor(Prof_req prof_req){
        String query = "INSERT INTO Prof_req(professor_name, professor_department, professor_email, professor_course_name, professor_course_code, professor_course_semester) VALUES (?, ?, ?, ?, ?, ?)";
        try{
            jdbcTemplate.update(query, prof_req.getProfessor_name(), prof_req.getProfessor_dept(), prof_req.getProfessor_email(), prof_req.getProfessor_course_name(), prof_req.getProfessor_course_code(), prof_req.getProfessor_course_semester());
            return true;
        } catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean reportComment(Report report){
        String query = "INSERT INTO Report(comment_id, comment_user, report_date, report_reason, status) VALUES (?, ?, ?, ?, ?)";
        try{
            jdbcTemplate.update(query, report.getComment_id(), report.getComment_user(), report.getReport_date(), report.getReport_reason(), report.getStatus());
            return true;
        } catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }

}
