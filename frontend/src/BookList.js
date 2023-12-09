import React, { Component } from 'react';
import DisplayBooksButton from './DisplayBooksButton';

class BookList extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
        };
    }

    updateBooks = (data) => {
        this.setState({ books: data });
    };

    handleAddBook = () => {
        const newBook = {
            title: 'titlexddd',
            author: 'Unknown',  // You may add author input in the form too
            isbn: '1234-1234-1234',  // Generating a random isbn for demo
        };

        // Update state to include the new book
        this.setState(prevState => ({
            books: [...prevState.books, newBook],

        }));
    };

    render() {
        return (
            <div className='BookList'>
                <DisplayBooksButton updateBooks={this.updateBooks} />
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
