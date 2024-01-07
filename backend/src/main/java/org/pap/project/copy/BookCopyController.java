package org.pap.project.copy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping(path = "/bookcopies")
public class BookCopyController {

    @Autowired
    private BookCopyService bookCopyService;
    @GetMapping
    public ResponseEntity<List<BookCopy>> getALLBookCopies() {
        return new ResponseEntity<List<BookCopy>>(bookCopyService.allBookCopies(), HttpStatus.OK);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<BookCopy>> getSingleBookCopy(@PathVariable Integer id){
        return new ResponseEntity<Optional<BookCopy>>(bookCopyService.singleBookCopyById(id), HttpStatus.OK);
    }
    @GetMapping("/isbn/{isbn}")
    public ResponseEntity<List<BookCopy>> getBookCopiesByIsbn(@PathVariable String isbn){
        return new ResponseEntity<List<BookCopy>>(bookCopyService.BookCopiesByIsbn(isbn), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<BookCopy> createBookCopy(@RequestBody String payload){
        return new ResponseEntity<BookCopy>(bookCopyService.createNewBookCopy(payload), HttpStatus.CREATED);
    }

    @PostMapping("/add")
    public ResponseEntity<BookCopy> addNewBookCopy(@RequestBody BookCopy bookCopy){
        return new ResponseEntity<BookCopy>(bookCopyService.addNewBookCopy(bookCopy), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBookCopy(@PathVariable Integer id){
        try {
            bookCopyService.deleteBookCopy(id);
            return new ResponseEntity<>("BookCopy with id " + id + " deleted", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("BookCopy with id " + id + " not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting bookcopy: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BookCopy> updateBookCopyStatus(@PathVariable Integer id, @RequestBody Map<String, Boolean> payload){
        try {
            return new ResponseEntity<BookCopy>(bookCopyService.updateBookCopyStatus(id, payload.get("isBorrowed")), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<BookCopy>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<BookCopy>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
