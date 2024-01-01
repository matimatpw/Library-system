import React, { Component } from "react";
import BooksTable from "./booksTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import Window from "./window";

class Books extends Component {
  state = {
    books: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    showModal: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
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

  render() {
    const { length: count } = this.state.books;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no books in the database.</p>;

    const { totalCount, data: books } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} books in the database.</p>
          <BooksTable
            books={books}
            sortColumn={sortColumn}
            // onLike={this.handleLike}
            // onDelete={this.handleDelete}
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
          <Window
          showModal={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          />
        </div>
      </div>

    );
  }
}

export default Books;
