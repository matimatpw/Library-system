package org.pap.project.loan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(path = "/bookloans")
public class BookLoanController {
    @Autowired
    private BookLoanService bookLoanService;

    @GetMapping
    public ResponseEntity<List<BookLoan>> getAllBookLoans(){
        return new ResponseEntity<List<BookLoan>>(bookLoanService.allBookLoans(), HttpStatus.OK);
    }

    @GetMapping("/userid/{userid}")
    public ResponseEntity<List<BookLoan>> getAllUserLoans(@PathVariable Integer userid){
        return new ResponseEntity<List<BookLoan>>(bookLoanService.allUserLoans(userid), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<BookLoan> addNewBookLoan(@RequestBody BookLoan bookLoan){
        return new ResponseEntity<BookLoan>(bookLoanService.addNewBookLoan(bookLoan), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBookLoan(@PathVariable Integer id){
        try {
            bookLoanService.deleteBookLoan(id);
            return new ResponseEntity<>("BookLoan with id " + id + " deleted", HttpStatus.OK);
        } catch (
        NoSuchElementException e) {
            return new ResponseEntity<>("BookLoan with id " + id + " not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting bookLoan: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
