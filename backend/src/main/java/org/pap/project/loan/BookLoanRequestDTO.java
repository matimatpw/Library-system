package org.pap.project.loan;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class BookLoanRequestDTO {
    private Integer id;
    private Integer userId;
    private Integer bookCopyId;
    private Date startDate;
    private Date endDate;
}
