import React from 'react';
import AddButton from './AddButton';

const DisplayBooksButton = ({ updateBooks }) => {
    const fetchBooksData = () => {
        fetch('http://localhost:8080/books')
            .then(response => response.json())
            .then(data => updateBooks(data))
            .catch(error => console.error('Error fetching book data:', error));
    };

    return (
        <AddButton type='Display_books' onClick={fetchBooksData}></AddButton>
    );
};

export default DisplayBooksButton;