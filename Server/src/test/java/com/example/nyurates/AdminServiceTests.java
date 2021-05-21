package com.example.nyurates;

import com.example.nyurates.entity.results.*;
import com.example.nyurates.service.AdminService;
import com.example.nyurates.entity.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AdminServiceTests {
    @Autowired
    AdminService adminService;

    /**
     * Admin login test
     */
    @Test
    public void testLogin() throws Exception{
        Admin a1 = new Admin();
        Admin a2 = new Admin();
        a1.setEmail("yw3752@nyu.edu");
        a1.setNetid("yw3752");
        a1.setPassword("root");

        a2.setEmail("yw1@nyu.edu");
        a2.setNetid("yw1");
        a2.setPassword("r321321oot");

        Result result1 = adminService.login(a1);
        Result result2 = adminService.login(a2);

        assertEquals(200, result1.getCode());
        assertEquals(400, result2.getCode());
    }

    /**
     * Admin Student List Test
     */
    @Test
    public void testStudentList() throws Exception{
        StudentListResult r1 = adminService.studentList(null, null, null);
        StudentListResult r2 = adminService.studentList(null, "yw3752", null);

        assertEquals(200, r1.getCode());

        assertEquals(200, r2.getCode());
        assertEquals(1, r2.getStudent_list().size());
    }

    /**
     * Admin Professor List Test
     */
    @Test
    public void testProfList() throws Exception{
        ProfListResult r1 = adminService.profList(null, null, null, null);
        ProfListResult r2 = adminService.profList(null, "pam32", null, null);

        assertEquals(200, r1.getCode());

        assertEquals(200, r2.getCode());
        assertEquals(1, r2.getProfList().size());
    }

    /**
     * Admin Report List Test
     */
    @Test
    public void testGetReports() throws Exception{
        ReportListResult r1 = adminService.getReports(null, null, null, null);
        assertEquals(200, r1.getCode());
    }

    /**
     * Get Professor Request Test
     */
    @Test
    public void testProfReq() throws Exception{
        ProfReqResult r1 = adminService.getProfRequests();
        assertEquals(200, r1.getCode());
    }

    /**
     * Get Statistics Test
     */
    @Test
    public void testStatistics() throws Exception{
        Result r1 = adminService.getStatistics();
        assertEquals(200, r1.getCode());
    }

}
