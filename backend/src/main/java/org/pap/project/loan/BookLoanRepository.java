package org.pap.project.loan;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookLoanRepository extends JpaRepository<BookLoan, Integer> {
    List<BookLoan> findAllByUserId(Integer userId);
}
