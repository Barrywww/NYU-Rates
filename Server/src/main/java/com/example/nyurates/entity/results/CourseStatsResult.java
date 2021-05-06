package com.example.nyurates.entity.results;

import com.example.nyurates.entity.Comment;

import java.util.ArrayList;

public class CourseStatsResult extends Result{
    private double rating;
    private int comments_num;
    private ArrayList<Comment> comments;

    public CourseStatsResult(){
        super();
    }

    public double getRating(){
        return this.rating;
    }

    public void setRating(double rating){
        this.rating = rating;
    }

    public int getComments_num(){
        return this.comments_num;
    }

    public void setComments_num(int comments_num){
        this.comments_num = comments_num;
    }

    public ArrayList<Comment> getComments(){
        return this.comments;
    }

    public void setComments(ArrayList<Comment> comments){
        this.comments = comments;
    }
}
