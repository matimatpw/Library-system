import React, { useEffect, useState } from "react";
import "../css/BookForm.css";
import AddBooks from "./AddBook";
import { toast, ToastContainer } from "react-toastify";

const AddBookForm = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => setBooks({ data }))
      .catch((error) => console.error("Error fetching book data:", error));
  };

  useEffect(() => {
    fetch("http://localhost:8080/genres")
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error("Error fetching genre data:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !isbn || !selectedGenre) {
      toast.error("All fields are required.");
      return;
    }

    const newBook = { isbn, title, author, genre: selectedGenre };
    console.log(JSON.stringify(newBook));

    try {
      const response = await fetch("http://localhost:8080/books/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error("Cannot add book with an existing isbn.");
      }
      toast.success("Book added successfully!");

      setTitle("");
      setAuthor("");
      setIsbn("");
      setSelectedGenre("");
      setError(null);

      fetchBooks();
    } catch (error) {
      toast.error(error.message);
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
          <div className="row g-3 row-g-3">
            <div className="col-2">
              <label htmlFor="genre" className="form-label">
                Genre
              </label>
            </div>
            <div className="col-9">
              <span>
                <select
                  className="form-control"
                  id="genre"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  <option value="">Select genre</option>
                  {genres.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
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
      <ToastContainer />
      <AddBooks books={books} />
    </div>
  );
};

export default AddBookForm;
