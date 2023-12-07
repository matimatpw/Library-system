import React from 'react';
import BookList from './BookList';
import AddButton from './AddButton';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                   Book List
                </header>
                <BookList />
                <AddButton type={"add"}/>
                <AddButton type={"delete"}/>

            </div>
        );
    }
}

export default App;