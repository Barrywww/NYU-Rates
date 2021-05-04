package com.example.nyurates.dao.studentDaoImpl;

import com.example.nyurates.dao.AdminDao;
import com.example.nyurates.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
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
            int result = jdbcTemplate.update(query, comment_id);
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

}
