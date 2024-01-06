package org.pap.project.loan;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "book_loan")
@Getter
@Setter
@NoArgsConstructor
@Data
public class BookLoan {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private Integer userId;
    private int copyBookId;

    public BookLoan(Integer userId, int copyBookId){
        this.userId = userId;
        this.copyBookId = copyBookId;
    }
}

