package com.example.nyurates.entity.results;

public class Result {
    /**
     * status indicator
     */
    private int code;

    /**
     * return message
     */
    private String msg;

    public Result(int code, String msg){
        this.code = code;
        this.msg = msg;
    }

    public Result(){ super(); }

    public int getCode() {
        return this.code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
