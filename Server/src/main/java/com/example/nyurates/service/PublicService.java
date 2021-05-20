package com.example.nyurates.service;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.*;

public interface PublicService {
    public Result regist_student(Student student);
    public Result regist_prof(Professor professor);
    public LoginResult loginStudent(Student student);
    public LoginResult loginProfessor(Professor professor);
    public ViewCourseResult view_course(Course course);
    public ViewProfessorResult view_professor(Professor professor);
    public CommentsResult load_comments(Course course);
    public CourseListResult search_course(Course course);
    // public SearchProfessorResult search_professor(Professor professor);
    public ProfListResult search_professor(Professor professor);
}
