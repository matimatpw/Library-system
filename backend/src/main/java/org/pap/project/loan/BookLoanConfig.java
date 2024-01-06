package org.pap.project.loan;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;
import java.util.List;

@Configuration
public class BookLoanConfig {
    @Bean(name = "bookLoan")
    CommandLineRunner commandLineRunner(BookLoanRepository bookLoanRepository) {
        return args -> bookLoanRepository.saveAll(
                List.of(
                        new BookLoan(
                                69,
                                1,
                                new Date(),
                                new Date()
                        ),
                        new BookLoan(
                                55,
                                2,
                                new Date(),
                                new Date()
                        )

                )
        );
    }
}
