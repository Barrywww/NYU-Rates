package com.example.nyurates.system;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Component
public class SessionInterceptorAdmin implements HandlerInterceptor{
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception{
        String loggedIn = (String) httpServletRequest.getSession().getAttribute("loggedIn");
        String role = (String) httpServletRequest.getSession().getAttribute("role");
        if (loggedIn.equals("true") && role.equals("admin")){
            return true;
        }
        else{
            httpServletResponse.sendError(401);
            return false;
        }
    }
    
}
