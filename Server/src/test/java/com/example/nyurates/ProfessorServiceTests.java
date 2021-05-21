package com.example.nyurates;

import com.example.nyurates.entity.Course;
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

    /**
     * Test get_course_stats function
     */
    @Test
    public void testGet_course_stats() throws Exception{
        Course c1 = new Course();
        Course c2 = new Course();

        c1.setCourse_code("CENG-SHU 201");
        c2.setCourse_code("Cadsddfa");

        CourseStatsResult r1 = professorService.get_course_stats(c1);
        CourseStatsResult r2 = professorService.get_course_stats(c2);

        assertEquals(200, r1.getCode());
        assertEquals("Successfully get course!", r1.getMsg());

        assertEquals(400, r2.getCode());
        assertEquals("Unable to query the provided course code.", r2.getMsg());
    }
}
