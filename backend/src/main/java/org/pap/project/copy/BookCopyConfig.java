package org.pap.project.copy;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class BookCopyConfig {
    @Bean(name = "bookCopy")
    CommandLineRunner commandLineRunner(BookCopyRepository bookCopyRepository) {
        return args -> bookCopyRepository.saveAll(
                List.of(
                        new BookCopy(
                                "978-3-16-148410-0"
                        ),
                        new BookCopy(
                                "978-3-16-148410-0"
                        ),
                        new BookCopy(
                                "978-3-16-148410-0"
                        ),
                        new BookCopy(
                                "978-3-16-148410-2"
                        ),
                        new BookCopy(
                                "978-3-16-148410-3"
                        ),
                        new BookCopy(
                                "978-3-16-148410-4"
                        ),
                        new BookCopy(
                                "978-3-16-148410-5"
                        ),
                        new BookCopy(
                                "978-3-16-148410-6"
                        )
                )
        );
    }
}
