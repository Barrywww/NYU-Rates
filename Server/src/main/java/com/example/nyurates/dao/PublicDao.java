package com.example.nyurates.dao;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.Comment;

import java.util.ArrayList;

public interface PublicDao {
    public Student studentLogin(Student student);
    public boolean studentRegist(Student student);
    public Student searchByEmail(Student student);
    public Course searchCourse(Course course);
    public ArrayList<Comment> searchCourseComments(Course course);
    public double searchAverageRating(Course course);
    public Professor searchProfessor(Professor professor);
    public double searchAverageRating(Professor professor);

}
