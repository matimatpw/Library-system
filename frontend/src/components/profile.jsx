import React, { Component } from 'react';
import BookLoanTable from './bookLoanTable';
import '../css/BookForm.css'

class Profile extends Component {

    state = {
        bookCopies: [],
        bookLoans: [],
        mergedBookLoans: [],
        mergedBookCopies: [],
        sortColumn: { path: "id", order: "asc" },
    }

    componentDidMount() {
        this.fetchbooks();
        this.fetchbooks();
    }

    fetchbookLoans = async () => {
        console.log("Fetching book loans...");
        try {
            const response = await fetch(`http://localhost:8080/bookloans/userid/1`);
            const data = await response.json();
            this.setState({ bookLoans: data });
        } catch (error) {
            console.error("Error fetching book loans:", error);
        }
    }

    fetchbookCopies = async () => {
        try {
            await this.fetchbookLoans();
            const { bookLoans } = this.state;
            console.log("Loans abc: ", bookLoans);

            if (bookLoans.length === 0) {
                console.log("No book loans to fetch copies for.");
                return;
            }
            
            // Unikalne bookCopyId z wypożyczeń
            const uniqueBookCopyIds = [...new Set(bookLoans.map(loan => loan.copyBookId))];
        
            // BookCopies dla każdego unikalnego bookCopyId
            const bookCopies = await Promise.all(
                uniqueBookCopyIds.map(async (copyBookId) => {
                    try {
                        const response = await fetch(`http://localhost:8080/bookcopies/id/${copyBookId}`);
                        const data = await response.json();
                        this.setState({ bookCopies: data });
                        return data;
                    } catch (error) {
                        console.error("Error fetching book copies:", error);
                        throw error; // Rethrow the error to be caught by the overall Promise.all catch block
                    }
                })
            )
            const mergedBookLoans = bookLoans.map((loan) => {
                const matchingBookCopy = bookCopies.find((copy) => copy.id === loan.copyBookId);
                return {
                ...loan,
                isbn: matchingBookCopy ? matchingBookCopy.isbn : null,
                };
            });
            
            this.setState({ mergedBookLoans });
            console.log("Merged book loans:", mergedBookLoans);
        } catch (error) {
            console.error("Error fetching book copies:", error);
        }
    };

    fetchbooks = async () => {
        try {
            await this.fetchbookCopies();
            const { mergedBookLoans } = this.state;
            console.log("Book Loans:", mergedBookLoans);
    
            if (mergedBookLoans.length === 0) {
                console.log("No book copies to fetch books for.");
                return;
            }
    
            // Unikalne isbn z bookCopies
            const uniqueIsbns = [...new Set(mergedBookLoans.map(copy => copy.isbn))];
    
            // Książki dla każdego unikalnego isbn
            Promise.all(
                uniqueIsbns.map(isbn =>
                    fetch(`http://localhost:8080/books/id/${isbn}`)
                        .then(response => response.json())
                )
            )
            .then(books => {
                this.setState({ books });
    
                const mergedBookCopies = mergedBookLoans.map((copy) => {
                    const matchingBook = books.find((book) => book.isbn === copy.isbn);
                    return {
                        ...copy,
                        title: matchingBook ? matchingBook.title : null,
                        author: matchingBook ? matchingBook.author : null,
                    };
                });
    
                this.setState({ mergedBookCopies });
                console.log("Merged book copies:", mergedBookCopies);
            });
        } catch (error) {
            console.error("Error in fetchbooks:", error);
        }
    
    };


    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };



    render() {
        const {mergedBookCopies, sortColumn } = this.state;

        return (
            <div className="container-2">
                <h1>Profile</h1>
                <h2>Book Loans</h2>
                <div className="col-8">
                    <BookLoanTable
                        // bookCopies={bookCopies}
                        // bookLoans={bookLoans}
                        // mergedBookLoans={mergedBookLoans}
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