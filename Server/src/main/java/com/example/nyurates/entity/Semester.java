package com.example.nyurates.entity;

public class Semester {
    private String semester;

    public Semester(String semester){
        this.semester = semester;
    }

    public Semester(){
        super();
    }

    public String getSemester(){
        return this.semester;
    }

    public void setSemester(String semester){
        this.semester = semester;
    }
}
