import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import BookCopyTable from './booksCopyTable';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';


const Window = (props) => {
  const [bookCopies, setBookCopies] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });


  const session = useSession();
  const supabase = useSupabaseClient();
  
  const [eventName, setEventname] = useState("");
  const [eventDescription, setEventDescription] = useState("");


  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const borrowBook = async (bookcopy) => {
    if (bookcopy.isBorrowed) {
      alert("Book is already borrowed");
      return;
    }

    const updatedBookCopies = bookCopies.map((copy) =>
      copy.id === bookcopy.id ? { ...copy, borrowed: true } : copy
    );

    setBookCopies(updatedBookCopies);
    BookCopiesUpdate(bookcopy.id);
    console.log("Borrowing book: ", bookcopy);




    try {
      if (!session || !session.provider_token) {
        throw new Error('Session or provider_token is undefined');
      }
    } catch (error) {
      console.log("XDDDD NIE DZIALA")
      alert(error.message);
    }

    const now = new Date();
    const start = now.toISOString();

    const end = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString();
    console.log("TITLE", bookcopy.isbn);
    const event = {
      'summary': bookcopy.isbn,
      'description': eventDescription,
      'start': {
        'dateTime': start,
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      'end': {
        'dateTime': end,
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };



    try {
      if(event.start.dateTime > event.end.dateTime) {
        throw new Error("Start date is after end date");
      }
      if(event.summary === "") {
        throw new Error("Event name is empty");
      }
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + session.provider_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to create event: ${JSON.stringify(data)}`);
      }

      console.log(data);
      alert("Event created!");
    } catch (error) {
      console.error('Error creating calendar event:', error);

      alert(error.message); //TODO handle error
    }
    
  };

  useEffect(() => {
    fetchbookCopies(props.isbn);
  }, [props.isbn]);

  const fetchbookCopies = (isbn) => {
    fetch(`http://localhost:8080/bookcopies/isbn/${isbn}`)
      .then((response) => response.json())
      .then((data) => setBookCopies(data))
      .catch((error) => console.error("Error fetching book data:", error));
  };

  const BookCopiesUpdate = async (id) => {
  
    try {
      const response = await fetch(`http://localhost:8080/bookcopies/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "isBorrowed": true })
      });

      if (!response.ok) {
        throw new Error('Nie udało się wypożyczyć książki.');
      }

      console.log('Book copy updated successfully:', response);
    } catch (error) {
      console.error('Error updating book copy:', error.message);
    }

   


  };

  const handleSort = (column) => {
    setSortColumn(column);
  };

  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.onRequestClose}
      contentLabel={"Example Modal"}
    >
      <BookCopyTable
        bookCopies={bookCopies}
        onSort={handleSort}
        sortColumn={sortColumn}
        borrowBook={borrowBook}
      />
      <button className='btn btn-primary' onClick={props.onRequestClose}>Close Modal</button>
    </Modal>
  );
};

export default Window;
