package org.pap.project.copy;

import org.pap.project.book.Book;
import org.pap.project.book.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
public class BookCopyService {
    @Autowired
    private final BookCopyRepository bookCopyRepository;
    @Autowired
    private final BookRepository bookRepository;

    @Autowired
    public BookCopyService(BookCopyRepository bookCopyRepository, BookRepository bookRepository) {
        this.bookCopyRepository = bookCopyRepository;
        this.bookRepository = bookRepository;
    }

    public List<BookCopy> allBookCopies() {
        return bookCopyRepository.findAll();
    }

    public Optional<BookCopy> singleBookCopyById(@RequestParam(value="id")Integer id) {
        return bookCopyRepository.findById(id);
    }

    public List<BookCopy> BookCopiesByIsbn(@RequestParam(value="isbn")String isbn) {
        return bookCopyRepository.findBookCopiesByIsbn(isbn);
    }

    public BookCopy createNewBookCopy(String isbn) {
        Book book = bookRepository.findById(isbn).orElseThrow(() -> new IllegalStateException("Book with isbn " + isbn + " does not exist"));
        BookCopy bookCopy = new BookCopy(book);
        bookCopyRepository.save(bookCopy);
        return bookCopy;
    }

    public BookCopy addNewBookCopy(@RequestBody BookCopy bookCopy) {
        Optional<BookCopy> bookCopyOptional = bookCopyRepository.findById(bookCopy.getId());
        if (bookCopyOptional.isPresent()) {
            throw new IllegalStateException("BookCopy already exists");
        }
        bookCopyRepository.save(bookCopy);
        return bookCopy;
    }

    public void deleteBookCopy(Integer id) {
        boolean exists = bookCopyRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("BookCopy with id " + id + " does not exist");
        }
        bookCopyRepository.deleteById(id);
    }

    public BookCopy updateBookCopyStatus(Integer id, boolean isBorrowed) {
        BookCopy bookCopy = bookCopyRepository.findById(id).orElseThrow(() -> new IllegalStateException("BookCopy with id " + id + " does not exist"));
        bookCopy.setBorrowed(isBorrowed);
        bookCopyRepository.save(bookCopy);
        return bookCopy;
    }
}
