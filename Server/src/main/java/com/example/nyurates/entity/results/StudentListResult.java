package com.example.nyurates.entity.results;

import java.util.ArrayList;

import com.example.nyurates.entity.Student;

public class StudentListResult extends Result{

    private ArrayList<Student> student_list;

    public StudentListResult(){
        super();
    }

    public ArrayList<Student> getStudent_list(){
        return this.student_list;
    }

    public void setStudent_list(ArrayList<Student> student_list){
        this.student_list = student_list;        
    }
    
}
