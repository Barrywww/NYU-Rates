package com.example.nyurates.entity.results;

import com.example.nyurates.entity.Course;

import java.util.ArrayList;

public class CourseListResult extends Result{
    private ArrayList<Course> course_list;

    public CourseListResult (){
        super();
    }

    public void setCourse_list(ArrayList<Course> course_list){
        this.course_list = course_list;
    }

    public ArrayList<Course> getCourseList(){
        return this.course_list;
    }

}
