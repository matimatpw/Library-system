import React, { Component } from "react";
import "../css/BookForm.css";
import Modal from "react-modal";
import UserProfile from "./UserProfileForAdmin.jsx";
import UsersTable from "./usersTable.jsx";

class AdminProfile extends Component {
  state = {
    users: [],
    sortColumn: { path: "title", order: "asc" },
    showModal: false,
    user: {},
  };

  componentDidMount() {
    this.fetchusers();
  }

  fetchusers = async () => {
    const user_admin = "USER"; // info: toggle for finding user or admin | takes: "USER" or "ADMIN"
    fetch("http://localhost:8080/users/byRole/" + user_admin)
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
    this.fetchusers();
    this.setState({ showModal: false });
  };

  render() {
    const { users, sortColumn } = this.state;
    const count = users.length;

    if (count === 0) return <p>There are no users with bookloans.</p>;

    return (
      <div className="container-2">
        <h2>Users that have loans</h2>
        <div className="col-8">
          <UsersTable
            users={users}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            handleOpenModal={this.handleOpenModal}
          />
        </div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel={"Example Modal"}
        >
          <UserProfile user={this.state.user} />
          <button className="btn btn-primary" onClick={this.handleCloseModal}>
            Close Modal
          </button>
        </Modal>
      </div>
    );
  }
}

export default AdminProfile;
