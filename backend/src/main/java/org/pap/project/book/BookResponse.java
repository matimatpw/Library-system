package org.pap.project.book;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BookResponse {
    private List<BookDTO> content;
    private int pageNumber;
    private int pageSize;
    private int totalPages;
    private long totalElements;
}
