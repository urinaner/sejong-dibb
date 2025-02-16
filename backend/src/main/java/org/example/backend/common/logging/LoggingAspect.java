package org.example.backend.common.logging;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
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

    private static final List<String> excludeNames = Arrays.asList("fileList", "request");
    private static final int MAX_RESPONSE_BODY_LENGTH = 65000;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final BulkLogManager bulkLogManager;

    private final ThreadLocal<RequestResponseLog> requestLogHolder = new ThreadLocal<>();



    @Pointcut("execution(public * org.example.backend.*.controller.*.*(..))")
    private void allPresentation() {
    }

    @Before("allPresentation()")
    public void logRequest(final JoinPoint joinPoint) {
        final HttpServletRequest request = getRequest();
        final Map<String, Object> args = getSpecificParameters(joinPoint);
        String clientIp = getClientIp(request);

        printRequestLog(request, args);

        RequestResponseLog logEntry = new RequestResponseLog();
        logEntry.setMethod(request.getMethod());
        logEntry.setPath(request.getRequestURI());
        logEntry.setClientIp(clientIp);

        try {
            logEntry.setRequestBody(objectMapper.writeValueAsString(args));
        } catch (JsonProcessingException e) {
            logEntry.setRequestBody("null");
        }
        logEntry.setCreatedAt(LocalDateTime.now());

        requestLogHolder.set(logEntry);
    }
    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    private HttpServletRequest getRequest() {
        final ServletRequestAttributes servletRequestAttributes
                = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return servletRequestAttributes.getRequest();
    }

    private Map<String, Object> getSpecificParameters(final JoinPoint joinPoint) {
        final CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        final String[] parameterNames = codeSignature.getParameterNames();
        final Object[] args = joinPoint.getArgs();

        final Map<String, Object> params = new HashMap<>();
        for (int i = 0; i < parameterNames.length; i++) {
            if (!excludeNames.contains(parameterNames[i])) {
                params.put(parameterNames[i], args[i]);
            }
        }
        log.info("[FILTERED PARAMS] {}", params);


        return params;
    }

    private void printRequestLog(final HttpServletRequest request, final Object value) {
        try {
            log.info("[REQUEST {}] [PATH {}] {}",
                    request.getMethod(), request.getRequestURI(), objectMapper.writeValueAsString(value));
        } catch (final JsonProcessingException e) {
            log.warn("[LOGGING ERROR] Request 로깅에 실패했습니다");
        }
    }


    @AfterReturning(value = "allPresentation()", returning = "responseEntity")
    public void logResponse(final ResponseEntity<?> responseEntity) {
        try {
            RequestResponseLog logEntry = requestLogHolder.get();
            if (logEntry == null) return;

            final String responseStatus = responseEntity.getStatusCode().toString();
            Object processedBody = truncateFileList(responseEntity.getBody());
            String responseBody = objectMapper.writeValueAsString(processedBody);
            String truncatedResponseBody = limitStringLength(responseBody);

            log.info("[RESPONSE {}] [IP {}] {}", responseStatus, logEntry.getClientIp(), truncatedResponseBody); // ✅ IP 추가

            logEntry.setResponseStatus(responseStatus);
            logEntry.setResponseBody(truncatedResponseBody);

            bulkLogManager.addLog(logEntry);

        } catch (JsonProcessingException e) {
            log.warn("[LOGGING ERROR] Response 로깅에 실패했습니다");
        } finally {
            requestLogHolder.remove();
        }
    }
    @SuppressWarnings("unchecked")
    private Object truncateFileList(Object body) {
        if (body == null) {
            return null;
        }

        if (body instanceof Map) {
            Map<String, Object> map = new HashMap<>((Map<String, Object>) body);

            List<String> excludedKeys = Arrays.asList("fileList", "largeData", "extraInfo");

            for (String key : excludedKeys) {
                map.remove(key);
            }

            return map;
        }

        return body;
    }

    private String limitStringLength(String str) {
        if (str != null && str.length() > MAX_RESPONSE_BODY_LENGTH) {
            return str.substring(0, MAX_RESPONSE_BODY_LENGTH - 3) + "...";
        }
        return str;
    }

    private void printResponseLog(final ResponseEntity<?> responseEntity) {
        try {
            final String responseStatus = responseEntity.getStatusCode().toString();
            log.info("[RESPONSE {}] {}", responseStatus, objectMapper.writeValueAsString(responseEntity.getBody()));
        } catch (final JsonProcessingException e) {
            log.warn("[LOGGING ERROR] Response 로깅에 실패했습니다");
        }
    }

}
