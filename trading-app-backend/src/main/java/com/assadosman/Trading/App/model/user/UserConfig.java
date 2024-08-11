package com.assadosman.Trading.App.model.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args -> {
            User steveJobs = new User("Steve","Jobs","steve.jobs@apple.com",
                    "password",LocalDate.of(2000, Month.JANUARY,1),
                    50000.0);
            User billGates = new User("Bill","Gates","bill.gates@microsoft.com",
                    "password",LocalDate.of(2003, Month.JULY,9),
                    50000.0);

            repository.saveAll(List.of(steveJobs,billGates));
        };
    }
}
