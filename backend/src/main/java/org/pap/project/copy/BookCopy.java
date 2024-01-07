package org.pap.project.copy;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String isbn;
    private boolean isBorrowed;
    private Date borrowDate;
    private Integer actuserid;

    public BookCopy(String isbn) {
        this.isbn = isbn;
        this.isBorrowed = false;
        this.borrowDate = null;
        this.actuserid = null;
    }

}
