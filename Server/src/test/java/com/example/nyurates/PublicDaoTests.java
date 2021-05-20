package com.example.nyurates;

import com.example.nyurates.dao.PublicDao;
import com.example.nyurates.entity.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PublicDaoTests {

    @Autowired
    private PublicDao dao;

    @Test
    public void testStudentLogin() throws Exception{
        Student student1 = new Student();
        student1.setEmail("zy1190@nyu.edu");
        student1.setPassword("root");

        Student result = dao.studentLogin(student1);


        assertEquals("Zhao Yang", result.getName());
        assertEquals("zy1190", result.getNetid());
    }

    @Test
    public void testProfessorLogin() throws Exception{
        Professor p1 = new Professor();
        p1.setEmail("pam32@nyu.edu");
        p1.setPassword("root");

        Professor r = dao.professorLogin(p1);

        assertEquals("Paul-Andre Mellies", r.getName());
        assertEquals("pam32", r.getNetid());
    }

    @Test
    public void testStudnetRegist() throws Exception{
        Student s1 = new Student();
        s1.setEmail("zy1190@nyu.edu");
        s1.setPassword("root");
        s1.setNetid("zy1190");
        s1.setName("Zhao Yang");

        boolean r = dao.studentRegist(s1);
        assertTrue(r);
    }

    @Test
    public void testSearchByEmail() throws Exception{
        Student s1 = new Student();
        s1.setEmail("student0@nyu.edu");
        s1.setPassword("root");

        Student r = dao.searchByEmail(s1);

        assertEquals("student0", r.getNetid());
        assertEquals("Student0", r.getName());
    }

    @Test
    public void testMatchCourse() throws Exception{
        Course c1 = new Course();
        Course c2 = new Course();

        c1.setCourse_code("CENG-SHU 201");
        c2.setCourse_name("Computer Architecture");

        Course r1 = dao.matchCourse(c1);
        Course r2 = dao.matchCourse(c2);

        assertEquals("Computer Architecture", r1.getCourse_name());
        assertEquals("CENG-SHU 201", r2.getCourse_code());
    }

    @Test
    public void testSearchCourse() throws Exception{
        Course c1 = new Course();
        Course c2 = new Course();
        Course c3 = new Course();
        Course c4 = new Course();

        c1.setCourse_code("CENG-SHU 201");
        c2.setCourse_name("Computer Architecture");
        c1.setCourse_code("CENG-SHU");
        c2.setCourse_name("Computer");

        ArrayList<Course> r1 = dao.searchCourse(c1);
        ArrayList<Course> r2 = dao.searchCourse(c2);
        ArrayList<Course> r3 = dao.searchCourse(c3);
        ArrayList<Course> r4 = dao.searchCourse(c4);

        assertEquals("Computer Architecture", r1.get(0).getCourse_name());
        assertEquals("CENG-SHU 201", r2.get(0).getCourse_code());
        assertEquals("CENG-SHU 201", r2.get(0).getCourse_code());
        assertEquals("CENG-SHU 201", r2.get(0).getCourse_code());
    }

    @Test
    public void testSearchComments() throws Exception{
        Student s1 = new Student();
        s1.setNetid("student0");

        Professor p1 = new Professor();
        p1.setNetid("pam32");

        Course c1 = new Course();
        c1.setCourse_code("CENG-SHU 201");

        ArrayList<Comment> comments1 = dao.searchComments(s1);
        ArrayList<Comment> comments2 = dao.searchComments(p1);
        ArrayList<Comment> comments3 = dao.searchComments(c1);

        assertEquals(Long.valueOf(1), comments1.get(0).getComment_id());
        assertEquals(Long.valueOf(4), comments1.get(1).getComment_id());
        assertEquals(Long.valueOf(1), comments2.get(0).getComment_id());
        assertEquals(Long.valueOf(2), comments2.get(1).getComment_id());
        assertEquals(Long.valueOf(3), comments2.get(2).getComment_id());
        assertEquals(Long.valueOf(4), comments2.get(3).getComment_id());
        assertEquals(Long.valueOf(1), comments3.get(0).getComment_id());
        assertEquals(Long.valueOf(2), comments3.get(1).getComment_id());
        assertEquals(Long.valueOf(3), comments3.get(2).getComment_id());
        assertEquals(Long.valueOf(4), comments3.get(3).getComment_id());


    }

    @Test
    public void testSearchAverageRating() throws Exception{
        Professor p1 = new Professor();
        p1.setNetid("pam32");

        Course c1 = new Course();
        c1.setCourse_code("CENG-SHU 201");

        double rate = 4.825;
        double r1 = dao.searchAverageRating(p1);
        double r2 = dao.searchAverageRating(c1);

        assertEquals(rate, r1, 0.01);
        assertEquals(rate, r2, 0.01);
    }

    @Test
    public void testMatchProfessor() throws Exception{
        Professor p1 = new Professor();
        Professor p2 = new Professor();

        p1.setName("Paul-Andre Mellies");
        p2.setNetid("pam32");

        Professor r1 = dao.matchProfessor(p1);
        Professor r2 = dao.matchProfessor(p2);

        assertEquals("pam32", r1.getNetid());
        assertEquals("Paul-Andre Mellies", r2.getName());
    }

    @Test
    public void testSearchProfessor() throws Exception{
        Professor p1 = new Professor();
        Professor p2 = new Professor();
        Professor p3 = new Professor();
        Professor p4 = new Professor();

        p1.setName("Paul-Andre Mellies");
        p2.setNetid("pam32");
        p3.setName("Mellies");
        p4.setNetid("pam");

        ArrayList<Professor> professors1 = dao.searchProfessor(p1);
        ArrayList<Professor> professors2 = dao.searchProfessor(p2);
        ArrayList<Professor> professors3 = dao.searchProfessor(p3);
        ArrayList<Professor> professors4 = dao.searchProfessor(p4);

        assertEquals("pam32", professors1.get(0).getNetid());
        assertEquals("Paul-Andre Mellies", professors2.get(0).getName());
        assertEquals("Paul-Andre Mellies", professors3.get(0).getName());
        assertEquals("Paul-Andre Mellies", professors4.get(0).getName());
    }

    @Test
    public void testSearchProfessorCourse() throws Exception{
        Professor p1 = new Professor();
        p1.setNetid("pam32");

        ArrayList<Course> courses = new ArrayList<Course>();

        Course c1 = new Course();
        c1.setCourse_name("Computer Architecture");
        c1.setCourse_code("CENG-SHU 201");
        c1.setSemester("Fall 2020");
        c1.setLocation("ONLI");
        c1.setDept_name("Computer Science");
        c1.setProfessor_id("pam32");
        courses.add(c1);

        Course c2 = new Course();
        c2.setCourse_name("Computer Architecture");
        c2.setCourse_code("CENG-SHU 201");
        c2.setSemester("Spring 2021");
        c2.setLocation("PDNG");
        c2.setDept_name("Computer Science");
        c2.setProfessor_id("pam32");
        courses.add(c2);

        ArrayList<Course> courselist = dao.searchProfessorCourse(p1);
        for(int i = 0; i < courses.size(); i ++){
            assertEquals(courses.get(i).getCourse_name(), courselist.get(i).getCourse_name());
            assertEquals(courses.get(i).getDept_name(), courselist.get(i).getDept_name());
        }

    }

    @Test
    public void testPostComment() throws Exception{
        Comment c1 = new Comment();
        c1.setContent("Interesting course.");
        c1.setDate(LocalDateTime.now());
        double rate1 = 5.0;
        c1.setRate(rate1);
        c1.setCourse_code("INTM-SHU 101");
        c1.setSemester("Fall 2019");
        c1.setProfessor_id("iil2");
        c1.setStudent_id("student1");

        assertTrue(dao.postComment(c1));

        Comment c2 = new Comment();
        c2.setContent("Interesting course.");
        c2.setDate(LocalDateTime.now());
        double rate2 = 5.0;
        c2.setRate(rate2);
        c2.setCourse_code("INTM-SHU 101");
        c2.setSemester("Fall 2019");
        c2.setProfessor_id("iil2");

        assertFalse(dao.postComment(c2));


    }

    @Test
    public void testHandleLike() throws Exception{
        assertTrue(dao.handleLike(Long.valueOf(1), true));
        assertTrue(dao.handleLike(Long.valueOf(1), false));
        assertFalse(dao.handleLike(Long.valueOf(10), true));
    }

    @Test
    public void testReportComment() throws Exception{
        Report report = new Report();
        report.setComment_id(Long.valueOf(1));
        report.setComment_user("student0");
        report.setReport_date(LocalDateTime.now());
        report.setReport_reason("This comment is invalid");
        report.setStatus("Processing");

        assertTrue(dao.reportComment(report));
    }

}
