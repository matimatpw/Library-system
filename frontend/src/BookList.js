import React, { Component } from 'react';
import AddButton from './AddButton';

class BookList extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
        };
    }

    fetchBooksData = () => {
        fetch('http://localhost:8080/books')
            .then(response => response.json())
            .then(data => this.setState({ books: data }))
            .catch(error => console.error('Error fetching book data:', error));
    };

    render() {
        return (
            <div className='BookList'>
                <AddButton type={'Display_books'} onClick={this.fetchBooksData} />
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
