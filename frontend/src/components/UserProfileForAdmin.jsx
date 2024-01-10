import React, { Component } from "react";
import BookLoanTableReturn from "./bookLoanTableReturn";
import "../css/BookForm.css";

class UserProfile extends Component {
  state = {
    mergedBookCopies: [],
    sortColumn: { path: "id", order: "asc" },
  };

  componentDidMount() {
    const userdata = this.props.user;
    this.fetchfinal(userdata.id);
  }

  removeLoan = (copyBookId) => {
    try {
      const response = fetch(
        `http://localhost:8080/bookloans/delete/copyId/${copyBookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error deleting book loan:", error.message);
    }
    this.fetchfinal(this.props.user.id);
  };

  fetchfinal = async (userid) => {
    try {
      const response = await fetch(
        `http://localhost:8080/bookloans/userid/${userid}`
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

    return (
      <div className="container-2">
        <h1>Profile</h1>
        <h2>Book Loans</h2>
        <div className="col-8">
          <BookLoanTableReturn
            mergedBookCopies={mergedBookCopies}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            handleRemoveLoan={this.removeLoan}
          />
        </div>
      </div>
    );
  }
}

export default UserProfile;
