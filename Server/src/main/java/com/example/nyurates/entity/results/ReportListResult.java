package com.example.nyurates.entity.results;

import java.util.ArrayList;

import com.example.nyurates.entity.Report;

public class ReportListResult extends Result{
    private ArrayList<Report> reportsArray;

    public ReportListResult(){
        super();
    }

    public void setReportsArray(ArrayList<Report> reports){
        this.reportsArray = reports;
    }

    public ArrayList<Report> getReportsArray(){
        return this.reportsArray;
    }
}
