package com.example.nyurates.dao.DaoImpl;

import com.example.nyurates.dao.AdminDao;
import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Prof_req;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.Report;
import com.example.nyurates.entity.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class AdminDaoImpl implements AdminDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    NamedParameterJdbcTemplate namedJdbcTemplate;

    @Override
    public Admin adminBundle(Admin admin) {
        String query = "SELECT netid, name FROM Administrator WHERE email = ? AND password= ?";
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, admin.getEmail(), admin.getPassword());
            if (result.size() == 1) {
                Map<String, Object> map = result.get(0);
                admin.setName((String) map.get("name"));
                admin.setNetid((String) map.get("netid"));
                return admin;
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return null;
    }

    /**
     * Delete Comments
     * @param comment_id
     * @param report_id
     * @return boolean
     */
    @Override
    public boolean adminDeleteComment(int comment_id, int report_id) {
        String query_com = "DELETE FROM Comments WHERE comment_id = ?";
        try{
            this.deleteReport(report_id);
            jdbcTemplate.update(query_com, comment_id);
            return true;
        }catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }


    @Override
    public boolean professorRegist(Professor professor, boolean is_member){
        if (is_member){
            String query = "UPDATE Professor SET is_member = 1, visible = 1, password = ? WHERE email = ?";
            try{
                jdbcTemplate.update(query, professor.getPassword(), professor.getEmail());
                return true;
            } catch (DataAccessException e) {
                SQLException exception = (SQLException) e.getCause();
                exception.printStackTrace();
            }
            return false;
        }
        else{
            String query = "INSERT INTO Professor VALUES (?, ?, ?, ?, ?, 1, 1)";
            try{
                jdbcTemplate.update(query, professor.getEmail(), professor.getNetid(), professor.getName(), "", professor.getDept());
                return true;
            } catch (DataAccessException e) {
                SQLException exception = (SQLException) e.getCause();
                exception.printStackTrace();
            }
            return false;
        }
    }

    /**
     * Search Professor By Emain
     * @param professor_email
     * @return boolean
     */
    @Override
    public boolean searchProfessorByEmail(String professor_email){
        String query = "SELECT netid, name FROM Professor WHERE email = ?";
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, professor_email);
            if (result.size() == 1) {
                return true;
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }

    /**
     * Get Reports
     * @param report_id
     * @param course_code
     * @param comment_user
     * @param comment_id
     * @return ArrayList<Report>
     */
    @Override
    public ArrayList<Report> getReports(Long report_id, Long comment_id, String comment_user, String course_code){
        String query = "SELECT report_id, Report.comment_id AS comment_id, content, course_code, comment_user, report_date, report_reason FROM Report, Comments WHERE Report.comment_id=Comments.comment_id ";
        MapSqlParameterSource params = new MapSqlParameterSource();
        if (report_id != null){
            query += "AND report_id = :report_id ";
            params.addValue("report_id", report_id);
        }
        if (comment_id != null){
            query += "AND comment_id = :comment_id ";
            params.addValue("comment_id", comment_id);
        }
        if (comment_user != null){
            query += "AND user_id = :comment_user ";
            params.addValue("comment_user", comment_user);
        }
        if (course_code != null){
            query += "AND course_code = :course_code ";
            params.addValue("course_code", course_code);
        }
        ArrayList<Report> comments = new ArrayList<Report>();
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query);
            if (result.size() > 0){
                for(int i=0; i<result.size(); i++){
                    Report report = new Report();
                    Map<String, Object> map = result.get(i);
                    report.setReport_id(((Integer) map.get("report_id")).longValue());
                    report.setComment_id((Long) map.get("comment_id"));
                    report.setComment_user((String) map.get("comment_user"));
                    report.setReport_date((LocalDateTime) map.get("report_date"));
                    report.setReport_reason((String) map.get("report_reason"));
                    report.setComment_content((String) map.get("content"));
                    report.setCourse_code((String) map.get("course_code"));
                    comments.add(report);
                }
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return comments;
    }

    /**
     * Get Student List
     * @param netid
     * @param email
     * @param name
     * @return ArrayList<Student>
     */
    @Override
    public ArrayList<Student> studentList(String name, String netid, String email){
        String query = "SELECT email, netid, name FROM Student WHERE 1=1 ";
        MapSqlParameterSource params = new MapSqlParameterSource();
        if (name != null){
            query += "AND name LIKE :name ";
            params.addValue("name", "%" + name + "%");
        }
        if (netid != null){
            query += "AND netid LIKE :netid ";
            params.addValue("netid", "%" + netid + "%");
        }
        if (email != null){
            query += "AND email LIKE :email ";
            params.addValue("email", "%" + email + "%");
        }
        ArrayList<Student> student_list = new ArrayList<Student>();
        try{
            List<Map<String, Object>> result = namedJdbcTemplate.queryForList(query, params);
            if (result.size() > 0){
                for(int i = 0; i< result.size(); i++){
                    Student student = new Student();
                    student.setEmail((String) result.get(i).get("email"));
                    student.setNetid((String) result.get(i).get("netid"));
                    student.setName((String) result.get(i).get("name"));
                    student_list.add(student);
                }
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return student_list;
    }

    /**
     * Get Student List
     * @param netid
     * @param email
     * @param name
     * @param department
     * @return ArrayList<Professor>
     */
    @Override
    public ArrayList<Professor> profList(String name, String netid, String email, String department){
        String query = "SELECT email, netid, name, department, visible, is_member FROM Professor WHERE 1=1 ";
        MapSqlParameterSource params = new MapSqlParameterSource();
        if (name != null){
            query += "AND name LIKE :name ";
            params.addValue("name", "%" + name + "%");
        }
        if (netid != null){
            query += "AND netid LIKE :netid ";
            params.addValue("netid", "%" + netid + "%");
        }
        if (email != null){
            query += "AND email LIKE :email ";
            params.addValue("email", "%" + email + "%");
        }
        if (email != null){
            query += "AND department LIKE :department ";
            params.addValue("department", "%" + department + "%");
        }
        ArrayList<Professor> prof_list = new ArrayList<Professor>();
        try{
            List<Map<String, Object>> result = namedJdbcTemplate.queryForList(query, params);
            if (result.size() > 0){
                for(int i = 0; i< result.size(); i++){
                    Professor professor = new Professor();
                    professor.setEmail((String) result.get(i).get("email"));
                    professor.setNetid((String) result.get(i).get("netid"));
                    professor.setName((String) result.get(i).get("name"));
                    professor.setDept((String) result.get(i).get("department"));
                    prof_list.add(professor);
                }
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return prof_list;
    }

    /**
     * Delete Report
     * @param report_id
     * @return boolean
     */
    @Override
    public boolean deleteReport(int report_id){
        String query = "DELETE FROM Report WHERE report_id = ?";
        try{
            jdbcTemplate.update(query, report_id);
            return true;
        }catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }

    /**
     * Get Professor Request
     * @return ArrayList<Prof_req>
     */
    @Override
    public ArrayList<Prof_req> getProfReq(){
        ArrayList<Prof_req> result = new ArrayList<Prof_req>();

        String query = "SELECT * FROM Prof_req";
        try{
            List<Map<String, Object>> reqResult = jdbcTemplate.queryForList(query);
            if (reqResult.size() > 0){
                for (int i=0; i<reqResult.size(); i++){
                    Map<String, Object> map = reqResult.get(i);
                    Prof_req req = new Prof_req();
                    req.setReq_id(Long.valueOf(String.valueOf(map.get("request_id"))));
                    req.setProfessor_course_code((String) map.get("professor_course_code"));
                    req.setProfessor_course_semester((String) map.get("professor_course_semester"));
                    req.setProfessor_course_name((String) map.get("professor_course_name"));
                    req.setProfessor_email((String) map.get("professor_email"));
                    req.setProfessor_dept((String) map.get("professor_department"));
                    req.setProfessor_name((String) map.get("professor_name"));
                    result.add(req);
                }
                return result;
            }
        }catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return result;
    }

    /**
     * Get Professor Request By ID
     * @param request_id
     * @return Prof_req
     */
    @Override
    public Prof_req getProfReqById(int request_id){
        Prof_req req = new Prof_req();
        String query = "SELECT * FROM Prof_req WHERE request_id = ?";
        try{
            List<Map<String, Object>> result =  jdbcTemplate.queryForList(query, request_id);
            System.out.println(request_id);
            if(result.size() > 0){
                Map<String, Object> map = result.get(0);
                req.setReq_id(Long.valueOf(String.valueOf(map.get("request_id"))));
                req.setProfessor_course_code((String) map.get("professor_course_code"));
                req.setProfessor_course_semester((String) map.get("professor_course_semester"));
                req.setProfessor_course_name((String) map.get("professor_course_name"));
                req.setProfessor_email((String) map.get("professor_email"));
                req.setProfessor_dept((String) map.get("professor_department"));
                req.setProfessor_name((String) map.get("professor_name"));
                return req;
            }
        }catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return req;
    }

    /**
     * Handle Professor Request
     * @param request_id
     * @param operation
     * @return boolean
     */
    @Override
    public boolean handleProfReq(int request_id, boolean operation){
        if(operation){
            Prof_req prof_req = this.getProfReqById(request_id);
            Professor prof = new Professor();
            Course course = new Course();
            prof.setDept(prof_req.getProfessor_dept());
            prof.setEmail(prof_req.getProfessor_email());
            prof.setName(prof_req.getProfessor_name());
            prof.setVisible(1);
            prof.setNetid(prof_req.getProfessor_email().split("@")[0]);
            course.setCourse_code(prof_req.getProfessor_course_code());
            course.setCourse_name(prof_req.getProfessor_course_name());
            course.setDept_name(prof_req.getProfessor_dept());
            course.setLocation("PDNG");
            course.setSemester(prof_req.getProfessor_course_semester());
            course.setProfessor_id(prof_req.getProfessor_email().split("@")[0]);
            this.professorRegist(prof, false);
            this.addCourse(course);
            this.deleteReq(request_id);
            return true;
        }
        else{
            this.deleteReq(request_id);
            return true;
        }
    }

    /**
     * Add Professor
     * @param professor
     * @return boolean
     */
    @Override
    public boolean addProfessor(Professor professor){
        return true;
    }

    /**
     * Add Course
     * @param course
     * @return boolean
     */
    @Override
    public boolean addCourse(Course course){
        String query = "INSERT INTO Course VALUES (?, ?, ?, ?, ?, ?)";
        try{
            jdbcTemplate.update(query, course.getCourse_name(), course.getCourse_code(), course.getDept_name(), course.getLocation(), course.getSemester(), course.getProfessor_id());
            return true;
        } catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return true;

    }

    /**
     * Delete Request
     * @param request_id
     * @return boolean
     */
    @Override
    public boolean deleteReq(int request_id){
        String query = "DELETE FROM Prof_req WHERE request_id = ?";
        try{
            System.out.println(request_id);
            jdbcTemplate.update(query, request_id);
            return true;
        } catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }

    /**
     * Delete Student
     * @param email
     * @return boolean
     */
    @Override
    public boolean deleteStudent(String email){
        String query = "DELETE FROM Student WHERE email = ?";
        String query_delete_comment = "DELETE FROM Comments WHERE user_id = ?";
        try{
            jdbcTemplate.update(query_delete_comment, email.split("@")[0]);
            jdbcTemplate.update(query, email);
            return true;
        } catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }

    /**
     * Get Stats
     * @return String
     */
    @Override 
    public String getStats(){
        String result = "";
        try{
            String query =  "SELECT TABLE_NAME, TABLE_ROWS FROM `information_schema`.`tables` WHERE `table_schema` = 'nyurates' AND (TABLE_NAME IN ('Professor', 'Student', 'Comments', 'Course'))";
            List<Map<String, Object>> r = jdbcTemplate.queryForList(query);
            for (int i=0; i<r.size(); i++){
                Map<String, Object> item = r.get(i);
                result += String.valueOf(item.get("TABLE_ROWS"));
                result += " ";
            }
            return result;
        }
        catch (Exception e){
            e.printStackTrace();
            return result;
        }
    }
}
