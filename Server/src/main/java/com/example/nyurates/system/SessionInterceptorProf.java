package com.example.nyurates.system;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Component
public class SessionInterceptorProf implements HandlerInterceptor{
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception{
        try{
            String loggedIn = (String) httpServletRequest.getSession(false).getAttribute("loggedIn");
            String role = (String) httpServletRequest.getSession(false).getAttribute("role");
            if (loggedIn.equals("true") && role.equals("professor")){
                return true;
            }
            else{
                httpServletResponse.sendError(401);
                return false;
            }
        }
        catch (NullPointerException e){
            httpServletResponse.sendError(401);
            return false;
        }
    }
    
}
