import React, { Component } from "react";
import Table from "./common/table";

class UsersTable extends Component {
  columns = [
    { path: "id", label: "ID" },
    { path: "email", label: "Email" },
    { path: "name", label: "Name" },
    {
      key: "loans",
      content: (user) => (
        <button
          className="btn btn-primary"
          onClick={() => this.props.handleOpenModal(user)}
        >
          Loans
        </button>
      ),
    },
  ];

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
        handleOpenModal={this.props.handleOpenModal}
      />
    );
  }
}

export default UsersTable;
