package com.example.nyurates.entity.results;

public class LoginResult extends Result{
    /**
     * return message
     */
    private String msg;

    /**
     * 数据是否正常请求
     */
    private int code;
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
