package com.example.nyurates.entity;

public class Prof_req {
    private Long req_id;
    private String professor_name;
    private String professor_email;
    private String professor_dept;

    public Prof_req(Long req_id, String professor_name, String professor_email, String professor_dept){
        this.req_id = req_id;
        this.professor_name = professor_name;
        this.professor_email = professor_email;
        this.professor_dept = professor_dept;
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

    public String getProfessor_name(){
        return this.professor_name;
    }

    public void setProfessor_name(String professor_name){
        this.professor_name = professor_name;
    }

    public String getProfessor_email(){
        return this.professor_email;
    }

    public void setProfessor_email(String professor_email){
        this.professor_email = professor_email;
    }

    public String getProfessor_dept(){
        return this.professor_dept;
    }

    public void setProfessor_dept(String prof_dept){
        this.professor_dept = prof_dept;
    }
}
