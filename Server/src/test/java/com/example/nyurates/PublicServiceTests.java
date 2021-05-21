package com.example.nyurates;

import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.Student;
import com.example.nyurates.entity.results.*;
import com.example.nyurates.service.AdminService;
import com.example.nyurates.service.PublicService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class PublicServiceTests {
    @Autowired
    PublicService publicService;

    @Autowired
    AdminService adminService;

    /**
     * Test regist function
     */
    @Test
    public void testRegist() throws Exception{
        Student s1 = new Student();
        Student s2 = new Student();

        s1.setEmail("zy1190@nyu.edu");
        s1.setPassword("root");
        s1.setNetid("zy1190");
        s1.setName("Zhao Yang");

        s2.setEmail("ql903@nyu.edu");
        s2.setPassword("root");
        s2.setNetid("ql903");
        s2.setName("Qichen Liu");

        Result r1 = publicService.regist_student(s1);
        Result r2 = publicService.regist_student(s2);

        assertEquals(400, r1.getCode());
        assertEquals("The account has existed. Failed to register.", r1.getMsg());

        assertEquals(200, r2.getCode());
        assertEquals("Successfully registered!", r2.getMsg());

        adminService.deleteStudent("ql903@nyu.edu");
    }

    /**
     * Test loginStudent function
     */
    @Test
    public void testLoginStudent() throws Exception{
        Student student1 = new Student();
        student1.setEmail("student0@nyu.edu");
        student1.setPassword("root");

        Student student2 = new Student();
        student2.setEmail("zy1190@nyu.edu");
        student2.setPassword("abc");

        LoginResult r1 = publicService.loginStudent(student1);
        LoginResult r2 = publicService.loginStudent(student2);

        assertEquals(200, r1.getCode());
        assertEquals("Successfully Logged in!", r1.getMsg());

        assertEquals(400, r2.getCode());
        assertEquals("Unable to login with provided credentials.", r2.getMsg());

    }

    /**
     * Test loginProfessor function
     */
    @Test
    public void testLoginProfessor() throws Exception{
        Professor p1 = new Professor();
        p1.setEmail("pam32@nyu.edu");
        p1.setPassword("root");

        Professor p2 = new Professor();
        p2.setEmail("pam32@nyu.edu");
        p2.setPassword("abc");

        LoginResult r1 = publicService.loginProfessor(p1);
        LoginResult r2 = publicService.loginProfessor(p2);

        assertEquals(200, r1.getCode());
        assertEquals("Successfully Logged in!", r1.getMsg());

        assertEquals(400, r2.getCode());
        assertEquals("Unable to login with provided credentials.", r2.getMsg());
    }

    /**
     * Test view_course function
     */
    @Test
    public void testView_course() throws Exception{
        Course c1 = new Course();
        Course c2 = new Course();

        c1.setCourse_code("CENG-SHU 201");
        c2.setCourse_code("Cadsddfa");

        ViewCourseResult r1 = publicService.view_course(c1);
        ViewCourseResult r2 = publicService.view_course(c2);

        assertEquals(200, r1.getCode());
        assertEquals("Successfully get course!", r1.getMsg());

        assertEquals(400, r2.getCode());
        assertEquals("Unable to query the provided course code.", r2.getMsg());
    }

    /**
     * Test view_professor function
     */
    @Test
    public void testView_professor() throws Exception{
        Professor p1 = new Professor();
        Professor p2 = new Professor();

        p1.setName("Paul-Andre Mellies");
        p2.setName("adadsfdaf");

        ViewProfessorResult r1 = publicService.view_professor(p1);
        ViewProfessorResult r2 = publicService.view_professor(p2);

        assertEquals(200, r1.getCode());
        assertEquals("Successfully get professor!", r1.getMsg());

        assertEquals(400, r2.getCode());
        assertEquals("Unable to query the professor.", r2.getMsg());


    }

    /**
     * Test load_comments function
     */
    @Test
    public void testLoad_comments() throws Exception{
        Course c1 = new Course();
        Course c2 = new Course();

        c1.setCourse_code("CENG-SHU 201");
        c2.setCourse_code("Cadsddfa");

        CommentsResult r1 = publicService.load_comments(c1);
        CommentsResult r2 = publicService.load_comments(c2);

        assertEquals(200, r1.getCode());
        assertEquals("Successfully get comments", r1.getMsg());

        assertEquals(400, r2.getCode());
        assertEquals("Unable to query comments", r2.getMsg());
    }

    /**
     * Test search_course function
     */
    @Test
    public void testSearch_course() throws Exception{
        Course c1 = new Course();
        Course c2 = new Course();
        Course c3 = new Course();
        Course c4 = new Course();
        Course c5 = new Course();
        Course c6 = new Course();

        c1.setCourse_code("CENG-SHU 201");
        c2.setCourse_code("CENG-SHU");
        c3.setCourse_name("Computer Architecture");
        c4.setCourse_name("Architecture");
        c5.setCourse_code("adadafda");
        c6.setCourse_name("adadafda");

        CourseListResult r1 = publicService.search_course(c1);
        CourseListResult r2 = publicService.search_course(c2);
        CourseListResult r3 = publicService.search_course(c3);
        CourseListResult r4 = publicService.search_course(c4);
        CourseListResult r5 = publicService.search_course(c5);
        CourseListResult r6 = publicService.search_course(c6);

        assertEquals(1, r1.getCourseList().size());
        assertEquals(1, r2.getCourseList().size());
        assertEquals(1, r3.getCourseList().size());
        assertEquals(1, r4.getCourseList().size());
        assertEquals(0, r5.getCourseList().size());
        assertEquals(0, r6.getCourseList().size());




    }

    /**
     * Test search_professor function
     */
    @Test
    public void testSearch_professor() throws Exception{
        Professor p1 = new Professor();
        Professor p2 = new Professor();
        Professor p3 = new Professor();
        Professor p4 = new Professor();
        Professor p5 = new Professor();
        Professor p6 = new Professor();

        p1.setName("Paul-Andre Mellies");
        p2.setNetid("pam32");
        p3.setName("Mellies");
        p4.setNetid("pam");
        p5.setNetid("adsdaf");
        p6.setName("ahfjda");

        ProfListResult r1 = publicService.search_professor(p1);
        ProfListResult r2 = publicService.search_professor(p2);
        ProfListResult r3 = publicService.search_professor(p3);
        ProfListResult r4 = publicService.search_professor(p4);
        ProfListResult r5 = publicService.search_professor(p5);
        ProfListResult r6 = publicService.search_professor(p6);

        assertEquals(1, r1.getProfList().size());
        assertEquals(1, r2.getProfList().size());
        assertEquals(1, r3.getProfList().size());
        assertEquals(1, r4.getProfList().size());
        assertEquals(0, r5.getProfList().size());
        assertEquals(0, r6.getProfList().size());
    }
}
