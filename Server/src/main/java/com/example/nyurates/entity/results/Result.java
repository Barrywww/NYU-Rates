package com.example.nyurates.entity.results;

public class Result {
    /**
     * 数据是否正常请求
     */
    private int code;

    /**
     * return message
     */
    private String msg;

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
