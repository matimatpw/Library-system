package org.pap.project.copy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookCopyRepository extends JpaRepository<BookCopy, Integer> {
    List<BookCopy> findBookCopiesByIsbn (String isbn);  //TODO tutaj Optional powinno byc imo :
                                                        //TODO edit jednak moze niech zostanie wszedzie tak jak tuaj xd
}
