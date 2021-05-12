package com.example.nyurates.service;

import com.example.nyurates.entity.Comment;
import com.example.nyurates.entity.Prof_req;
import com.example.nyurates.entity.Report;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.CommentsResult;
import com.example.nyurates.entity.results.Result;

public interface StudentService {
    public Result post_comment(Comment comment);
    public Result handle_like(Long comment_id, boolean isLike);
    public Result addprofessor(Prof_req prof_req);
    public Result report_comment(Report report);
    public CommentsResult view_history(Student student);
}
