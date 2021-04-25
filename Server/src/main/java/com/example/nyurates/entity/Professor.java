package com.example.nyurates.entity;

public class Professor {
    private String email;
    private String netid;
    private String name;
    private String password;
    private String dept;
    private boolean visible;

    public Professor(String email, String netid, String name, String password, String dept, boolean visible){
        this.email = email;
        this.netid = netid;
        this.name = name;
        this.password = password;
        this.dept = dept;
        this.visible = visible;
    }

    public Professor(){
        super();
    }

    public String getEmail(){
        return this.email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getNetid(){
        return this.netid;
    }

    public void setNetid(String netid){
        this.netid = netid;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getPassword(){
        return this.password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getDept(){
        return this.dept;
    }

    public void setDept(String dept){
        this.dept = dept;
    }

    public boolean getVisible(){
        return this.visible;
    }

    public void setVisible(boolean visible){
        this.visible = visible;
    }
}
