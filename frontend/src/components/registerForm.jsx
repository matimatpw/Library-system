import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import "../css/BookForm.css";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .label("Username"),
    password: Joi.string().min(5).label("Password"),
    name: Joi.label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response["data"]["token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container-2">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row g-3 row-g-3">
            {this.renderInput("username", "Username")}
          </div>
          <div className="row g-3 row-g-3">
            {this.renderInput("password", "Password", "password")}
          </div>
          <div className="row g-3 row-g-3">
            {this.renderInput("name", "Name")}
          </div>
            {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
