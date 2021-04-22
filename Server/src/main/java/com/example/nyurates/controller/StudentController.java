package com.example.nyurates.controller;

import com.example.nyurates.service.StudentService;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;


@Controller
//@RequestMapping("/student")
public class StudentController {
    //植入对象
    @Resource(name = "StudentService")
    private StudentService service;

    /*返回頁面*/
    @RequestMapping("/getlogin")
    public String getlogin(){
        return "login";
    }

    /*登录*/
    @RequestMapping("/login")
    public ModelAndView login(Student student, ModelAndView mv, HttpServletRequest request, Model model){
        Users login = service.login(student.getEmail(),student.getPassword());
        System.out.println(login);
        if (login!=null){
            request.getSession().setAttribute("login",login);
            System.out.println("成功！！");
            mv.setViewName("index");
        }else{
            System.out.println("失败！！");
            mv.setViewName("login");
        }
        return mv;
    }

}
