// StudentList.js
import React, { Component } from 'react';

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
                <h1>Book List</h1>
                <ul>
                    {this.state.books.map(book => (
                        <li key={book.id}>
                            {book.isbn} - {book.title} - {book.author}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default BookList;
