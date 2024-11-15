package org.example.backend.common.exception.paging;

import static org.example.backend.common.exception.paging.InvalidPaginationParameterExceptionType.INVALID_PAGE;
import static org.example.backend.common.exception.paging.InvalidPaginationParameterExceptionType.INVALID_SIZE;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;

@Slf4j
@Configuration
public class CustomPageableHandler extends PageableHandlerMethodArgumentResolver {

    @Override
    public Pageable resolveArgument(MethodParameter methodParameter, ModelAndViewContainer mavContainer,
                                    NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {

        String pageParam = webRequest.getParameter("page");
        String sizeParam = webRequest.getParameter("size");

        int page = (pageParam != null) ? Integer.parseInt(pageParam) : 0; // page가 null이면 기본값 0
        int size = (sizeParam != null) ? Integer.parseInt(sizeParam) : 20; // size가 null이면 기본값 20

        if (page < 0) {
            throw new InvalidPaginationParameterException(INVALID_PAGE);
        }

        if (size <= 0) {
            throw new InvalidPaginationParameterException(INVALID_SIZE);
        }

        return super.resolveArgument(methodParameter, mavContainer, webRequest, binderFactory);
    }
}
