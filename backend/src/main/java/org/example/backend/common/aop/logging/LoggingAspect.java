package org.example.backend.common.aop.logging;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.CodeSignature;
import org.example.backend.log.domain.RequestResponseLog;
import org.example.backend.log.service.BulkLogManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
@RequiredArgsConstructor
public class LoggingAspect {

    private static final List<String> EXCLUDE_NAMES = Arrays.asList("fileList", "request");
    private static final int MAX_RESPONSE_BODY_LENGTH = 10000;
    private static final int MAX_REQUEST_BODY_LENGTH = 255;
    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final BulkLogManager bulkLogManager;

    @Around("execution(public * org.example.backend.*.controller.*.*(..))")
    public Object logRequestResponse(ProceedingJoinPoint pjp) throws Throwable {

        HttpServletRequest request = getRequest();
        Map<String, Object> requestParams = getFilteredParameters(pjp);
        String clientIp = getClientIp(request);

        printRequestLog(request, requestParams);

        RequestResponseLog logEntry = new RequestResponseLog();
        logEntry.setMethod(request.getMethod());
        logEntry.setPath(request.getRequestURI());
        logEntry.setClientIp(clientIp);
        logEntry.setCreatedAt(LocalDateTime.now());
        try {
            String requestBodyRaw = objectMapper.writeValueAsString(requestParams);
            logEntry.setRequestBody(limitStringLength(requestBodyRaw, MAX_REQUEST_BODY_LENGTH));
        } catch (JsonProcessingException e) {
            logEntry.setRequestBody("null");
        }

        Object result = null;
        try {
            result = pjp.proceed();

            if (result instanceof ResponseEntity<?> responseEntity) {
                String status = responseEntity.getStatusCode().toString();
                Object body = responseEntity.getBody();

                String responseBodyRaw = objectMapper.writeValueAsString(body);
                String truncated = limitStringLength(responseBodyRaw, MAX_RESPONSE_BODY_LENGTH);

                log.info("[RESPONSE {}] [IP {}] {}", status, logEntry.getClientIp(), truncated);

                logEntry.setResponseStatus(status);
                logEntry.setResponseBody(truncated);
            } else {
                logEntry.setResponseStatus("200 (non-ResponseEntity)");
                String responseStr = objectMapper.writeValueAsString(result);
                logEntry.setResponseBody(limitStringLength(responseStr, MAX_RESPONSE_BODY_LENGTH));
            }

            return result;

        } catch (Exception ex) {
            log.error("[EXCEPTION] [IP {}] {}", logEntry.getClientIp(), ex.getMessage(), ex);

            logEntry.setResponseStatus("ERROR");
            logEntry.setResponseBody("Exception: " + ex.getMessage());

            throw ex;
        } finally {
            bulkLogManager.addLog(logEntry);
        }
    }

    private HttpServletRequest getRequest() {
        return ((ServletRequestAttributes)
                RequestContextHolder.currentRequestAttributes()).getRequest();
    }

    private Map<String, Object> getFilteredParameters(ProceedingJoinPoint pjp) {
        CodeSignature codeSignature = (CodeSignature) pjp.getSignature();
        String[] parameterNames = codeSignature.getParameterNames();
        Object[] args = pjp.getArgs();

        Map<String, Object> params = new HashMap<>();
        for (int i = 0; i < parameterNames.length; i++) {
            String paramName = parameterNames[i];
            Object paramValue = args[i];

            if (EXCLUDE_NAMES.contains(paramName)) {
                continue;
            }

            if (paramValue instanceof org.springframework.web.multipart.MultipartFile file) {
                params.put(paramName, "[MultipartFile] " + file.getOriginalFilename());

            } else if (paramValue instanceof org.springframework.web.multipart.MultipartFile[] fileArray) {
                List<String> filenames = Arrays.stream(fileArray)
                        .map(org.springframework.web.multipart.MultipartFile::getOriginalFilename)
                        .toList();
                params.put(paramName, "[MultipartFile[]] " + filenames);

            } else if (paramValue instanceof java.io.InputStream) {
                params.put(paramName, "[InputStream]");

            } else if (paramValue instanceof java.util.Collection<?> collection) {
                List<Object> mappedList = collection.stream()
                        .map(item -> {
                            if (item instanceof org.springframework.web.multipart.MultipartFile mf) {
                                return "[MultipartFile] " + mf.getOriginalFilename();
                            }
                            return item;
                        })
                        .toList();
                params.put(paramName, mappedList);

            } else {
                params.put(paramName, paramValue);
            }
        }
        return params;
    }

    private void printRequestLog(HttpServletRequest request, Map<String, Object> filteredParams) {
        try {
            log.info("[REQUEST {}] [PATH {}] {}",
                    request.getMethod(),
                    request.getRequestURI(),
                    objectMapper.writeValueAsString(filteredParams));
        } catch (JsonProcessingException e) {
            log.warn("[LOGGING ERROR] Request 로깅에 실패했습니다", e);
        }
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    private String limitStringLength(String str, int maxLength) {
        if (str != null && str.length() > maxLength) {
            return str.substring(0, maxLength - 3) + "...";
        }
        return str;
    }

}
