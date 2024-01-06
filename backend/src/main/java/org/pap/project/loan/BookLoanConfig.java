package org.pap.project.loan;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class BookLoanConfig {
    @Bean(name = "bookLoan")
    CommandLineRunner commandLineRunner(BookLoanRepository bookLoanRepository) {
        return args -> bookLoanRepository.saveAll(
                List.of(
                        new BookLoan(
                                69,
                                1
                        ),
                        new BookLoan(
                                55,
                                2
                        )
                )
        );
    }
}
