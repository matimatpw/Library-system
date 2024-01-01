import React, { Component } from "react";

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email address
            </label>
            <input
              autoFocus
              type="email"
              className="form-control"
              id="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
