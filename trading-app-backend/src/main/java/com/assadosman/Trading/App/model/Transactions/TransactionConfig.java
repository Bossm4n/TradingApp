package com.assadosman.Trading.App.model.Transactions;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class TransactionConfig {

    @Bean
    CommandLineRunner commandLineRunnerTransaction(TransactionRepository repository){
        return args -> {
            Transaction transaction1 = new Transaction(1,1,1d,1d,
                    LocalDate.of(2000,1,1));
            Transaction transaction2 = new Transaction(2,1,1d,3d,
                    LocalDate.of(2000,2,6));

            repository.saveAll(List.of(transaction1,transaction2));
        };
    }
}
