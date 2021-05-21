package com.example.nyurates.service;

import com.example.nyurates.dao.PublicDao;
import com.example.nyurates.entity.Comment;
import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.results.CommentsResult;
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

    public CommentsResult get_prof_stats(Professor professor){
        CommentsResult commentsResult = new CommentsResult();
        commentsResult.setCode(400);
    /**
     * Search Professor Course Stats
     * @param course
     * @return CourseStatsResult
     */
        try{
            ArrayList<Comment> comments = dao.searchComments(professor);
            if(comments.size() > 0){
                commentsResult.setMsg("Successfully get comments");
                commentsResult.setCode(200);
                commentsResult.setComments(comments);
            }else{
                commentsResult.setMsg("Unable to query comments");
            }
        } catch (Exception e) {
            commentsResult.setMsg(e.getMessage());
            e.printStackTrace();
        }
        return commentsResult;
    }
}
