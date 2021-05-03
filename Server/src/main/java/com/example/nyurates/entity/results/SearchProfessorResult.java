package com.example.nyurates.entity.results;

public class SearchProfessorResult extends Result{
    private String professor_name;
    private String professor_id;
    private double rating;
    private int visible;

    public SearchProfessorResult(){
        super();
    }

    public String getProfessor_name(){
        return this.professor_name;
    }

    public void setProfessor_name(String professor_name){
        this.professor_name = professor_name;
    }

    public String getProfessor_id(){
        return this.professor_id;
    }

    public void setProfessor_id(String professor_id){
        this.professor_id = professor_id;
    }

    public double getRating(){
        return this.rating;
    }

    public void setRating(double rating){
        this.rating = rating;
    }

    public int getVisible(){
        return this.visible;
    }

    public void setVisible(int visible){
        this.visible = visible;
    }
}
