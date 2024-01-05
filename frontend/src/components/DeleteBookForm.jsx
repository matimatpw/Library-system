import React, { useState, useEffect } from "react";
import '../css/BookForm.css'

const DeleteBookForm = ({ deleteBook, books }) => {
  const [selectedBook, setSelectedBook] = useState("");
  const [booksList, setBooksList] = useState([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => setBooksList(data))
      .catch((error) => console.error("Error fetching book data:", error));
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/books/delete/${selectedBook}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Nie udało się usunąć książki.");
      }

      // deleteBook(selectedBook);
      setBooksList(booksList.filter((book) => book.isbn !== selectedBook));

      setSelectedBook("");
      // setError(null);
    } catch (error) {
      console.error("Error deleting book:", error);

      // if (error.message.includes("Book not found")) {
      //   setError("Książka o podanym ISBN nie istnieje.");
      // } else {
      //   setError("Wystąpił błąd podczas usuwania książki.");
      // }
    }
  };

  return (
    <div className="container-2">
              <h2>Delete book</h2>
      {/*{console.log("Books in App component:", books)}*/}
      {/*{error && <p style={{ color: "red" }}>{error}</p>}*/}
      <div className="row g-3">
        <label>
          Wybierz książkę do usunięcia:
          <select
            className="form-select"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value="">Wybierz książkę</option>
            {Array.isArray(booksList) &&
              booksList.map((book) => (
                <option key={book.isbn} value={book.isbn}>
                  {book.title} - {book.isbn}
                </option>
              ))}
          </select>
        </label>
        </div>
      <br />
      <button className="btn btn-primary" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default DeleteBookForm;
