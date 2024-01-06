package org.pap.project.loan;

import org.pap.project.book.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.annotation.Repeatable;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/bookloans")
public class BookLoanController {
    @Autowired
    private BookLoanService bookLoanService;

    @GetMapping
    public ResponseEntity<List<BookLoan>> getAllBookLoans(){
        return new ResponseEntity<List<BookLoan>>(bookLoanService.allBookLoans(),HttpStatus.OK);
    }

    @GetMapping("/userid/{userid}")
    public ResponseEntity<List<BookLoan>> getAllUserLoans(@PathVariable Integer userid){
        return new ResponseEntity<List<BookLoan>>(bookLoanService.allUserLoans(userid), HttpStatus.OK);
    }
}
