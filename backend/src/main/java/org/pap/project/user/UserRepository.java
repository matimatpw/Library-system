package org.pap.project.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT usr FROM User usr WHERE usr.role = :role AND usr.loans > 0")
    List<User> findAllByRole(@Param("role") Role role);
    Optional<User> findByEmail(String email);


}
