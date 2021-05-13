package com.example.nyurates.dao;

import java.util.ArrayList;

import com.example.nyurates.entity.Admin;
import com.example.nyurates.entity.*;

public interface AdminDao {
    public Admin adminBundle(Admin admin);
    public boolean searchProfessorByEmail(String professor_email);
    public boolean professorRegist(Professor professor, boolean is_member);
    public boolean adminDeleteComment(int comment_id, int report_id);
    public ArrayList<Report> getReports(Long report_id, Long comment_id, String comment_user, String course_code);
    public ArrayList<Student> studentList(String name, String netid, String email);
    public ArrayList<Professor> profList (String name, String netid, String email, String department);
    public boolean deleteReport(int report_id);
    public ArrayList<Prof_req> getProfReq();
    public Prof_req getProfReqById(int request_id);
    public boolean handleProfReq(int request_id, boolean operation);
    public boolean addProfessor(Professor professor);
    public boolean addCourse(Course course);
    public boolean deleteReq(int request_id);
}
