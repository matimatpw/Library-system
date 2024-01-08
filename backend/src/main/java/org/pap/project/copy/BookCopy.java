package org.pap.project.copy;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.pap.project.book.Book;

@Entity
@Table(name = "book_copy")
@Getter
@Setter
@NoArgsConstructor
@Data
public class BookCopy {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private boolean isBorrowed;
    @ManyToOne
    private Book book;

    public BookCopy(Book book) {
        this.book = book;
    }
}
