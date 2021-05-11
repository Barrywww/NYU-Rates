package com.example.nyurates.entity.results;

import java.util.ArrayList;

import com.example.nyurates.entity.Professor;

public class ProfListResult extends Result{

    private ArrayList<Professor> prof_list;

    public ProfListResult (){
        super();
    }

    public void setProfList(ArrayList<Professor> prof_list){
        this.prof_list = prof_list;
    }

    public ArrayList<Professor> getProfList(){
        return this.prof_list;
    }


    
}
