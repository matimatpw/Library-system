import React, { Component } from "react";
import Table from "./common/table";

class BookLoanTableReturn extends Component {
  columns = [
    { path: "id", label: "Loan Id" },
    { path: "userId", label: "User Id" },
    { path: "title", label: "Title" },
    { path: "author", label: "Author" },
    { path: "isbn", label: "ISBN" },
    { path: "copyBookId", label: "Book Copy Id" },
    { path: "endDate", label: "Due Date" },
    {
      key: "giveBack",
      content: (loan) => (
        <button
          className="btn btn-primary"
          onClick={() => this.props.handleRemoveLoan(loan.id)}
        >
          Return
        </button>
      ),
    },
  ];

  render() {
    const { mergedBookCopies, sortColumn, onSort } = this.props;

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
