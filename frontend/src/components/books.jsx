import React, { Component } from "react";
import BooksTable from "./booksTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import Window from "./window";
import "../css/books.css";

class Books extends Component {
  state = {
    books: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchInput: "",
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
    showModal: false,
  };

  handleOpenModal = (isbn) => {
    this.setState({ showModal: true, isbn: isbn });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  fetchGenres() {
    fetch("http://localhost:8080/genres")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ genres: [{ _id: "", name: "All Genres" }, ...data] })
      )
      .catch((error) => console.error("Error fetching genre data:", error));
  }

  fetchBooks = () => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => this.setState({ books: data }))
      .catch((error) => console.error("Error fetching book data:", error));
  };

  componentDidMount() {
    this.fetchBooks();
    this.fetchGenres();
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

  handleSearch = (event) => {
    this.setState({ searchInput: event.target.value, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchInput,
      selectedGenre,
      books: allBooks,
    } = this.state;

    let filtered = allBooks;
    if (searchInput)
      filtered = allBooks.filter((b) =>
        b.title.toLowerCase().includes(searchInput.toLowerCase())
      );

    if (selectedGenre) {
      if (selectedGenre.name !== "All Genres")
        filtered = filtered.filter((b) => b.genre.name === selectedGenre.name);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: books };
  };

  render() {
    const { length: count } = this.state.books;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no books in the database.</p>;

    const { totalCount, data: books } = this.getPagedData();

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <input
              type="text"
              name="query"
              className="form-control my-3"
              placeholder="Search..."
              value={this.state.searchInput}
              onChange={this.handleSearch}
            />
          </div>
          <div className="col-9">
            <div className="text">
              Showing {totalCount} books in the database.
            </div>
          </div>
        </div>
        <div className="col-3" />
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <BooksTable
              books={books}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              showModal={this.state.showModal}
              handleOpenModal={this.handleOpenModal}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
        <Window
          showModal={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          isbn={this.state.isbn}
        />
      </div>
    );
  }
}

export default Books;
