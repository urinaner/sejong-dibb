package org.example.backend.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.media.StringSchema;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration // 스프링 실행시 설정파일 읽어들이기 위한 어노테이션
@EnableWebMvc
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .path("/api/admin/login", new PathItem().post(new Operation()
                        .summary("Admin login")
                        .description("로그인 기능은 Spring Security 기본 로그인 기능을 따르며, form-data 형식으로 로그인 ID와 비밀번호를 전송합니다.")
                        .addParametersItem(new Parameter().name("loginId").in("query").required(true).description("로그인 ID").schema(new StringSchema()))
                        .addParametersItem(new Parameter().name("password").in("query").required(true).description("비밀번호").schema(new StringSchema()))))
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title("dibb Swagger")
                .description("dibb API 명세서")
                .version("1.0.0");
    }
}