package com.example.nyurates.entity;

import java.util.Map;

public class Admin {
    private String email;
    private String netid;
    private String name;
    private String password;
    private Map<String, Object> action;

    public Admin(String email, String netid, String name, String password, Map<String, Object> action) {
        this.email = email;
        this.netid = netid;
        this.name = name;
        this.password = password;
        this.action = action;
    }

    public Admin() {
        super();
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNetid() {
        return this.netid;
    }

    public void setNetid(String netid) {
        this.netid = netid;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public void setAction (Map<String, Object> action){
        this.action = action;
    }

    public Map<String,Object> getAction(){
        return this.action;
    }
}
