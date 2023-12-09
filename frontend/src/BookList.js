import React, { Component } from 'react';
import DisplayBooksButton from './DisplayBooksButton';

class BookList extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            newBookTitle: '',
            newBookAuthor: '',
            newBookIsbn: '',
        };
    }

    updateBooks = (data) => {
        this.setState({ books: data });
    };

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleAddBook = () => {
        const { newBookTitle, newBookAuthor, newBookIsbn } = this.state;

        // Check if both title and author are provided
        if (!newBookTitle || !newBookAuthor) {
            alert('Please enter both title and author.');
            return;
        }

        const newBook = {
            title: newBookTitle,
            author: newBookAuthor,
            isbn: newBookIsbn,
        };

        // Send a POST request to add the new book
        fetch('http://localhost:8080/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        })
            .then(response => response.json())
            .then(data => {
                // Update state to include the new book
                this.setState(prevState => ({
                    books: [...prevState.books, data],
                    newBookTitle: '',
                    newBookAuthor: '',
                }));
            })
            .catch(error => console.error('Error adding book:', error));
    };

    render() {
        return (
            <div className='BookList'>
                <DisplayBooksButton updateBooks={this.updateBooks} />
                <div>
                    <input
                        type="text"
                        placeholder="Enter book title"
                        name="newBookTitle"
                        value={this.state.newBookTitle}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Enter book author"
                        name="newBookAuthor"
                        value={this.state.newBookAuthor}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Enter book isbn"
                        name="newBookIsbn"
                        value={this.state.newBookIsbn}
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.handleAddBook}>Add Book</button>
                </div>
                <ul>
                    {this.state.books.map(book => (
                        <li key={book.isbn}>
                            <div>
                                <h2>
                                    <p>{book.title}</p>
                                </h2>
                            </div>
                            <p className='author'>Author: {book.author}</p>
                            <p>isbn: {book.isbn}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default BookList;
