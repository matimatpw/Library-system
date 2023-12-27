import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import './index.css';
import App from './App';
import AddBookForm from './AddBookForm'; // Import your AddBookForm component
import reportWebVitals from './reportWebVitals';
import DeleteBookForm from "./DeleteBookForm";


export default function AppIndex() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/addbookform" element={<AddBookForm />} ></Route>
        <Route path="/deletebookform" element={<DeleteBookForm />} ></Route>
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppIndex />
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
