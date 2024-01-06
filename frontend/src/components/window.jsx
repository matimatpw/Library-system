import React, { Component } from 'react';
import Modal from 'react-modal';
import BookCopyTable from './booksCopyTable';

class Window extends Component {

  state = {
    bookCopies: [],
    sortColumn: { path: "title", order: "asc" },
  }

  componentDidMount() {
    Modal.setAppElement('#root');
  }

  borrowBook = (bookcopy) => {
    if (bookcopy.isBorrowed) {
      alert("Book is already borrowed");
      return;
    }
    const updatedBookCopies = this.state.bookCopies.map((copy) =>
      copy.id === bookcopy.id ? { ...copy, borrowed: true } : copy
    );

    this.setState({ bookCopies: updatedBookCopies });

    this.BookCopiesUpdate(bookcopy.id);
    console.log("Borrowing book: ", bookcopy);
  };

  componentDidUpdate(prevProps) {
    if (this.props.isbn !== prevProps.isbn) {
      this.fetchbookCopies(this.props.isbn);
    }
  }

  fetchbookCopies = (isbn) => {
    fetch(`http://localhost:8080/bookcopies/isbn/${isbn}`)
      .then((response) => response.json())
      .then((data) => this.setState({ bookCopies: data }))
      .catch((error) => console.error("Error fetching book data:", error));
  };

  BookCopiesUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/bookcopies/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "isBorrowed": true })
      });

      if (!response.ok) {
        throw new Error('Nie udało się wypożyczyć książki.');
      }

      console.log('Book copy updated successfully:', response);
    } catch (error) {
      console.error('Error updating book copy:', error.message);
    }
  }

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
        <BookCopyTable
          bookCopies={this.state.bookCopies}
          onSort={this.handleSort}
          sortColumn={sortColumn}
          borrowBook={this.borrowBook}
        />
        <button className='btn btn-primary' onClick={this.props.onRequestClose}>Close Modal</button>
      </Modal>
      );
  }
}

export default Window;
