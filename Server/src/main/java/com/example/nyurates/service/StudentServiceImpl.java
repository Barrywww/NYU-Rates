package com.example.nyurates.service;

import com.example.nyurates.dao.PublicDao;
import com.example.nyurates.entity.Comment;
import com.example.nyurates.entity.Prof_req;
import com.example.nyurates.entity.Report;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.CommentsResult;
import com.example.nyurates.entity.results.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class StudentServiceImpl implements StudentService{

    //植入dao层对象
    @Autowired
    private PublicDao dao;

    public Result post_comment(Comment comment){
        Result result = new Result();
        result.setCode(400);
        try {
            boolean isSuccess = dao.postComment(comment);
            if (isSuccess){
                result.setMsg("Successfully registered!");
                result.setCode(200);
            }else{
                result.setMsg("Unable to post comment");
            }
        } catch (Exception e) {
            result.setMsg("Unable to post comment");
        }
        return result;
    }

    public Result handle_like(Long comment_id, boolean isLike){
        Result result = new Result();
        result.setCode(400);

        try {
            boolean isSuccess = dao.handleLike(comment_id, isLike);
            if (isSuccess){
                result.setMsg("Successful!");
                result.setCode(200);
            }else{
                result.setMsg("Unable to like/dislike");
            }
        } catch (Exception e) {
            result.setMsg(e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    public Result addprofessor(Prof_req prof_req){
        Result result = new Result();
        result.setCode(400);

        try {
            boolean isSuccess = dao.addprofessor(prof_req);
            if (isSuccess){
                result.setMsg("Successful!");
                result.setCode(200);
            }else{
                result.setMsg("Unable to add professor");
            }
        } catch (Exception e) {
            result.setMsg(e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    public Result report_comment(Report report){
        Result result = new Result();
        result.setCode(400);
        try {
            boolean isSuccess = dao.reportComment(report);
            if (isSuccess){
                result.setMsg("Successful!");
                result.setCode(200);
            }else{
                result.setMsg("Unable to report comment");
            }
        } catch (Exception e) {
            result.setMsg(e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    public CommentsResult view_history(Student student){
        CommentsResult commentsResult = new CommentsResult();
        commentsResult.setCode(400);

        try{
            ArrayList<Comment> comments = dao.searchComments(student);
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
