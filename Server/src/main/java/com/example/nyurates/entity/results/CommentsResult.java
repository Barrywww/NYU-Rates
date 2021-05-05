package com.example.nyurates.entity.results;

import com.example.nyurates.entity.Comment;

import java.util.ArrayList;

public class CommentsResult extends Result{
    private ArrayList<Comment> comments;

    public CommentsResult(){
        super();
    }

    public ArrayList<Comment> getComments(){
        return this.comments;
    }

    public void setComments(ArrayList<Comment> comments){
        this.comments = comments;
    }
}
