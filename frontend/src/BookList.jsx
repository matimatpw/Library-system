import React, { Component } from "react";
import AddBookForm from "./AddBookForm";
import DeleteBookForm from "./DeleteBookForm";

class BookList extends Component {
  state = {
    books: [],
    isAddFormVisible: false,
    isDeleteFormVisible: false,
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => this.setState({ books: data }))
      .catch((error) => console.error("Error fetching book data:", error));
  };

  addBook = (newBook) => {
    this.setState((prevState) => ({
      books: [...prevState.books, newBook],
      isAddFormVisible: false,
      isDeleteFormVisible: false,
    }));
  };

  deleteBook = (bookToDelete) => {
    this.setState((prevState) => ({
      books: prevState.books.filter((book) => book.isbn !== bookToDelete),
      isAddFormVisible: false,
      isDeleteFormVisible: false,
    }));
  };

  handleToggleForm = (form) => {
    this.setState((prevState) => ({
      [form]: !prevState[form],
    }));
  };

  render() {
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book) => (
              <tr key={book.isbn}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => this.handleToggleForm("isAddFormVisible")}>
          Add Book
        </button>
        {this.state.isAddFormVisible && <AddBookForm addBook={this.addBook} />}
        <button onClick={() => this.handleToggleForm("isDeleteFormVisible")}>
          Delete Book
        </button>
        {this.state.isDeleteFormVisible && (
          <DeleteBookForm deleteBook={this.deleteBook} />
        )}
      </React.Fragment>
    );
  }
}

export default BookList;
