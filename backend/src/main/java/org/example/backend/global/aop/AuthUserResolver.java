package org.example.backend.global.aop;

import static org.example.backend.common.exception.auth.AuthExceptionType.PLEASE_LOGIN;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.backend.common.exception.auth.AuthException;
import org.example.backend.jwt.JWTUtil;
import org.example.backend.user.service.UserService;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.context.request.NativeWebRequest;


@Component
@RequiredArgsConstructor
public class AuthUserResolver implements HandlerMethodArgumentResolver {

    private final JWTUtil jwtUtil;
    private final HttpServletRequest request;
    private final UserService userService;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthUser.class);
    }

    @Override
    public Object resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            org.springframework.web.bind.support.WebDataBinderFactory binderFactory) throws Exception {

        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new AuthException(PLEASE_LOGIN);
        }

        String token = authorizationHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            throw new AuthException(PLEASE_LOGIN);
        }

        String loginId = jwtUtil.extractClaims(token).get("loginId", String.class);
        return userService.getUserById(Long.valueOf(loginId));
    }
}
