package com.example.nyurates.controller;

import com.example.nyurates.entity.Comment;
import com.example.nyurates.entity.results.Result;
import com.example.nyurates.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {
    //植入对象
    @Autowired
    private StudentService studentService;

    /**
     * Post Comments
     * @param comment
     * @return Result
     */
    @PostMapping(value = "/post_comment")
    public Result post_comment(@RequestBody Comment comment){
        return studentService.post_comment(comment);
    }

    /**
     * Hit Likes/Dislikes
     * @param params
     * @return Result
     */
    @PostMapping(value = "/handle_like")
    public Result handle_like(@RequestBody Map params){
        int comid = (Integer) params.get("comment_id");
        Long comment_id = new Long(comid);
        return studentService.handle_like(comment_id, (Boolean) params.get("isLike"));
    }


}
