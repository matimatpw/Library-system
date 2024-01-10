import React, { useState, useEffect } from "react";
import BookLoanTableReturn from "./bookLoanTableReturn";
import "../css/BookForm.css";
import { toast, ToastContainer } from "react-toastify";

const UserProfile = (props) => {
  const [mergedBookCopies, setMergedBookCopies] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "id", order: "asc" });

  useEffect(() => {
    fetchfinal(props.user.id);
  }, [props.user.id]);

  const removeLoan = async (id) => {
    try {
      console.log("id", id);
      await fetch(`http://localhost:8080/bookloans/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Book succefully returned.");
    } catch (error) {
      toast.error("Error returning a book");
      console.error("Error deleting book loan:", error.message);
    }
    fetchfinal(props.user.id);
  };

  const fetchfinal = async (userid) => {
    try {
      console.log("id", userid);
      const response = await fetch(
        `http://localhost:8080/bookloans/userid/${userid}`,
      );
      const data = await response.json();
      let mergedBookCopies = [];

      data.forEach((loan) => {
        mergedBookCopies.push({
          id: loan["id"],
          userId: loan["user"]["id"],
          title: loan["book"]["title"],
          author: loan["book"]["author"],
          isbn: loan["book"]["isbn"],
          copyBookId: loan["bookCopyId"],
          endDate: loan["endDate"].substring(0, 10),
        });
      });
      setMergedBookCopies(mergedBookCopies);
    } catch (error) {
      console.error("Error fetching book loans:", error);
    }
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  return (
    <div className="container-2">
      <h1>Book Loans</h1>
      <div className="col-8">
        <BookLoanTableReturn
          mergedBookCopies={mergedBookCopies}
          onSort={handleSort}
          sortColumn={sortColumn}
          handleRemoveLoan={removeLoan}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
