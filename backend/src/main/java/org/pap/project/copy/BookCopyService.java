package org.pap.project.copy;

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
    public BookCopyService(BookCopyRepository bookCopyRepository) {
        this.bookCopyRepository = bookCopyRepository;
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
        BookCopy bookCopy = new BookCopy(isbn);
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
