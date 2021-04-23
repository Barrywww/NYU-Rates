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
}
