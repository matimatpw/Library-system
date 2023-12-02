import React, { useState, useEffect } from 'react';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching book data:', error));
    }, []);

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.isbn}>
                        {book.title} - {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;