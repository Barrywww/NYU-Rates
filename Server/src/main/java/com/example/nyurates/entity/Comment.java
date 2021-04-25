package com.example.nyurates.entity;

import java.util.Date;

public class Comment {
    private Long comment_id;
    private String content;
    private Date date;
    private Long likes;
    private Long dislikes;
    private double rate;
    private String course_code;
    private String semester;
    private String professor_id;
    private String student_id;

    public Comment(Long comment_id, String content, Date date, Long likes, Long dislikes, double rate, String course_code, String semester, String professor_id, String student_id){
        this.comment_id = comment_id;
        this.content = content;
        this.date = date;
        this.likes = likes;
        this.dislikes = dislikes;
        this.rate = rate;
        this.course_code = course_code;
        this.semester = semester;
        this.professor_id = professor_id;
        this.student_id = student_id;
    }

    public Comment(){
        super();
    }

    public Long getComment_id(){
        return this.comment_id;
    }

    public void setComment_id(Long comment_id){
        this.comment_id = comment_id;
    }

    public String getContent(){
        return this.content;
    }

    public void setContent(String content){
        this.content = content;
    }

    public Date getDate(){
        return this.date;
    }

    public void setDate(Date date){
        this.date = date;
    }

    public Long getLikes(){
        return this.likes;
    }

    public void setLikes(Long likes){
        this.likes = likes;
    }

    public Long getDislikes(){
        return this.dislikes;
    }

    public void setDislikes(Long dislikes){
        this.dislikes = dislikes;
    }

    public double getRate(){
        return this.rate;
    }

    public void setRate(double rate){
        this.rate = rate;
    }

    public String getCourse_code(){
        return this.course_code;
    }

    public void setCourse_code(String course_code){
        this.course_code = course_code;
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

    public String getStudent_id(){
        return this.student_id;
    }

    public void setStudent_id(String student_id){
        this.student_id = student_id;
    }
}
