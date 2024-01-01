import React, { Component } from "react";
import './BookList.css';

const BookList = ({books}) => {

  // state = {
  //   books: [],
  // }

  // componentDidMount() {
  //   this.fetchBooks();
  // }

  // fetchBooks = () => {
  //   fetch("http://localhost:8080/books")
  //     .then((response) => response.json())
  //     .then((data) => this.setState({ books: data }))
  //     .catch((error) => console.error("Error fetching book data:", error));
  // };

  // addBook = (newBook) => {
  //   this.setState((prevState) => ({
  //     books: [...prevState.books, newBook],
  //   }));
  // };

  // deleteBook = (bookToDelete) => {
  //   this.setState((prevState) => ({
  //     books: prevState.books.filter((book) => book.isbn !== bookToDelete),
  //   }));
  // };

  // render() {
    return (
      <React.Fragment>
        <header>Book List</header>
          <ul className="list-group">
            {books.map((book) => (
              <li key={book.isbn} className="list-group-item">
                <strong>Title:</strong> {book.title}
                <strong>Author:</strong> {book.author}
                <strong>ISBN:</strong> {book.isbn}
                <strong>isBorrowed:</strong> {book.isBorrowed}
              </li>
            ))}
          </ul>
      </React.Fragment>
    );
  }
// }

export default BookList;
