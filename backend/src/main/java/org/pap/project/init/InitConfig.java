package org.pap.project.init;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InitConfig {
    @Bean
    CommandLineRunner commandLineRunner(InitService initService) {
        return args -> initService.initData();
    }
}
