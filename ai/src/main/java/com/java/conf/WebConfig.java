package com.java.conf;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

@Configuration
public class WebConfig extends GenericFilterBean {
    
    @Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) 
	        throws IOException, ServletException {
		request.setCharacterEncoding("UTF-8");  // 요청 데이터 UTF-8 설정
		response.setCharacterEncoding("UTF-8"); // 응답 데이터 UTF-8 설정
		response.setContentType("text/html; charset=UTF-8"); // 응답의 컨텐츠 타입 지정
		chain.doFilter(request, response); // 다음 필터 또는 서블릿 실행
	}
}
