package com.example.nyurates.entity.results;

import com.example.nyurates.entity.Comment;

import java.util.ArrayList;

public class ViewCourseResult extends Result{
    private String course_name;
    private String course_code;
    private ArrayList<Comment> comments;
    private double rating;
    private int comments_num;

    public ViewCourseResult(){
        super();
    }

    public String getCourse_name(){
        return this.course_name;
    }

    public void setCourse_name(String course_name){
        this.course_name = course_name;
    }

    public String getCourse_code(){
        return this.course_code;
    }

    public void setCourse_code(String course_code){
        this.course_code = course_code;
    }

    public ArrayList<Comment> getComments(){
        return this.comments;
    }

    public void setComments(ArrayList<Comment> comments){
        this.comments = comments;
    }

    public double getRating(){
        return this.rating;
    }

    public void setRating(double rating){
        this.rating = rating;
    }

    public int getComments_num(){
        return this.comments_num;
    }

    public void setComments_num(int comments_num){
        this.comments_num = comments_num;
    }


}
