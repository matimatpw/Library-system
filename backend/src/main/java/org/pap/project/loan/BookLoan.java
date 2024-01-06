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
    private Integer copyBookId;
    private  Date startDate;
    private Date endDate;

    public BookLoan(Integer userId, Integer copyBookId, Date startDate, Date endDate){
        this.userId = userId;
        this.copyBookId = copyBookId;
        this.startDate = startDate;
        this.endDate = endDate;
    }

        public BookLoan(Integer userId){
            this.userId = userId;
            this.copyBookId = 20;
            this.startDate = null;
            this.endDate = null;
        }
}

