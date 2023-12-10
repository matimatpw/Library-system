import React, { Component } from 'react';
import BookList from './BookList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>Book List</header>
        <BookList />
      </div>
    );
  }
}

export default App;
