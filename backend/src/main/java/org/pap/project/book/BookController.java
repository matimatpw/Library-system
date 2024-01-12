package org.pap.project.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;


import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping(path="/books")
public class BookController {

    @Autowired
    private BookService bookService;
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return new ResponseEntity<List<Book>>(bookService.allBooks(), HttpStatus.OK);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Book>> getSingleBook(@PathVariable String id){
        return new ResponseEntity<Optional<Book>>(bookService.singleBookById(id), HttpStatus.OK);
    }
    @GetMapping("/title/{title}")
    public ResponseEntity<Optional<Book>> getSingleBookbyTitle(@PathVariable String title){
        return new ResponseEntity<Optional<Book>>(bookService.singleBookByTitle(title), HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<Book> createBook(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<Book>(bookService.createNewBook(payload.get("isbn"), payload.get("title"), payload.get("author"), payload.get("genre")), HttpStatus.CREATED);
    }

    @PostMapping("/add")
    public ResponseEntity<Book> addNewBook(@RequestBody Book book){
        return new ResponseEntity<Book>(bookService.addNewBook(book), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{isbn}")
    public ResponseEntity<String> deleteBook(@PathVariable String isbn){
        try {
            bookService.deleteBook(isbn);
            return new ResponseEntity<>("Book with ISBN " + isbn + " deleted", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Book with ISBN " + isbn + " not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting book: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PutMapping("/update/{isbn}")
//    public ResponseEntity<Book> updateBookStatus(@PathVariable String isbn, @RequestBody Map<String, String> payload){
//        try {
//            return new ResponseEntity<Book>(bookService.updateBookStatus(isbn, payload.get("isBorrowed")), HttpStatus.OK);
//        } catch (NoSuchElementException e) {
//            return new ResponseEntity<Book>(HttpStatus.NOT_FOUND);
//        } catch (Exception e) {
//            return new ResponseEntity<Book>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


}
