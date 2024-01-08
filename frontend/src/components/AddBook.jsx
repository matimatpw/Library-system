import React, { Component } from "react";
import AddBooksTable from "./AddBooksTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import Window from "./window";
import "../css/books.css";

class AddBooks extends Component {
  state = {
    books: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    showModal: false,
  };

  handleOpenModal = (isbn) => {
    console.log("Przekazano ISBN:", isbn);
    this.setState({ showModal: true, isbn: isbn });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  getGenres() {
    return [
      { _id: "5b21ca3eeb7f6fbccd471818", name: "Fiction" },
      { _id: "5b21ca3eeb7f6fbccd471814", name: "Non-Fiction" },
      { _id: "5b21ca3eeb7f6fbccd471820", name: "Science Fiction" },
    ];
  }

  fetchBooks = () => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => this.setState({ books: data }))
      .catch((error) => console.error("Error fetching book data:", error));
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...this.getGenres()];
    this.fetchBooks();

    this.setState({ genres });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      // selectedGenre,
      books: allBooks,
    } = this.state;

    const filtered = allBooks;
    // selectedGenre && selectedGenre._id
    //   ? allBooks.filter((b) => b.genre._id === selectedGenre._id)
    //   : allBooks;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: books };
  };

  addBooks = async (isbn) => {
    const newBook = { isbn };
    try {
      const response = await fetch("http://localhost:8080/bookcopies/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      console.log("Przekazano ISBN:", isbn);

      if (!response.ok) {
        throw new Error("Failed to add BookCopy: " + response.status);
      }
    } catch (error) {
      console.error("Error adding BookCopy:", error.message);
    }
  };

  render() {
    const { length: count } = this.state.books;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no books in the database.</p>;

    const { totalCount, data: books } = this.getPagedData();

    return (
      <div className="container">
        <div className="row">
          <div className="col-3" />
          <div className="col">
            {/* <p>Showing {totalCount} books in the database.</p> */}
            <p> </p>
            <div className="row">
              <div className="col"></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <AddBooksTable
              books={books}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              showModal={this.state.showModal}
              handleOpenModal={this.handleOpenModal}
              addBooks={this.addBooks}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AddBooks;
