package org.pap.project.book;

import lombok.Data;
import org.pap.project.genre.Genre;

@Data
public class BookDTO {
    private String isbn;
    private String title;
    private String author;
    private Genre genre;

    public BookDTO(String isbn, String title, String author, Genre genre) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
}
