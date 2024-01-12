package org.pap.project.init;

import org.pap.project.book.Book;
import org.pap.project.book.BookRepository;
import org.pap.project.copy.BookCopy;
import org.pap.project.copy.BookCopyRepository;
import org.pap.project.genre.Genre;
import org.pap.project.genre.GenreRepository;
import org.pap.project.loan.BookLoan;
import org.pap.project.loan.BookLoanRepository;
import org.pap.project.user.Role;
import org.pap.project.user.User;
import org.pap.project.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InitService {
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final BookCopyRepository bookCopyRepository;
    private final BookLoanRepository bookLoanRepository;
    private final GenreRepository genreRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public InitService(
            BookRepository bookRepository,
            BookCopyRepository bookCopyRepository,
            BookLoanRepository bookLoanRepository,
            GenreRepository genreRepository,
            UserRepository userRepository)
    {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.bookCopyRepository = bookCopyRepository;
        this.bookLoanRepository = bookLoanRepository;
        this.genreRepository = genreRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public void initData() {
        // Tworzenie użytkowników
        List<User> userList = createUsers();
        userRepository.saveAll(userList);

        // Tworzenie gatunków
        List<Genre> genreList = createGenres();
        genreRepository.saveAll(genreList);

        // Tworzenie książek
        List<Book> bookList = createBooks();
        bookRepository.saveAll(bookList);

        // Tworzenie egzemplarzy
        List<BookCopy> bookCopyList = createBookCopies(bookList);
        bookCopyRepository.saveAll(bookCopyList);

        // Tworzenie wypożyczeń
//        BookLoan bookLoan1 = new BookLoan(userList.get(1), bookCopyList.get(0));
//        bookLoanRepository.saveAll(List.of(bookLoan1));
    }

    private List<Genre> createGenres() {
        return List.of(
                new Genre("Fantasy"),
                new Genre("Sport"),
                new Genre("AI"),
                new Genre("IT"));
    }

    private List<Book> createBooks() {
        return List.of(
                new Book("978-3-16-148410-1", "The Lord of the Rings", "J. R. R. Tolkien", new Genre("Fantasy")),
                new Book("978-3-16-148410-2","The Lord of the Rings 2","J. R. R. Tolkien", new Genre("Sport")),
                new Book("978-3-16-148410-3","The Lord of the Rings 3", "J. R. R. Tolkien", new Genre("AI")),
                new Book("978-3-16-148410-4","The Lord of the Rings 4","J. R. R. Tolkien", new Genre("Fantasy")),
                new Book("978-3-16-148410-5","The Lord of the Rings 5","J. R. R. Tolkien", new Genre("IT")),
                new Book("978-3-16-148410-6","The Lord of the Rings 6","J. R. R. Tolkien", new Genre("IT")));
    }
    private List<BookCopy> createBookCopies(List<Book> bookList) {
        List<BookCopy> bookCopyList = new ArrayList<>();
        for (Book book : bookList) {
            bookCopyList.add(new BookCopy(book));
            bookCopyList.add(new BookCopy(book));
        }
        return bookCopyList;
    }

    private List<User> createUsers() {
        return List.of(
                User.builder().name("admin").email("admin@admin").password(passwordEncoder.encode("admin")).role(Role.ADMIN).build(),
                User.builder().name("user").email("user@user").password(passwordEncoder.encode("12345")).role(Role.USER).loans(0).build());
    }
}
