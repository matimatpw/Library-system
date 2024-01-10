package org.pap.project.loan;

import org.pap.project.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookLoanRepository extends JpaRepository<BookLoan, Integer> {
    @Query("SELECT new org.pap.project.loan.BookLoanDTO(bl.id ,bl.user, bl.bookCopy.book, bl.bookCopy.id, bl.endDate) FROM BookLoan bl WHERE bl.user.id = :userId")
    List<BookLoanDTO> findAllByUserId(Integer userId);
}