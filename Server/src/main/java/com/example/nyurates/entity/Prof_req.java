package com.example.nyurates.entity;

public class Prof_req {
    private Long req_id;
    private String prof_name;
    private String prof_email;
    private String prof_dept;

    public Prof_req(Long req_id, String prof_name, String prof_email, String prof_dept){
        this.req_id = req_id;
        this.prof_name = prof_name;
        this.prof_email = prof_email;
        this.prof_dept = prof_dept;
    }

    public Prof_req(){
        super();
    }

    public Long getReq_id(){
        return this.req_id;
    }

    public void setReq_id(Long req_id){
        this.req_id = req_id;
    }

    public String getProf_name(){
        return this.prof_name;
    }

    public void setProf_name(String prof_name){
        this.prof_name = prof_name;
    }

    public String getProf_email(){
        return this.prof_email;
    }

    public void setProf_email(String prof_email){
        this.prof_email = prof_email;
    }

    public String getProf_dept(){
        return this.prof_dept;
    }

    public void setProf_dept(String prof_dept){
        this.prof_dept = prof_dept;
    }
}
