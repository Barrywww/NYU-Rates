package com.example.nyurates.entity;

public class Location {
    private String location;

    public Location(String location){
        this.location = location;
    }

    public Location(){
        super();
    }

    public String getLocation(){
        return this.location;
    }

    public void setLocation(String location){
        this.location = location;
    }
}
