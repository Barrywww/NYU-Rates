package com.example.nyurates.entity.results;

public class LoginResult {
    /**
     * return message
     */
    private String msg;

    /**
     * 数据是否正常请求
     */
    private int code;

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCode() {
        return this.code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
