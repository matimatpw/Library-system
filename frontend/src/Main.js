import React, { Component } from 'react';
import BookList from './BookList';
import AddBookForm from './AddBookForm';
import DeleteBookForm from './DeleteBookForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


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
        const bookListInstance = <BookList />;

        return (

        <div className="App">
            <div className="container">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10"> 
                    <BookList books={this.state.books}/> 
                </div>
            </div>

            <div className="bottom-container">
                <Link to="/addbookform">
                <button type="button" className="btn btn-primary" onClick={() => this.handleToggleForm("isAddFormVisible")}>
                    Add Book
                </button>
                </Link>
                {this.state.isAddFormVisible && <AddBookForm addBook={this.addBook} />}
                
                
                <Link to="/deletebookform">
                <button type="button" className="btn btn-primary" onClick={() => this.handleToggleForm("isDeleteFormVisible")}>
                Delete Book
                </button>
                </Link>
                {this.state.isDeleteFormVisible && this.state.books && (
                <DeleteBookForm deleteBook={this.deleteBook} books={this.state.books} />
                )}
            </div>
            </div>
        </div>
        );
    }
}
export default Main;