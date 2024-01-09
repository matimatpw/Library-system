package org.pap.project.book;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;
import org.pap.project.copy.BookCopy;

@Entity
@Table(name = "book")
@Getter
@Setter
@NoArgsConstructor
@Data
public class  Book {
    @Id
    private String isbn;
    private String title;
    private String author;

    public Book(String isbn, String title, String author) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
    }
}
