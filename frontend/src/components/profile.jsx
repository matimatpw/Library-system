import React, { Component } from "react";
import BookLoanTable from "./booksLoanTable";
import auth from "../services/authService";
import "../css/BookForm.css";

class Profile extends Component {
  state = {
    mergedBookCopies: [],
    sortColumn: { path: "id", order: "asc" },
  };

  componentDidMount() {
    const userdata = auth.getCurrentUser();
    this.fetchfinal(userdata.id);
  }

  fetchfinal = async (userid) => {
    try {
      const response = await fetch(
        `http://localhost:8080/bookloans/userid/${userid}`,
      );
      const data = await response.json();
      let mergedBookCopies = [];

      data.forEach((loan) => {
        mergedBookCopies.push({
          title: loan["book"]["title"],
          author: loan["book"]["author"],
          isbn: loan["book"]["isbn"],
          copyBookId: loan["bookCopyId"],
          endDate: loan["endDate"].substring(0, 10),
        });
      });
      this.setState({ mergedBookCopies });
    } catch (error) {
      console.error("Error fetching book loans:", error);
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { mergedBookCopies, sortColumn } = this.state;
    const count = mergedBookCopies.length;

    if (count === 0) return <p>You have no bookloans.</p>;

    return (
      <div className="container-2">
        <h1>Profile</h1>
        <h2>Book Loans</h2>
        <div className="col-8">
          <BookLoanTable
            mergedBookCopies={mergedBookCopies}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
