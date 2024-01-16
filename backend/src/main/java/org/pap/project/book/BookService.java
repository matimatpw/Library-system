package org.pap.project.book;

import org.pap.project.genre.Genre;
import org.pap.project.genre.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private final BookRepository bookRepository;

    @Autowired
    private final GenreRepository genreRepository;

    @Autowired
    public BookService(BookRepository bookRepository, GenreRepository genreRepository) {
        this.bookRepository = bookRepository;
        this.genreRepository = genreRepository;
    }

    public List<Book> allBooks() {
        return bookRepository.findAll();
    }

    public BookResponse getAllBooks(int pageNumber, int pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Book> books = bookRepository.findAll(pageable);
        List<Book> bookList = books.getContent();
        List<BookDTO> bookDTOList = bookList.stream()
                .map(this::mapToBookDTO)
                .toList();

        return new BookResponse(
                bookDTOList,
                books.getNumber(),
                books.getSize(),
                books.getTotalPages(),
                books.getTotalElements()
        );
    }

    private BookDTO mapToBookDTO(Book book) {
        return new BookDTO(book.getIsbn(), book.getTitle(), book.getAuthor(), book.getGenre());
    }

    public Optional<Book> singleBookById(@RequestParam(value="isbn")String isbn) {
        return bookRepository.findById(isbn);
    }

    public Optional<Book> singleBookByTitle(String title) {
        return bookRepository.findBookByTitle(title);
    }

    public Book createNewBook(String isbn, String title, String author, String genreName) {
        Optional<Book> bookOptional = bookRepository.findById(isbn);
        if (bookOptional.isPresent()) {
            throw new IllegalStateException("Book already exists");
        }
        Genre genre = genreRepository.findById(genreName).orElseThrow(() -> new IllegalStateException("Genre with name " + genreName + " does not exist"));
        Book book = new Book(isbn,title, author, genre);
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

    public void deleteBook(String isbn) {
        boolean exists = bookRepository.existsById(isbn);
        if (!exists) {
            throw new IllegalStateException("Book with isbn " + isbn + " does not exist");
        }
        bookRepository.deleteById(isbn);
    }

//    public Book updateBookStatus(String isbn, String isBorrowed) {
//        Book book = bookRepository.findById(isbn).orElseThrow(() -> new IllegalStateException("Book with isbn " + isbn + " does not exist"));
//        book.setIsBorrowed(isBorrowed);
//        bookRepository.save(book);
//        return book;
//    }
}
