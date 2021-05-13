package com.example.nyurates.entity;

public class Professor {
    private String email;
    private String netid;
    private String name;
    private String password;
    private String dept;
    private int visible;
    private int is_member;
    private String hot_comment;
    private double rate;

    public Professor(String email, String netid, String name, String password, String dept, int visible, int is_member, String hot_comment, double rate){
        this.email = email;
        this.netid = netid;
        this.name = name;
        this.password = password;
        this.dept = dept;
        this.visible = visible;
        this.is_member = is_member;
        this.hot_comment = hot_comment;
        this.rate = rate;
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

    public int getVisible(){
        return this.visible;
    }

    public void setVisible(int visible){
        this.visible = visible;
    }

    public int getIs_member(){
        return this.is_member;
    }

    public void setIs_member(int is_member){
        this.is_member = is_member;
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
