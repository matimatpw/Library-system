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
                        ),
                        new Book(
                                "978-3-16-148410-3",
                                "The Lord of the Rings 3",
                                "J. R. R. Tolkien"
                        ),
                        new Book(
                                "978-3-16-148410-4",
                                "The Lord of the Rings 4",
                                "J. R. R. Tolkien"
                        ),
                        new Book(
                                        "978-3-16-148410-5",
                                        "The Lord of the Rings 5",
                                        "J. R. R. Tolkien"
                                ),
                        new Book(
                                "978-3-16-148410-6",
                                "The Lord of the Rings 6",
                                "J. R. R. Tolkien"
                        )
                )
        );
    }
}
