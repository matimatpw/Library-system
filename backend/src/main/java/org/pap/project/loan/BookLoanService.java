package org.pap.project.loan;

import org.pap.project.copy.BookCopyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
public class BookLoanService {
    @Autowired
    private final BookLoanRepository bookLoanRepository;

    @Autowired
    public BookLoanService(BookLoanRepository bookLoanRepository){
        this.bookLoanRepository = bookLoanRepository;
    }

    public List<BookLoan> allBookLoans(){
        return bookLoanRepository.findAll();
    }

    public List<BookLoan> allUserLoans(@RequestParam(value = "userId") Integer userId){
        return bookLoanRepository.findAllUserLoans(userId);
    }


}
