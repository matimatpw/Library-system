package org.pap.project.loan;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.pap.project.book.Book;
import org.pap.project.user.User;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class BookLoanDTO {
    private final int id;
    private final User user;
    private final Book book;
    private final int bookCopyId;
    private final Date endDate;

    public BookLoanDTO(BookLoan bookLoan) {
        this.id = bookLoan.getId();
        this.user = bookLoan.getUser();
        this.book = bookLoan.getBookCopy().getBook();
        this.bookCopyId = bookLoan.getBookCopy().getId();
        this.endDate = bookLoan.getEndDate();
    }
}
