package com.example.nyurates.entity.results;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Comment;

import java.util.ArrayList;

public class ViewProfessorResult extends Result{
    private String professor_name;
    private String department;
    private double rating;
    private int total_comments;
    ArrayList<Comment> comments;
    ArrayList<Course> courses;

    public ViewProfessorResult(){
        super();
    }

    public String getProfessor_name(){
        return this.professor_name;
    }

    public void setProfessor_name(String professor_name){
        this.professor_name = professor_name;
    }

    public String getDepartment(){
        return this.department;
    }

    public void setDepartment(String department){
        this.department = department;
    }

    public double getRating(){
        return this.rating;
    }

    public void setRating(double rating){
        this.rating = rating;
    }

    public int getTotal_comments(){
        return this.total_comments;
    }

    public void setTotal_comments(int total_comments){
        this.total_comments = total_comments;
    }

    public ArrayList<Comment> getComments(){
        return this.comments;
    }

    public void setComments(ArrayList<Comment> comments){
        this.comments = comments;
    }

    public ArrayList<Course> getCourses(){
        return this.courses;
    }

    public void setCourses(ArrayList<Course> courses){
        this.courses = courses;
    }
}
