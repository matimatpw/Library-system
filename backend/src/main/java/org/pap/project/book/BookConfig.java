package org.pap.project.book;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class BookConfig {

    @Bean
    CommandLineRunner commandLineRunner(BookRepository bookRepository) {
        return args -> bookRepository.saveAll(
                List.of(
                        new Book(
                                "978-3-16-148410-0",
                                "The Lord of the Rings",
                                "J. R. R. Tolkien"
                        ),
                        new Book(
                                "978-3-16-148410-1",
                                "The Lord of the Rings 2",
                                "J. R. R. Tolkien"
                        )
                )
        );
    }
}
