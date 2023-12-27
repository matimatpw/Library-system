import React, { Component } from 'react';
import BookList from './BookList';
import AddBookForm from './AddBookForm';
import DeleteBookForm from './DeleteBookForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

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
    const bookListInstance = <BookList />;

    return (
      <div className="App">
        <div className="container">
          <div className="row">
              <div className="col-1"></div>
              <div className="col-10"> <BookList
              books={this.state.books}
              /> </div>
              <div className="col-1"></div>
          </div>

          <div className="row">
            <div className="col-1"> </div>
            <div className="col-1">
            <button onClick={() => this.handleToggleForm("isAddFormVisible")}>
              Add Book
            </button>
            </div>

            <div className="col-7"> </div>

            <div className="col-1">
            {this.state.isAddFormVisible && <AddBookForm addBook={this.addBook} />}
            <button onClick={() => this.handleToggleForm("isDeleteFormVisible")}>
              Delete Book
            </button>
            </div>
          </div>

          {this.state.isDeleteFormVisible && (
            <DeleteBookForm deleteBook={this.deleteBook} books={this.state.books} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
