package org.pap.project.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;


import java.util.List;
import java.util.Map;
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


    @PostMapping("/add")
    public ResponseEntity<Book> createBook(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Book>(bookService.createNewBook(payload.get("isbn"), payload.get("title"),payload.get("author")), HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<Book> addNewBook(@RequestBody Book book){
        return new ResponseEntity<Book>(bookService.addNewBook(book), HttpStatus.CREATED);
    }

}
