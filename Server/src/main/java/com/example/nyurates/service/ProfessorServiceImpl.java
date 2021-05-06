package com.example.nyurates.service;

import com.example.nyurates.dao.PublicDao;
import com.example.nyurates.entity.Comment;
import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.results.CourseStatsResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class ProfessorServiceImpl implements ProfessorService{

    //植入dao层对象
    @Autowired
    private PublicDao dao;

    public CourseStatsResult get_course_stats(Course course){
        CourseStatsResult courseStatsResult = new CourseStatsResult();
        courseStatsResult.setCode(400);

        try{
            course = dao.searchCourse(course);
            if(course == null){
                courseStatsResult.setMsg("Unable to query the provided course code.");
                courseStatsResult.setCode(400);
            }else{
                courseStatsResult.setMsg("Successfully get course!");
                courseStatsResult.setCode(200);
                ArrayList<Comment> comments = dao.searchComments(course);
                courseStatsResult.setComments(comments);
                double rating = dao.searchAverageRating(course);
                courseStatsResult.setRating(rating);
                courseStatsResult.setComments_num(comments.size());
            }
        } catch (Exception e) {
            courseStatsResult.setMsg(e.getMessage());
            e.printStackTrace();
        }

        return courseStatsResult;
    }
}
