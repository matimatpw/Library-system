import React, { Component } from "react";
import "../css/BookForm.css";
import { Modal } from "bootstrap";
import UserProfile from "./UserProfileForAdmin.jsx";
import UsersTable from "./usersTable.jsx";

class AdminProfile extends Component {
  state = {
    users: [],
    sortColumn: { path: "id", order: "asc" },
    showModal: false,
    user: {},
  };

  componentDidMount() {
    this.fetchusers();
  }

  fetchusers = async () => {
    fetch("http://localhost:8080/users")
    .then((response) => response.json())
    .then((data) => this.setState({ users: data }))
    .catch((error) => console.error("Error fetching book data:", error));
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleOpenModal = (user) => {
    console.log("Przekazano usera:", user);
    this.setState({ showModal: true, user: user });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { users, sortColumn } = this.state;

    return (
      <div className="container-2">
        <h2>Users</h2>
        <div className="col-8">
          <UsersTable
            users={users}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
        </div>
        <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            contentLabel={"Example Modal"}
        >
            <UserProfile 
                user={this.state.user}
            />
            <button className="btn btn-primary" onClick={this.onRequestClose}>
                Close Modal
            </button>
        </Modal>
      </div>
    );
  }
}

export default AdminProfile;
