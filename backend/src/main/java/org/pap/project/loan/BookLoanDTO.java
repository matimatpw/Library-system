package org.pap.project.loan;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.pap.project.book.Book;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class BookLoanDTO {
    private final Book book;
    private final int bookCopyId;
    private final Date endDate;

    public BookLoanDTO(BookLoan bookLoan) {
        this.book = bookLoan.getBookCopy().getBook();
        this.bookCopyId = bookLoan.getBookCopy().getId();
        this.endDate = bookLoan.getEndDate();
    }
}
