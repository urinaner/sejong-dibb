package org.example.backend.global.config.web;

import org.example.backend.global.util.OctetStreamReadMsgConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;


@Configuration
public class WebConfig implements WebMvcConfigurer {
    private OctetStreamReadMsgConverter octetStreamReadMsgConverter;

    @Autowired
    public WebConfig(OctetStreamReadMsgConverter octetStreamReadMsgConverter) {
        this.octetStreamReadMsgConverter = octetStreamReadMsgConverter;
    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(octetStreamReadMsgConverter);
    }

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {

        corsRegistry.addMapping("/**")
                .allowedOrigins("http://localhost:3000",
                        "http://sejong-bioconvergence-temp.s3-website.ap-northeast-2.amazonaws.com");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:/var/uploads/");
    }
}