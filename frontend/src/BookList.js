import React, { Component } from 'react';
import AddBookForm from './AddBookForm';
import DeleteBookForm from './DeleteBookForm';

class BookList extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      isAddFormVisible: false,
      isDeleteFormVisible: false,
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    fetch('http://localhost:8080/books')
      .then((response) => response.json())
      .then((data) => this.setState({ books: data }))
      .catch((error) => console.error('Error fetching book data:', error));
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

  renderBook = (book) => (
    <li key={book.isbn}>
      <div>
        <h2>
          <p>{book.title}</p>
        </h2>
      </div>
      <p className="author">Author: {book.author}</p>
      <p>isbn: {book.isbn}</p>
    </li>
  );

  renderBookList = () => <ul>{this.state.books.map(this.renderBook)}</ul>;

  handleToggleForm = (form) => {
    this.setState((prevState) => ({
      [form]: !prevState[form],
    }));
  };

  render() {
    return (
      <div className="BookList">
        {this.renderBookList()}
        <button onClick={() => this.handleToggleForm('isAddFormVisible')}>
          Add Book
        </button>
        {this.state.isAddFormVisible && <AddBookForm addBook={this.addBook} />}
        <button onClick={() => this.handleToggleForm('isDeleteFormVisible')}>
          Delete Book
        </button>
        {this.state.isDeleteFormVisible && (
          <DeleteBookForm deleteBook={this.deleteBook} />
        )}
      </div>
    );
  }
}

export default BookList;
