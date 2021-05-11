package com.example.nyurates.dao;

import java.util.ArrayList;

import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.*;

public interface AdminDao {
    public Admin adminBundle(Admin admin);
    public boolean searchProfessorByEmail(String professor_email);
    public boolean adminDeleteComment(int comment_id);
    public ArrayList<Report> getReports(Long report_id, Long comment_id, String comment_user, String course_code);
    public ArrayList<Student> studentList(String name, String netid, String email);
    public ArrayList<Professor> profList (String name, String netid, String email, String department);
}
