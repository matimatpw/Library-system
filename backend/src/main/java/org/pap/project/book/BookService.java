package org.pap.project.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> allBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> singleBookById(@RequestParam(value="isbn")String isbn) {
        return bookRepository.findById(isbn);
    }

    public Optional<Book> singleBookByTitle(String title) {
        return bookRepository.findBookByTitle(title);
    }

    public Book createNewBook(String isbn, String title, String author) {
        Book book = new Book(isbn,title, author);
        bookRepository.save(book);
        return book;

    }

    public Book addNewBook(@RequestBody Book book) {
        Optional<Book> bookOptional = bookRepository.findById(book.getIsbn());
        if (bookOptional.isPresent()) {
            throw new IllegalStateException("Book already exists");
        }
        bookRepository.save(book);
        return book;

    }
}
