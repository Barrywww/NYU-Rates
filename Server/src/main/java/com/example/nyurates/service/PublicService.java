package com.example.nyurates.service;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.*;

public interface PublicService {
    public LoginResult regist(Student student);
    public LoginResult login(Student student);
    public ViewCourseResult view_course(Course course);
    public CommentsResult load_comments(Course course);
    public SearchCourseResult search_course(Course course);
    public SearchProfessorResult search_professor(Professor professor);
}
