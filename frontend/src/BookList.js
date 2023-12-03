import React, { Component } from 'react';
import AddButton from './AddButton';

class BookList extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/books')
            .then(response => response.json())
            .then(data => this.setState({ books: data }))
            .catch(error => console.error('Error fetching student data:', error));
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.books.map(book => (
                        <li key={book.isbn}>
                            <div >
                                <h2>
                                    <p>{book.title}</p>
                                </h2>
                            </div>
                            <p style={{fontWeight: 'bold' }} >Author: {book.author}</p>
                            <p>ID: {book.isbn}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default BookList;