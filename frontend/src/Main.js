import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Books from "./components/books";
import "./css/App.css";

class Main extends Component {
  state = {
    books: [],
    isAddFormVisible: false,
    isDeleteFormVisible: false,
  };

  handleToggleForm = (form) => {
    this.setState((prevState) => ({
      [form]: !prevState[form],
    }));
  };

  addBook = (newBook) => {
    this.setState((prevState) => ({
      books: [...prevState.books, newBook],
    }));
  };

  deleteBook = (bookToDelete) => {
    this.setState((prevState) => ({
      books: prevState.books.filter((book) => book.isbn !== bookToDelete),
    }));
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

  render() {
    return (
      <div className="App">
        <Books books={this.state.books} />
      </div>
    );
  }
}
export default Main;
