package org.example.backend.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.parameters.RequestBody;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.headers.Header;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .path("/api/admin/login", new PathItem().post(new Operation()
                        .summary("Admin login")
                        .description("로그인 기능은 Spring Security 기본 로그인 기능을 따라 form-data 형식으로 로그인 ID와 비밀번호를 전송. 선택적으로 Bearer 형식의 JWT 토큰을 포함")
                        .requestBody(new RequestBody().content(new Content().addMediaType("multipart/form-data",
                                new MediaType().schema(new Schema<>()
                                        .type("object")
                                        .addProperty("loginId", new Schema<String>().type("string").description("로그인 ID"))
                                        .addProperty("password", new Schema<String>().type("string").description("비밀번호"))))))
                        // 선택적인 Authorization 헤더에 선택적이라는 설명을 추가
                        .addParametersItem(new Parameter()
                                .name("Authorization")
                                .in("header")
                                .required(false) // 필수가 아님
                                .description("Bearer 형식의 JWT 토큰 (필수 X)"))
                        .responses(new ApiResponses()
                                .addApiResponse("200", new ApiResponse()
                                        .description("로그인 성공")
                                        // 응답 헤더에 Bearer 토큰을 추가
                                        .addHeaderObject("Authorization", new Header()
                                                .description("Bearer 토큰")
                                                .schema(new Schema<String>().type("string")))))))
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title("dibb Swagger")
                .description("dibb API 명세서")
                .version("1.0.0");
    }
}