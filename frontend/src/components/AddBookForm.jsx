import React, { useState } from "react";
import "../css/BookForm.css";
import AddBooks from "./AddBook";
import { toast, ToastContainer } from "react-toastify";

const AddBookForm = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !isbn) {
      alert("Wszystkie pola muszą być wypełnione.");
      return;
    }

    const newBook = { isbn, title, author };

    try {
      const response = await fetch("http://localhost:8080/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error("Nie udało się dodać książki.");
      }
      toast.success("Book added successfully!");

      // const data = await response.json();

      // addBook(data);

      setTitle("");
      setAuthor("");
      setIsbn("");
      setError(null);
    } catch (error) {
      console.error("Error adding book:", error);

      if (error.message.includes("Book already exists")) {
        setError("Książka o podanym ISBN już istnieje.");
      } else {
        setError("Wystąpił błąd podczas dodawania książki.");
      }
    }
  };

  return (
    <div className="container-2">
      <h2>Add book</h2>
      <div className="col-5">
        <form onSubmit={handleSubmit}>
          <div className="row g-3 row-g-3">
            <div className="col-2">
              <label for="title" className="form-label">
                Title
              </label>
            </div>
            <div className="col-9">
              <span>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </span>
            </div>
          </div>
          <div className="row g-3 row-g-3">
            <div className="col-2">
              <label for="author" className="form-label">
                Author
              </label>
            </div>
            <div className="col-9">
              <span>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </span>
            </div>
          </div>
          <div className="row g-3 row-g-3">
            <div className="col-2">
              <label for="isbn" className="form-label">
                ISBN
              </label>
            </div>
            <div className="col-9">
              <span>
                <input
                  type="text"
                  className="form-control"
                  id="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </span>
            </div>
          </div>
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="btn btn-primary" type="submit">
            Add book
          </button>
        </form>
      </div>
      <AddBooks />
      <ToastContainer />
    </div>
  );
};

export default AddBookForm;
