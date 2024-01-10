import React, { Component } from "react";
import Table from "./common/table";

class BooksCopyTable extends Component {

  columns = [
    { path: "id", label: "Id" },
    { path: "book.isbn", label: "ISBN" },
    { 
      path: "borrowed", 
      label: "isBorrowed",
      content: (bookcopy) => (
        <div>
          {bookcopy.borrowed ? "Yes" : "No"}
        </div>
      ),
    },
    {
      key: "borrow",
      content: (bookcopy) => (
        <div>
          <button 
            className="btn btn-primary" 
            onClick={() => this.props.borrowBook(bookcopy)}
            disabled={bookcopy.borrowed}
          >
            Borrow
          </button>
        </div>
      ),
    },
  ];

  render() {
    const { bookCopies, onSort, sortColumn } = this.props;

    return (
        <Table
          columns={this.columns}
          data={bookCopies}
          sortColumn={sortColumn}
          onSort={onSort}
        />
    );
  }
}

export default BooksCopyTable;
