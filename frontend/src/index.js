import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "./index.css";
import App from "./App";
import AddBookForm from "./AddBookForm";
import reportWebVitals from "./reportWebVitals";
import DeleteBookForm from "./DeleteBookForm";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import GoogleCalendar from "./Calendar";
import { createClient } from "@supabase/supabase-js"
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
    "https://ibdbiitmohlorehxiljr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZGJpaXRtb2hsb3JlaHhpbGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5NDU3MTEsImV4cCI6MjAxOTUyMTcxMX0.YTIy4O0kZ5tXQj3QoqCsUqVBF7FH8f2F8DHXJR8lA08"
)


export default function AppIndex() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/addbookform" element={<AddBookForm />}></Route>
          <Route path="/deletebookform" element={<DeleteBookForm />}></Route>
          <Route path="/calendar" element={<GoogleCalendar/>} ></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <AppIndex />
    </SessionContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
