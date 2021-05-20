package com.example.nyurates.system;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;


@Configuration
public class InterceptorConfig extends WebMvcConfigurationSupport{

    @Override
    protected void addInterceptors (InterceptorRegistry registry){
        // registry.addInterceptor(new SessionInterceptorStudent()).addPathPatterns("/public/validate");
        // registry.addInterceptor(new SessionInterceptorStudent()).addPathPatterns("/student/**");
        // registry.addInterceptor(new SessionInterceptorProf()).addPathPatterns("/professor/**");
        // registry.addInterceptor(new SessionInterceptorAdmin()).addPathPatterns("/admin/**").excludePathPatterns("/admin/login/");

        super.addInterceptors(registry);
    }
    
}
