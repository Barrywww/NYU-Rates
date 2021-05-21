package com.example.nyurates.service;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.results.CommentsResult;
import com.example.nyurates.entity.results.CourseStatsResult;

public interface ProfessorService {
    public CommentsResult get_prof_stats(Professor prof);
}
