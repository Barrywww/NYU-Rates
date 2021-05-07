package com.example.nyurates.service;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.results.CourseStatsResult;

public interface ProfessorService {
    public CourseStatsResult get_course_stats(Course course);
}
