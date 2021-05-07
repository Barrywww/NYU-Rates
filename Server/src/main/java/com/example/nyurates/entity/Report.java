package com.example.nyurates.entity;

import java.time.LocalDateTime;

public class Report {
    private Long report_id;
    private Long comment_id;
    private String comment_user;
    private LocalDateTime report_date;
    private String report_reason;
    private String status;

    public Report(Long report_id, Long comment_id, String comment_user, LocalDateTime report_date, String report_reason, String status){
        this.report_id = report_id;
        this.comment_id = comment_id;
        this.comment_user = comment_user;
        this.report_date = report_date;
        this.report_reason = report_reason;
        this.status = status;
    }

    public Report(){
        super();
    }

    public Long getReport_id(){
        return this.report_id;
    }

    public void setReport_id(Long report_id){
        this.report_id = report_id;
    }

    public Long getComment_id(){
        return this.comment_id;
    }

    public void setComment_id(Long comment_id){
        this.comment_id = comment_id;
    }

    public String getComment_user(){
        return this.comment_user;
    }

    public void setComment_user(String comment_user){
        this.comment_user = comment_user;
    }

    public LocalDateTime getReport_date(){
        return this.report_date;
    }

    public void setReport_date(LocalDateTime report_date){
        this.report_date = report_date;
    }

    public String getReport_reason(){
        return this.report_reason;
    }

    public void setReport_reason(String report_reason){
        this.report_reason = report_reason;
    }

    public String getStatus(){
        return this.status;
    }

    public void setStatus(String status){
        this.status = status;
    }
}
