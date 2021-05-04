package com.example.nyurates.entity.results;

public class SearchCourseResult extends Result{
    private String course_name;
    private String course_code;
    private double rating;

    public SearchCourseResult(){
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

    public double getRating(){
        return this.rating;
    }

    public void setRating(double rating){
        this.rating = rating;
    }
}
