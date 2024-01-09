import React, { Component } from "react";
import Table from "./common/table";

class DeleteBooksTable extends Component {

  columns = [
    { path: "title", label: "Title" },
    { path: "author", label: "Author" },
    { path: "isbn", label: "ISBN" },
    {
      key: "delete",
      content: (book) => (
          <button
            className="btn btn-primary"
            onClick={() => this.props.handleOpenModal(book.isbn)}
          >
            Delete Book Copy
          </button>
      ),
    },
    {
      key: "deleteBook",
      content: (book) => (
          <button
            className="btn btn-primary"
            onClick={() => this.props.deleteBook(book.isbn)}
          >
            Delete Book
          </button>
      ),
    }
    // { path: "isBorrowed", label: "isBorrowed" },
  ];

  render() {
    const { books, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={books}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default DeleteBooksTable;
