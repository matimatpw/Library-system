import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.required().label("Username"),
    password: Joi.required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      window.location = localStorage.getItem("redirectUrl") || "/";
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
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row g-3 row-g-3">
            {this.renderInput("username", "Username")}
          </div>
          <div className="row g-3 row-g-3">
            {this.renderInput("password", "Password", "password")}
          </div>
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
