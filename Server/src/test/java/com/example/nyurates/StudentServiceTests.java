package com.example.nyurates;

import com.example.nyurates.entity.Comment;
import com.example.nyurates.entity.results.Result;
import com.example.nyurates.service.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

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

    }

    @Test
    public void testReport_comment() throws Exception{

    }

    @Test
    public void testView_history() throws Exception{

    }
}
