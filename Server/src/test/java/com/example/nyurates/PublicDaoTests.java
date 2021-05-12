package com.example.nyurates;

import com.example.nyurates.dao.PublicDao;
import com.example.nyurates.entity.Course;
import com.example.nyurates.entity.Professor;
import com.example.nyurates.entity.Student;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.*;

@SpringBootTest
class PublicDaoTests {

    @Autowired
    private PublicDao dao;

    @Test
    public void testStudentLogin() throws Exception{
        Student student1 = new Student();
        student1.setEmail("student0@nyu.edu");
        student1.setPassword("root");

        Student result = dao.studentLogin(student1);

        assertEquals("Student0", result.getName());
        assertEquals("student0", result.getNetid());
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
        s1.setEmail("student5@nyu.edu");
        s1.setPassword("root");
        s1.setNetid("student5");
        s1.setName("student5");

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
    public void testSearchCourse() throws Exception{
        Course c1 = new Course();
        Course c2 = new Course();

        c1.setCourse_code("CENG-SHU 201");
        c2.setCourse_name("Computer Architecture");

        Course r1 = dao.searchCourse(c1);
        Course r2 = dao.searchCourse(c2);

        assertEquals("Computer Architecture", r1.getCourse_name());
        assertEquals("CENG-SHU 201", r2.getCourse_code());
    }

    @Test
    public void testSearchComments() throws Exception{

    }

    @Test
    public void testSearchAverageRating() throws Exception{

    }

    @Test
    public void testSearchProfessor() throws Exception{

    }

    @Test
    public void testSearchProfessorCourse() throws Exception{

    }

    @Test
    public void testPostComment() throws Exception{

    }

    @Test
    public void testHandleLike() throws Exception{

    }

    @Test
    public void testReportComment() throws Exception{

    }

}
