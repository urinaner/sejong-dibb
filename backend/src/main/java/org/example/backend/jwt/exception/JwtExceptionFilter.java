package org.example.backend.jwt.exception;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Slf4j
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        try {
            log.info("JwtExceptionFilter.doFilterInternal");
            chain.doFilter(request, response); // 다음 필터로 요청 전달
        } catch (JwtException ex) {
            log.error("JwtException caught in filter: ", ex);

            // 에러 응답 작성
            response.setStatus(ex.exceptionType().httpStatus().value());
            response.setContentType("application/json; charset=UTF-8");
            response.getWriter().write(String.format(
                    "{\"error\": \"Unauthorized\", \"message\": \"%s\"}",
                    ex.exceptionType().errorMessage()
            ));
            return;
        }
    }
}