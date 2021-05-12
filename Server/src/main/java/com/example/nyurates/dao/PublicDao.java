package com.example.nyurates.dao;

import com.example.nyurates.entity.*;

import java.util.ArrayList;

public interface PublicDao {
    public Student studentLogin(Student student);
    public Professor professorLogin(Professor professor);
    public boolean studentRegist(Student student);
    public Student searchByEmail(Student student);
    public Course matchCourse(Course course);
    public ArrayList<Course> searchCourse(Course course);
    public ArrayList<Comment> searchComments(Course course);
    public ArrayList<Comment> searchComments(Professor professor);
    public ArrayList<Comment> searchComments(Student student);
    public double searchAverageRating(Course course);
    public double searchAverageRating(Professor professor);
    public ArrayList<Professor> searchProfessor(Professor professor);
    public Professor matchProfessor(Professor professor);
    public ArrayList<Course> searchProfessorCourse(Professor professor);
    public boolean postComment(Comment comment);
    public boolean handleLike(Long comment_id, boolean isLike);
//    public boolean addprofessor(Prof_req prof_req);
    public boolean reportComment(Report report);
    public ArrayList<String> getOfferedSemester(Course course);
}
