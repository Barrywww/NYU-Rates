package com.example.nyurates.dao.DaoImpl;

import com.example.nyurates.dao.AdminDao;
import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.Report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
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

    @Override
    public boolean adminDeleteComment(int comment_id) {
        String query = "DELETE FROM Comments WHERE comment_id = ?";
        try{
            jdbcTemplate.update(query, comment_id);
            return true;
        }catch (DataAccessException e) {
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return false;
    }

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

    @Override
    public ArrayList<Report> getReports(){
        String query = "SELECT report_id, comment_id, comment_user, report_date FROM Report ;";
        ArrayList<Report> comments = new ArrayList<Report>();
        try{
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query);
            if (result.size() > 0){
                for(int i=0; i<result.size(); i++){
                    Report report = new Report();
                    Map<String, Object> map = result.get(i);
                    report.setComment_id((Long) map.get("comment_id"));
                    report.setComment_user((String) map.get("comment_user"));
                    report.setReport_date((LocalDateTime) map.get("report_date"));
                    report.setReport_reason((String) map.get("report_reason"));
                }
            }
        } catch (DataAccessException e){
            SQLException exception = (SQLException) e.getCause();
            exception.printStackTrace();
        }
        return comments;
    }

}
