package com.assadosman.Trading.App.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    public Dotenv dotenv() {
        return Dotenv.load();
    }
}
