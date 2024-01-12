import React, { Component } from "react";
import Table from "./common/table";

class DeleteBooksCopyTable extends Component {

  columns = [
    { path: "id", label: "Id" },
    { path: "isbn", label: "ISBN" },
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
      key: "delete",
      content: (bookcopy) => (
        <div>
          <button 
            className="btn btn-primary" 
            onClick={() => this.props.deleteBookCopy(bookcopy)}
            disabled={bookcopy.borrowed}
          >
            Delete
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

export default DeleteBooksCopyTable;
