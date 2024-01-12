import React, { Component } from "react";
import Table from "./common/table";

class AddBooksTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "author", label: "Author" },
    { path: "isbn", label: "ISBN" },
    {
      key: "add",
      content: (book) => (
        <button
          className="btn btn-primary"
          onClick={() => this.props.addBooks(book.isbn)}
        >
          Add
        </button>
      ),
    },
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

export default AddBooksTable;
