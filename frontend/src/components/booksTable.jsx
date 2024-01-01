import React, { Component } from "react";
import Table from "./common/table";
import BorrowButton from "./common/BorrowButton";
import Modal from 'react-modal';
import Window from "./window";

class BooksTable extends Component {

  columns = [
    { path: "title", label: "Title" },
    { path: "author", label: "Author" },
    { path: "isbn", label: "ISBN" },
    {
      key: "borrow",
      content: (book) => (
        <div>
          <button className="btn btn-primary" onClick={this.props.handleOpenModal}>Borrow</button>
        </div>
      ),
    },
    { path: "isBorrowed", label: "isBorrowed" }
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

export default BooksTable;
