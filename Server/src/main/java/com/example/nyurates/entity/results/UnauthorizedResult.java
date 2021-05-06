package com.example.nyurates.entity.results;

public class UnauthorizedResult extends Result{
    public UnauthorizedResult(){
        super();
        this.setCode(401);
        this.setMsg("Unauthorized request, please login again.");
    }
}
