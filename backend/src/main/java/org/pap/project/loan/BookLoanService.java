package org.pap.project.loan;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookLoanService {
    @Autowired
    private final BookLoanRepository bookLoanRepository;

    @Autowired
    public BookLoanService(BookLoanRepository bookLoanRepository) {this.bookLoanRepository = bookLoanRepository;}

    public List<BookLoan> allBookLoans(){
        return bookLoanRepository.findAll();
    }

    public List<BookLoan> allUserLoans(@RequestParam(value = "userid")Integer userid){
        return bookLoanRepository.findAllByUserId(userid);
    }

    public BookLoan addNewBookLoan(@RequestBody BookLoan bookLoan) {

        bookLoanRepository.save(bookLoan);
        return bookLoan;
    }


}
