package com.example.nyurates;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.results.CommentsResult;
import com.example.nyurates.entity.results.CourseStatsResult;
import com.example.nyurates.service.ProfessorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ProfessorServiceTests {
    @Autowired
    ProfessorService professorService;

    @Test
    public void testGet_course_stats() throws Exception{
        Professor p1 = new Professor();
        p1.setNetid("pam32");
        p1.setEmail("pam32@nyu.edu");


        CommentsResult r1 = professorService.get_prof_stats(p1);

        assertEquals(200, r1.getCode());
        assertEquals("Successfully get comments", r1.getMsg());
    }
}
