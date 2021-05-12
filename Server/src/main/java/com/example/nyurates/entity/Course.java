package com.example.nyurates.entity;

public class Course {
    private String course_name;
    private String course_code;
    private String dept_name;
    private String location;
    private String semester;
    private String professor_id;
    private String hot_comment;
    private double rate;

    public Course(String course_name, String course_code, String dept_name, String location, String semester, String professor_id, String hot_comment, double rate){
        this.course_name = course_name;
        this.course_code = course_code;
        this.dept_name = dept_name;
        this.location = location;
        this.semester = semester;
        this.professor_id = professor_id;
        this.hot_comment = hot_comment;
        this.rate = rate;
    }

    public Course(){
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

    public String getDept_name(){
        return this.dept_name;
    }

    public void setDept_name(String dept_name){
        this.dept_name = dept_name;
    }

    public String getLocation(){
        return this.location;
    }

    public void setLocation(String location){
        this.location = location;
    }

    public String getSemester(){
        return this.semester;
    }

    public void setSemester(String semester){
        this.semester = semester;
    }

    public String getProfessor_id(){
        return this.professor_id;
    }

    public void setProfessor_id(String professor_id){
        this.professor_id = professor_id;
    }

    public String getHot_comment(){
        return this.hot_comment;
    }

    public void setHot_comment(String comment){
        this.hot_comment = comment;
    }

    public double getRate(){
        return this.rate;
    }

    public void setRate(double rate){
        this.rate = rate;
    }
}
