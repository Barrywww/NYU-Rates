package com.example.nyurates.entity;

public class Student {

    private String email;
    private String netid;
    private String name;
    private String password;

    public Student(String email, String netid, String name, String password) {
        this.email = email;
        this.netid = netid;
        this.name = name;
        this.password = password;
    }

    public Student() {
        super();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNetId() {
        return netid;
    }

    public void setNetId(String netid) {
        this.netid = netid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }
}
