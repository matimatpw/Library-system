import React, { Component } from "react";
import Table from "./common/table";

class BookLoanTable extends Component {

  columns = [
    { path: "id", label: "Id" },
    { path: "userId", label: "User Id" },
    { path: "copyBookId", label: "Book Copy Id" },
    { path: "isbn", label: "ISBN" },
    { path: "title", label: "Title" },
    // { path: "author", label: "Author" },
  ];

  render() {
    const {bookCopies, bookLoans, mergedBookLoans, mergedBookCopies, onSort, sortColumn } = this.props;

    return (
        <Table
          columns={this.columns}
          data={mergedBookCopies}
          sortColumn={sortColumn}
          onSort={onSort}
        />
    );
  }
}

export default BookLoanTable;