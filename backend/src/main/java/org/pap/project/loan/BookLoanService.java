package org.pap.project.loan;


import org.pap.project.copy.BookCopy;
import org.pap.project.copy.BookCopyRepository;
import org.pap.project.copy.BookCopyService;
import org.pap.project.email.EmailService;
import org.pap.project.user.User;
import org.pap.project.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BookLoanService {
    @Autowired
    private final BookLoanRepository bookLoanRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final BookCopyRepository bookCopyRepository;

    @Autowired
    private final BookCopyService bookCopyService;

    @Autowired
    private final EmailService emailService;

    public final String DATE_FORMAT = "dd/MM/yyyy HH:mm:ss";
    SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

    @Autowired
    public BookLoanService(
            UserRepository userRepository,
            BookCopyRepository bookCopyRepository,
            BookLoanRepository bookLoanRepository,
            BookCopyService bookCopyService,
            EmailService emailService)
    {
        this.userRepository = userRepository;
        this.bookCopyRepository = bookCopyRepository;
        this.bookLoanRepository = bookLoanRepository;
        this.bookCopyService = bookCopyService;
        this.emailService = emailService;
    }

    public List<BookLoan> allBookLoans(){
        return bookLoanRepository.findAll();
    }

    public List<BookLoanDTO> allUserLoans(@RequestParam(value = "userid")Integer userid){
        return bookLoanRepository.findAllByUserId(userid);
    }

    public BookLoanDTO addNewBookLoan(@RequestBody BookLoanRequestDTO bookLoanRequestDTO) {
        User user = userRepository.findById(bookLoanRequestDTO.getUserId()).orElseThrow(() -> new IllegalStateException("User with id " + bookLoanRequestDTO.getUserId() + " does not exist"));
        BookCopy bookCopy = bookCopyRepository.findById(bookLoanRequestDTO.getBookCopyId()).orElseThrow(() -> new IllegalStateException("BookCopy with id " + bookLoanRequestDTO.getBookCopyId() + " does not exist"));
        BookLoan bookLoan = new BookLoan(user, bookCopy, bookLoanRequestDTO.getStartDate(), bookLoanRequestDTO.getEndDate());
        bookLoanRepository.save(bookLoan);

        String to = user.getEmail();
        String subject = "Nowe wypożyczenie";
        String body = "Dzień dobry, \n\n" +
                "Wypożyczyłeś książkę o tytule: " + bookCopy.getBook().getTitle() + "\n" +
                "Data wypożyczenia: " + sdf.format(bookLoan.getStartDate()) + "\n" +
                "Data zwrotu: " + sdf.format(bookLoan.getEndDate()) + "\n\n" +
                "Pozdrawiamy, \n" +
                "Biblioteka";
        emailService.sendEmail(to, subject, body);

        return new BookLoanDTO(bookLoan);
    }

    public void deleteBookLoan(Integer id){
        boolean exists = bookLoanRepository.existsById(id);
        if(!exists){
            throw new IllegalStateException("BookLoan with id " + id + " does not exist");
        }
        BookLoan bookLoan = bookLoanRepository.findById(id).get();
        BookCopy bookCopy = bookLoan.getBookCopy();
        bookCopyService.updateBookCopyStatus(bookCopy.getId(), false);
        User user = bookLoan.getUser();
        user.setLoans(user.getLoans() - 1);
        bookLoanRepository.deleteById(id);

        String to = user.getEmail();
        String subject = "Zwrot książki";
        String body = "Dzień dobry, \n\n" +
                "Zwróciłeś książkę o tytule: " + bookCopy.getBook().getTitle() + "\n" +
                "Data wypożyczenia: " + bookLoan.getStartDate() + "\n" +
                "Data zwrotu: " + sdf.format(new Date()) + "\n\n" +
                "Pozdrawiamy, \n" +
                "Biblioteka";
        emailService.sendEmail(to, subject, body);
    }


}
