import React, { useState } from 'react';


const AddBookForm = ({ addBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !isbn) {
      alert('Wszystkie pola muszą być wypełnione.');
      return;
    }

    const newBook = { isbn, title, author };

    try {
      const response = await fetch('http://localhost:8080/books/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error('Nie udało się dodać książki.');
      }

      const data = await response.json();

      addBook(data);

      setTitle('');
      setAuthor('');
      setIsbn('');
      setError(null);
    } catch (error) {
      console.error('Error adding book:', error);

      if (error.message.includes('Book already exists')) {
        setError('Książka o podanym ISBN już istnieje.');
      } else {
        setError('Wystąpił błąd podczas dodawania książki.');
      }
    }
  };

  return (
      <div>
        <h2>Dodaj Książkę</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Tytuł : 
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label >
            Autor:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <br />
          <label>
            ISBN:
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Dodaj Książkę</button>
        </form>
      </div>
  );
};

export default AddBookForm;
