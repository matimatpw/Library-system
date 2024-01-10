import ReactDOM from "react-dom/client";
import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import App from "./App";
import AddBookForm from "./components/AddBookForm";
import GoogleCalendar from "./components/Calendar";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "./css/index.css";
import Profile from "./components/profile";
import DeleteBooks from "./components/DeleteBooks";
import AdminProfile from "./components/AdminProfile";

const supabase = createClient(
  "https://ibdbiitmohlorehxiljr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZGJpaXRtb2hsb3JlaHhpbGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5NDU3MTEsImV4cCI6MjAxOTUyMTcxMX0.YTIy4O0kZ5tXQj3QoqCsUqVBF7FH8f2F8DHXJR8lA08"
);

export default function AppIndex() {
  return (
    <React.Fragment>
      <Router>
        <NavBar user={auth.getCurrentUser()} />
        <Routes>
          {!auth.getCurrentUser() && (
            <React.Fragment>
              <Route path="/calendar" element={<GoogleCalendar />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/" element={<Navigate to="/login" />}></Route>
            </React.Fragment>
          )}
          <Route
            path="/login"
            element={
              auth.getCurrentUser() ? <Navigate to="/" /> : <LoginForm />
            }
          ></Route>
          <Route
            path="/register"
            element={
              auth.getCurrentUser() ? <Navigate to="/" /> : <RegisterForm />
            }
          ></Route>
          <Route path="/logout" element={<Logout />} />
          {auth.getCurrentUser() && auth.getIsAdmin() && (
            <React.Fragment>
              <Route path="/addbookform" element={<AddBookForm />}></Route>
              <Route path="/deletebookform" element={<DeleteBooks />}></Route>
              <Route path="/" element={<AdminProfile />}></Route>
              {/*<Route path="/deletetest" element={<DeleteBooks />}></Route>*/}
              {/*<Route path="/addtest" element={<AddBooks />}></Route>*/}
            </React.Fragment>
          )}
          {auth.getCurrentUser() && !auth.getIsAdmin() && (
            <React.Fragment>
              <Route path="/calendar" element={<GoogleCalendar />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/" element={<App />}></Route>
            </React.Fragment>
          )}
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
