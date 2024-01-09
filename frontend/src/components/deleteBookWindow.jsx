import React, { Component } from "react";
import Modal from "react-modal";
import DeleteBookCopyTable from "./deleteBooksCopyTable";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class DeleteWindow extends Component {
  state = {
    bookCopies: [],
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    Modal.setAppElement("#root"); // Ustawienie elementu aplikacji na div z id "root"
  }

  deleteBookCopy = async (bookcopy) => {
    try {
      await this.bookCopiesDelete(bookcopy.id);
      this.fetchbookCopies(this.props.isbn);
      toast.success("Book copy deleted successfully!");
      console.log("Deleting book: ", bookcopy);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.isbn !== prevProps.isbn) {
      this.fetchbookCopies(this.props.isbn);
    }
  }

  bookCopiesDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/bookcopies/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error deleting book copy:", error.message);
    }
  };

  fetchbookCopies = (isbn) => {
    fetch(`http://localhost:8080/bookcopies/isbn/${isbn}`)
      .then((response) => response.json())
      .then((data) => this.setState({ bookCopies: data }))
      .catch((error) => console.error("Error fetching book data:", error));
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.bookCopies;
    const { sortColumn } = this.state;

    // if (count === 0) return <p>There are no books in the database.</p>;

    // const { totalCount, bookCopies } = this.getPagedData();

    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.onRequestClose}
        contentLabel={"Example Modal"}
      >
        <DeleteBookCopyTable
          bookCopies={this.state.bookCopies}
          onSort={this.handleSort}
          sortColumn={sortColumn}
          deleteBookCopy={this.deleteBookCopy}
        />
        <button className="btn btn-primary" onClick={this.props.onRequestClose}>
          Close Modal
        </button>
        <ToastContainer />
      </Modal>
    );
  }
}

export default DeleteWindow;
