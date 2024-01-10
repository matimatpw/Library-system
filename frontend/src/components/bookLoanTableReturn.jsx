import React, { Component } from "react";
import Table from "./common/table";

class BookLoanTableReturn extends Component {
  columns = [
    { path: "id", label: "Id" },
    { path: "userId", label: "User Id" },
    { path: "title", label: "Title" },
    { path: "author", label: "Author" },
    { path: "isbn", label: "ISBN" },
    { path: "copyBookId", label: "Book Copy Id" },
    { path: "endDate", label: "Due Date" },
    {
      key: "return",
      content: (loan) => (
        <button
          className="btn btn-primary"
          onClick={() => this.props.handleRemoveLoan(loan.copyBookId)}
        >
          Return
        </button>
      ),
    },
  ];

  render() {
    const { mergedBookCopies, onSort, sortColumn } = this.props;

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

export default BookLoanTableReturn;
