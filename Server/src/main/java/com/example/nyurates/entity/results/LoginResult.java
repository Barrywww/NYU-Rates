package com.example.nyurates.entity.results;

public class LoginResult extends Result{
    private String username;

    public LoginResult(){
        super();
    }
    public String getUsername(){
        return this.username;
    }

    public void setUsername(String username){
        this.username = username;
    }
}
