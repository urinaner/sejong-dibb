package org.example.backend.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.yj.sejongauth.config.SjSettingConfig;

@Configuration
@Import(SjSettingConfig.class)
public class SjConfig {
}