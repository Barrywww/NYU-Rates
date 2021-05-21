package com.example.nyurates;

import com.example.nyurates.entity.Comment;
import com.example.nyurates.entity.Prof_req;
import com.example.nyurates.entity.Report;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.CommentsResult;
import com.example.nyurates.entity.results.Result;
import com.example.nyurates.service.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class StudentServiceTests {
    @Autowired
    private StudentService studentService;

    @Test
    public void testPost_comment() throws Exception{
        Comment c1 = new Comment();
        c1.setContent("Interesting course.");
        c1.setDate(LocalDateTime.now());
        double rate1 = 5.0;
        c1.setRate(rate1);
        c1.setCourse_code("INTM-SHU 101");
        c1.setSemester("Fall 2019");
        c1.setProfessor_id("iil2");
        c1.setStudent_id("student0");

        Result r1 = studentService.post_comment(c1);
        assertEquals(200, r1.getCode());
        assertEquals("Successfully registered!", r1.getMsg());

        Comment c2 = new Comment();
        c2.setContent("Interesting course.");
        c2.setDate(LocalDateTime.now());
        double rate2 = 5.0;
        c2.setRate(rate2);
        c2.setCourse_code("INTM-SHU 101");
        c2.setSemester("Fall 2019");
        c2.setProfessor_id("iil2");

        Result r2 = studentService.post_comment(c2);
        assertEquals(400, r2.getCode());
        assertEquals("Unable to post comment", r2.getMsg());
    }

    @Test
    public void testHandle_like() throws Exception{
        Long com_id1 = 2L;
        Long com_id2 = 1000L;

        Result r1 = studentService.handle_like(com_id1, true);
        Result r2 = studentService.handle_like(com_id1, false);
        Result r3 = studentService.handle_like(com_id2, true);
        Result r4 = studentService.handle_like(com_id2, false);

        assertEquals(200, r1.getCode());
        assertEquals("Successful!", r1.getMsg());

        assertEquals(200, r2.getCode());
        assertEquals("Successful!", r2.getMsg());

        assertEquals(400, r3.getCode());
        assertEquals("Unable to like/dislike", r3.getMsg());

        assertEquals(400, r4.getCode());
        assertEquals("Unable to like/dislike", r4.getMsg());

    }

    @Test
    public void testAddprofessor() throws Exception{
        Prof_req req1 = new Prof_req();
        req1.setProfessor_name("Barry");
        req1.setProfessor_email("yw3752@nyu.edu");
        req1.setProfessor_dept("Computer Science");
        req1.setProfessor_course_name("Computer Networking");
        req1.setProfessor_course_code("CSCI-SHU 304");
        req1.setProfessor_course_semester("Fall 2019");

        Result r1 = studentService.addprofessor(req1);

        assertEquals(200, r1.getCode());
        assertEquals("Successful!", r1.getMsg());

    }

    @Test
    public void testReport_comment() throws Exception{
        Report report1 = new Report();
        Long com_id = 2L;
        report1.setComment_id(com_id);
        report1.setComment_content("Nice professor!");
        report1.setComment_user("student1");
        report1.setCourse_code("CENG-SHU 201");
        report1.setReport_date(LocalDateTime.now());
        report1.setReport_reason("Invalid comment");
        report1.setStatus("Processing");

        Result r1 = studentService.report_comment(report1);

        assertEquals(200, r1.getCode());
        assertEquals("Successful!", r1.getMsg());
    }

    @Test
    public void testView_history() throws Exception{
        Student s1 = new Student();
        s1.setNetid("student0");

        CommentsResult r1 = studentService.view_history(s1);

        assertEquals(200, r1.getCode());
        assertEquals("Successfully get comments", r1.getMsg());

        Student s2 = new Student();
        s2.setNetid("student123");

        CommentsResult r2 = studentService.view_history(s2);

        assertEquals(400, r2.getCode());
        assertEquals("Unable to query comments", r2.getMsg());
    }
}
