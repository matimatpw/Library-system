package org.pap.project.loan;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.pap.project.copy.BookCopy;
import org.pap.project.user.User;

import java.util.Date;

@Entity
@Table(name = "book_loan")
@Getter
@Setter
@NoArgsConstructor
@Data
public class BookLoan {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    @ManyToOne
    private User user;
    @OneToOne
    private BookCopy bookCopy;
    private  Date startDate;
    private Date endDate;

    public BookLoan(User user, BookCopy bookCopy, Date startDate, Date endDate){
        this.user = user;
        this.bookCopy = bookCopy;
        this.startDate = startDate;
        this.endDate = endDate;
        this.user.setLoans(this.user.getLoans() + 1);
    }

    public BookLoan(User user, BookCopy bookCopy){
        this.user = user;
        this.bookCopy = bookCopy;
        this.startDate = null;
        this.endDate = null;
    }
}

