package com.example.nyurates.entity;

import java.util.Date;

public class Email {
    private Long email_id;
    private String receiver_email;
    private String content;
    private Date date;
    private int status;

    public Email(Long email_id, String receiver_email, String content, Date date, int status){
        this.email_id = email_id;
        this.receiver_email = receiver_email;
        this.content = content;
        this.date = date;
        this.status = status;
    }

    public Email(){
        super();
    }

    public Long getEmail_id(){
        return this.email_id;
    }

    public void setEmail_id(Long email_id){
        this.email_id = email_id;
    }

    public String getReceiver_email(){
        return this.receiver_email;
    }

    public void setReceiver_email(String receiver_email){
        this.receiver_email = receiver_email;
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

    public int getStatus(){
        return this.status;
    }

    public void setStatus(int status){
        this.status = status;
    }
}
