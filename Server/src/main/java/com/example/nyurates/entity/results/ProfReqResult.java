package com.example.nyurates.entity.results;

import java.util.ArrayList;

import com.example.nyurates.entity.Prof_req;

public class ProfReqResult extends Result{

    private ArrayList<Prof_req> profRequests;

    public ProfReqResult(){
        super();
    }

    public void setProfRequests(ArrayList<Prof_req> requests){
        this.profRequests = requests;
    }

    public ArrayList<Prof_req> getProfRequests(){
        return this.profRequests;
    }
}
