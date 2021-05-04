package com.example.nyurates.dao;

import com.example.nyurates.entity.*;

import java.util.ArrayList;

public interface PublicDao {
    public Student studentLogin(Student student);
    public boolean studentRegist(Student student);
    public Student searchByEmail(Student student);
    public Course searchCourse(Course course);
    public ArrayList<Comment> searchComments(Course course);
    public ArrayList<Comment> searchComments(Professor professor);
    public double searchAverageRating(Course course);
    public double searchAverageRating(Professor professor);
    public Professor searchProfessor(Professor professor);
    public ArrayList<Course> searchProfessorCourse(Professor professor);
    public boolean postComment(Comment comment);
    public boolean handleLike(Long comment_id, boolean isLike);
//    public boolean addprofessor(Prof_req prof_req);
}
