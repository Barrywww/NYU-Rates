package com.example.nyurates.entity;

public class Department {
    private String dept_name;
    private String location;

    public Department(String dept_name, String location){
        this.dept_name = dept_name;
        this.location = location;
    }

    public Department(){
        super();
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
}
